const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mediasoup = require("mediasoup");
const cors = require("cors");
const { init, liveSession } = require("./repository/Model");
const { type } = require("express/lib/response");
const app = express();
const tokenService = require("./authToken");
const { prototype } = require("events");
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

var worker;
let rooms = new Map();

(async () => {
  worker = await mediasoup.createWorker();
  init().then(async () => {});
})();

function createTimeOut(key) {
  setTimeout(() => {
    let room = rooms.get(key);
    if (!room.isAlive) {
    }
  }, 100000);
}

const getLiveByShopId = () => {};

const createRoom = (roomId, host, room) => {
  return {
    roomId: roomId,
    hostRoom: host,
    roomInfo: room,
    transportRoom: null,
    countMember: 0,
    countLike:0,
    maxMember:0,
    memberNow:0,
    countCart:0,
    members:[]
  };
};

const handleHostClose = (socket) => {
  rooms.get(socket.roomId).isAlive = false;
  io.to(socket.roomId+"").emit("message", { type: "HOSTDISCONECT" });

  setTimeout(() => {
    if (rooms.has(socket.roomId) && rooms.get(socket.roomId).isAlive == false) {
      io.to(socket.roomId+"").emit("message", { type: "ENDLIVE" });
      updateEndTimeById(socket.roomId);
      rooms.delete(socket.roomId);
    } else {
      if(rooms.get(socket.roomId).isAlive===false){
        io.to(socket.roomId+"").emit("message", { type: "HOSTRECONNECT" });
      }
      
    }
  }, 15000);
};

const handleMemberClose = (socket) => {
  rooms.get(socket.roomId+"").countMember=rooms.get(socket.roomId+"").countMember-1
  io.to(socket.roomId+"").emit("message", {
    
    sizeMember: rooms.get(socket.roomId+"").countMember,
    type: "MEMBERLEAVE",
  });
};

io.on("connection", (socket) => {
  socket.on("hostconnect", async (data) => {
    if (data.role === "host") {
      await tokenService.getOrderInfoFromTokenShop(data.token).then((v) => {
        socket.shopInfo = v;
      });
      if (socket.shopInfo != null) {
        let roomIstrue = rooms.get(data.liveId);
        let liveId = await liveSession.findOne({
          where: {
            id: data.liveId,
          },
        });
        if (
          liveId.shopId === socket.shopInfo.shopId &&
          liveId.endTime === null
        ) {
          if (
            liveId != null &&
            roomIstrue != null &&
            roomIstrue.isAlive == false
          ) {
            socket.emit("reconnect", {
              code: 400,
              message: "Dang connect lai",
              data: null,
            });
            handleHostConnect(socket, roomIstrue);
            io.to(socket.roomId+"").emit("message", { type: "HOSTRECONNECT" });
            rooms.get(socket.roomId).isAlive = true;
          } else if (liveId != null && roomIstrue == null) {
            await liveSession.update(
              { startTime: new Date() },
              {
                where: {
                  id: data.liveId,
                  startTime: null,
                },
              }
            );
            const room = createRoom(data.liveId, socket, liveId);
            room.hostTransport = await worker.createRouter({
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
            rooms.set(data.liveId, room);
            this.transport = null;
            handleHostConnect(socket, room);
            socket.emit("connectsuccess", {
              code: 400,
              message: "Kết nối thành công ",
              data: null,
            });
          } else {
            socket.emit("connectfail", {
              code: 400,
              message: "Phiên live không hợp lệ",
              data: null,
            });
          }
        } else {
          socket.emit("connectfail", {message:"Phiên live của bạn không hợp lệ"});
          socket.disconnect(true);
        }

      } else {
        socket.emit("connectfail", {message:"Không tìm thấy phiên live"});
        socket.disconnect(true);
      }
    } else {
      
      socket.user = data;
      tokenService.getOrderInfoFromToken(data.token).then(v=>{
        if(v!=null){
           socket.userInfo=v
           let room = rooms.get(data.liveId+"");
           if (room != null) {
            socket.roomId=room.roomId
             handleMemberConnect(socket, room);
             socket.emit("connectsuccess", {
               code: 400,
               message: "Kết nối thành công !!!",
               data: null,
             });
           } else {
             socket.emit("connectfail", {
               code: 400,
               message:
                 "Phiên live có thể không tồn tại hoặc đã kết thúc, thông cảm",
               data: null,
             });
           }
        }else{
          socket.emit("connectfail", {
            code: 400,
            message:
              "Vui lòng đăng nhập trước khi xem live...",
            data: null,
          });
        }
      })

    }
  });
});

server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});

