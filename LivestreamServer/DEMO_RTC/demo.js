const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mediasoup = require("mediasoup");
const cors = require("cors");
const { init,liveSession } = require("./repository/Model");
const { createRouter } = require("./config");
const app = express();
app.use(cors()); // Xử lý CORS

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // Cho phép tất cả các nguồn truy cập
    methods: ["GET", "POST"],
  },
});

let worker;
let router;
let producer;
let producerid;
let k=1;
let consumers = []; // Lưu trữ tất cả các consumers

(async () => {
  init().then(async()=>{
    app.get('/getlive/:id', async (req, res) => {
      const { id } = req.params; 
      let live=await liveSession.findOne({ where: { id: id } });
      if(live!=null){
        res.json(live)
        return 
      }
      res.json({status:403,message:"Ban khong phai la chu phong"})
    })
  })
  worker = await mediasoup.createWorker();
  router = await worker.createRouter({
    mediaCodecs: [
      {
        kind: "audio",
        mimeType: "audio/opus",
        clockRate: 48000,
        channels: 2,
      },
      {
        kind: "video",
        mimeType: "video/VP8",
        clockRate: 90000,
        parameters: {
          "x-google-start-bitrate": 1000,
        },
      },
    ],
  });
})();


// bước 1: xử lý các connect đến socket server
io.on("connection", (socket) => {
  console.log("----- CLIENT CONNECTED -----");
  socket.typeS = "producer"; 
  socket.transport = null;
  socket.on("getRtpCapabilities",async() => {
    let live=await liveSession.findOne({ where: { id: 1 } });
    createRouter(worker).then(async v=>{
      let room={
        live:live,
        router:v
      }
      socket.transport = await router.createWebRtcTransport({
        listenIps: [{ ip: "0.0.0.0", announcedIp: "127.0.0.1" }],
        enableUdp: true,
        enableTcp: true,
        preferUdp: true,
      });
    let transport=socket.transport
      socket.emit("sendRtpCapabilities", {rtpCapabilities:router.rtpCapabilities,
        transport:{
          id: transport.id,
          iceParameters: transport.iceParameters,
          iceCandidates: transport.iceCandidates,
          dtlsParameters: transport.dtlsParameters,
        }});
    })
  });

  // bước 3: Tạo transport cho client
  socket.on("createTransport", async () => {
    socket.transport = await router.createWebRtcTransport({
      listenIps: [{ ip: "0.0.0.0", announcedIp: "127.0.0.1" }],
      enableUdp: true,
      enableTcp: true,
      preferUdp: true,
    });
    socket.emit("transportCreated", {
      id: socket.transport.id,
      iceParameters: socket.transport.iceParameters,
      iceCandidates: socket.transport.iceCandidates,
      dtlsParameters: socket.transport.dtlsParameters,
    });
    console.log("----- CREATED TRANSPORT ------");
  });

  // bước 4: Connect transport cho user
  socket.on("connectTransport", async ({ dtlsParameters }, callback) => {
    await socket.transport.connect({ dtlsParameters });
    console.log("----- CONNECTED TRANSPORT -----");
    callback();
  });

  // Bước 5: Tạo producer hoặc transport
  socket.on("produce", async ({ transportId, kind, rtpParameters }, callback) => {
    socket.producer = await socket.transport.produce({ kind, rtpParameters });
    producer = socket.producer; // Lưu trữ producer
    console.log("PRODUCER CREATED: " + producer.id);
    callback({ id: socket.producer.id });
  });

  // Bước 6: Tạo consumer
  socket.on("consume", async ({ rtpCapabilities }, callback) => {
    try {
      // Kiểm tra nếu router có thể tiêu thụ stream từ producer
      if (router.canConsume({ producerId: producer.id, rtpCapabilities })) {
        // Tạo consumer cho client
        const consumer = await socket.transport.consume({
          producerId: producer.id,
          rtpCapabilities,
          paused: false, // Bắt đầu nhận ngay lập tức
        });


        // Gửi các thông tin cần thiết về consumer về phía client
        callback({
          id: consumer.id,
          producerId: producer.id,
          kind: consumer.kind,
          rtpParameters: consumer.rtpParameters,
        });

        console.log("CONSUMER CREATED: " + consumer.id);
      } else {
        callback({ error: "RTP Capabilities mismatch" });
      }
    } catch (error) {
      console.error("Error creating consumer", error);
      callback({ error: error.message });
    }
  });

  // Xử lý khi client ngắt kết nối
  socket.on("disconnect", () => {
    console.log("----- CLIENT DISCONNECTED -----");
    // Cleanup producers/consumers if necessary
  });
});

server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
