import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import * as mediasoupClient from "mediasoup-client";
import api from "../../config/APISeller";

const socket = io("http://localhost:4000"); // Kết nối đến server
const HostLive = () => {
    let device;
    let producerTransport;
    const [comments, setComments] = useState(['Có sỉ không']);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        socket.emit('hostconnect', {
            "shopId": 1,
            liveId: 1,
            token: "Hello world",
            role: "host"
        });

        socket.on("connectsuccess", async (data) => {
            socket.emit("getRtpCapabilities");
            socket.on("sendRtpCapabilities", async (rtpCapabilities) => {
                await loadDevice(rtpCapabilities);
            });
        });

        socket.on("connectfail", async (data) => {
            alert("connect thất bại");
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const loadDevice = async (rtpCapabilities) => {
        try {
            device = new mediasoupClient.Device();
            await device.load({ routerRtpCapabilities: rtpCapabilities });
            console.log("Device loaded");
        } catch (error) {
            console.error("Error loading device:", error);
        }
    };

    const createSendTransport = async () => {
        socket.emit("createTransport");
        socket.on("transportCreated", async ({ id, iceParameters, iceCandidates, dtlsParameters }) => {
            producerTransport = device.createSendTransport({
                id,
                iceParameters,
                iceCandidates,
                dtlsParameters,
            });

            socket.on("message", (data) => {
                setComments(prevComments => [...prevComments, data.text]);
            });

            // Xử lý khi transport cần kết nối
            producerTransport.on("connect", ({ dtlsParameters }, callback, errback) => {
                socket.emit("connectTransport", { dtlsParameters }, (error) => {
                    if (error) {
                        errback(error);
                    } else {
                        callback();
                    }
                });
            });

            producerTransport.on("produce", (parameters, callback, errback) => {
                socket.emit("produce", { transportId: producerTransport.id, kind: parameters.kind, rtpParameters: parameters.rtpParameters, liveId: 1 }, ({ id, error }) => {
                    if (error) {
                        errback(error);
                    } else {
                        callback({ id });
                    }
                });
            });

            await produce(); // Tạo producer với media stream
        });
    };

    const produce = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            const track = stream.getVideoTracks()[0];
            const producer = await producerTransport.produce({ track });

            // Vẽ video lên canvas
            const ctx = canvasRef.current.getContext('2d');
            videoRef.current.srcObject = stream; // Gán stream cho video element
            videoRef.current.play();

            const draw = () => {
                ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                applySkinFilter(ctx, canvasRef.current.width, canvasRef.current.height); // Gọi hàm áp dụng bộ lọc
                requestAnimationFrame(draw);
            };

            draw(); // Bắt đầu vẽ
        } catch (error) {
            console.error("Error producing media stream:", error);
        }
    };

    // Hàm áp dụng bộ lọc trắng da
    const applySkinFilter = (ctx, width, height) => {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            // Thay đổi giá trị màu sắc để tạo hiệu ứng trắng da
            const r = data[i];     // Red
            const g = data[i + 1]; // Green
            const b = data[i + 2]; // Blue

            // Tăng cường độ sáng cho làn da
            data[i] = r + 30;   // Red
            data[i + 1] = g + 15; // Green
            data[i + 2] = b;       // Blue
        }

        ctx.putImageData(imageData, 0, 0); // Đặt lại dữ liệu hình ảnh lên canvas
    };

    return (
        <>
            <div>
                <button onClick={() => createSendTransport()}>Create Producer</button>
                {/* <button onClick={() => createConsumerTransport()}>Create consumer</button> */}
                <video ref={videoRef} style={{ display: 'none' }}></video>
                <canvas ref={canvasRef} width={640} height={480}></canvas>
            </div>
            <ul>
                {comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                ))}
            </ul>
        </>
    );
};

export default HostLive;