function handleHostConnect(socket, room) {
  let router = room.hostTransport;
  socket.roomId = room.roomId;

  socket.on("getRtpCapabilities", () => {
    socket.emit("sendRtpCapabilities", router.rtpCapabilities);
  });
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
  });

  socket.on("connectTransport", async ({ dtlsParameters }, callback) => {
    await socket.transport.connect({ dtlsParameters });
    callback();
  });

  socket.on(
    "produce",
    async ({ transportId, kind, rtpParameters }, callback) => {
      socket.producer = await socket.transport.produce({ kind, rtpParameters });
      room.producer = socket.producer;
      producer = socket.producer;
      room.countMember = 1;
      socket.on("message", (data) => {
        switch (data.type) {
          case 1:
            io.to(socket.roomId+"").emit("message", {
              from: "Host - "+socket.shopInfo.shopName,
              avatar:socket.shopInfo.hinhAnh,
              text: data.text,
              type: "COMMENT",
            });
            break;
          case 4:
            io.to(socket.roomId+"").emit("message", { data: data, type: "PIN" });
            break;
          case 5:
            console.log("XIN CHÀO THIẾT LẬP GIÁ BÁN")
            if(data.timeOut>0){
              createTimeLine(rooms.get(socket.roomId+""),data.timeOut,socket.roomId)
            }
            io.to(socket.roomId+"").emit("message", { type: "RELOAD",timeOut:data.timeOut});
            
          case 6:
            io.to(socket.roomId+"").emit("message", { type: "CLEARPIN" });
            break;
          case 8:
              console.log("U ĐẦU KHÔNG HÀ")
              try {
                const rooma=rooms.get(socket.roomId+"")
                  fetch(`http://localhost:8080/live/endlive?id=${socket.roomId}&countCart=${rooma.countCart}&countLike=${rooma.countLike}`,{
                    method: 'POST', // Sử dụng phương thức POST
                    headers: {
                      'Content-Type': 'application/json', // Đặt định dạng nội dung gửi đi
                    }}).then(v=>v.data).then(v=>{
                      console.log("Đang thực hiện cập nhật á nha bạn ơi ")
                      console.log(v)
                      io.to(socket.roomId+"").emit("message", { type: "ENDLIVE" });
                    if(v.status===200){
                     console.log("Cập nhật thành công nha bạn ơi.")
                      io.to(socket.roomId+"").emit("message", { type: "ENDLIVE" });
                      rooms.delete(socket.roomId+"" )
                    }else{
                      socket.emit("message",{
                        type:"ENDLIVEFAIL"
                      })
                    }
                  }).catch(error=>{
                    console.log("Lỗi nè bạn ơi"+error)
                    console.log("XIN CHÀO BẠN ƠI.")
                  })
                 
                
              } catch (error) {
                socket.emit("message",{
                  type:"ENDLIVEFAIL"
                })
              }
              
            break;
          default:
            
            break;
        }
      });
      socket.join(socket.roomId+"");
      callback({ id: socket.producer.id });
    }
  );
  socket.on("disconnect", () => {
    handleHostClose(socket);
  });
}

