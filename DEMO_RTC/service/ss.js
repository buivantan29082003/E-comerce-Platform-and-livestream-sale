const mediasoup = require("mediasoup");


async function createRouter(worker){
  const router = await worker.createRouter({
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
}


async function  createWorker(){
  return await mediasoup.createWorker();
}
module.exports={
  createRouter,
  createWorker
}