function handleMemberConnect(socket, room) {
  // socket.roomId = room.roomId;
  // if(socket.transport!=null){
  //   socket.transport.close()
  // }
  let router = rooms.get(socket.roomId+"").hostTransport;
  socket.on("getRtpCapabilities", () => {
    socket.emit("sendRtpCapabilities", router.rtpCapabilities);
  });

  socket.on("createTransport", async () => {
    socket.transport = await rooms.get(socket.roomId+"").hostTransport.createWebRtcTransport({
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
  });

  socket.on("connectTransport", async ({ dtlsParameters }, callback) => {
    await socket.transport.connect({ dtlsParameters });
    callback();
  });
  socket.on("consume", async ({ rtpCapabilities, liveId }, callback) => {
    try {
      let producer = rooms.get(liveId+"").producer;
      if (rooms.get(liveId+"").hostTransport.canConsume({ producerId: producer.id, rtpCapabilities })) {
        const consumer = await socket.transport.consume({
          producerId: producer.id,
          rtpCapabilities,
          paused: false,
        });
        callback({
          id: consumer.id,
          producerId: producer.id,
          kind: consumer.kind,
          rtpParameters: consumer.rtpParameters,
        });
        if(socket.isMessage===undefined){
          socket.isMessage=1
          socket.on("message", (data) => {
            switch (data.type) {
              case 1:
                io.to(socket.roomId+"").emit("message", {
                  from: socket.userInfo.tenTaiKhoan,
                  text: data.text,
                  avatar: socket.userInfo.hinhAnh,
                  type: "COMMENT",
                });
                break;
              case 2:
                let room2=rooms.get(socket.roomId+"")
                room2.countCart++;
                io.to(socket.roomId+"").emit("message", {
                  user: socket.userInfo,
                  type: "ADDTOCART",
                  countCart:room2.countCart
                });
                break;
              case 3:
                socket.leave(socket.roomId+"")
                socket.roomId=data.liveId
                socket.transport.close()
                socket.join(socket.roomId+"");
                io.to(socket.roomId+"").emit("message", {
                  sizeMember: rooms.get(socket.roomId+"").countMember,
                  type: "NEWMEMBER",
                });
                socket.emit("message",{
                  type:"CHANGEROOMSUCCESS"
                })
                break;
              case 4: 
                const room1=rooms.get(socket.roomId+"")
                if(room1!=null){
                  room1.countLike++;
                  io.to(socket.roomId+"").emit("message", {
                    data: room1.countLike,
                    type: "COUNTLIKE",
                  });
                }
                break;
              
              default:
                break;
            }
          });
          socket.join(socket.roomId+"");
          rooms.get(socket.roomId+"").countMember++;
          rooms.get(socket.roomId).members.pus
          io.to(socket.roomId+"").emit("message", {
            sizeMember: rooms.get(socket.roomId).countMember,
            type: "NEWMEMBER",
            countMember:rooms.get(socket.roomId+"").countMember
          });
        }
      } else {
        callback({
          id: null,
          producerId: null,
          kind: null,
          rtpParameters: null,
        });
      }
    } catch (error) {
      callback({
        id: null,
        producerId: null,
        kind: null,
        rtpParameters: null,
      });
    }
  });
  socket.on("disconnect", () => {
    handleMemberClose(socket);
  });

}

const TYPE = {
  joinRoom: "JOIN_ROOM",
  leaveRoom: "LEAVE_ROOM",
};

async function updateEndTimeById(id) {
  try {
    const currentDate = new Date();
    const result = await liveSession.update(
      { endTime: currentDate },
      {
        where: {
          id: id, 
        },
      }
    );
    if (result[0] === 0) {
      console.log("Không tìm thấy bản ghi với id:", id);
    } else {
      console.log("Cập nhật thành công!");
    }
  } catch (error) {
    console.error("Lỗi khi cập nhật endTime:", error);
  }
}


const createTimeLine=(room,timeOut,roomId)=>{
  if(room.timeOut!=null&&room.timeOut!==undefined){
    io.to(roomId+"").emit("message", { type: "ENDTIMEOUT" });
    clearTimeout(room.timeOut)
  }
  room.timeOut=setTimeout(()=>{
    room.timeOut=null;
    fetch("http://localhost:8080/clearallpromotion?id="+roomId).then(v=>v.data).then(v=>{
      io.to(roomId+"").emit("message", { type: "RELOAD",timeOut:-2,showMessage:0});
    }).catch(error=>{
      console.log("CÓ LỖI CẬP GIÁ GIÁ SAU TIMEOUT")
    })
    
    io.to(roomId+"").emit("message", { type: "ENDTIMEOUT" });
  },timeOut)
  
}

const updateLiveSession = async (id, cartCount, likeCount) => {
  console.log("================= đang update á =====================")
  console.log("Live Id" +id)
  console.log("Số lược đặt hàng "+cartCount)
  console.log("Số lược like "+likeCount)
  try {
    const currentTime = new Date();

    const [updatedRows] = await liveSession.update(
      {
        endTime: currentTime,   
        cartCount: cartCount, 
        likeCount: likeCount   
      },
      {
        where: { id: id }  
      }
    );

    if (updatedRows > 0) {
      return 1
    } else {
      return 0
    }
  } catch (error) {
    return 0
  }
};
