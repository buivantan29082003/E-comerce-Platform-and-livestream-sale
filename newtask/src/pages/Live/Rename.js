import React, { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';
import * as mediasoupClient from 'mediasoup-client';
import { BiCartAdd, BiHeartCircle, BiLike, BiSend, BiUser } from 'react-icons/bi';
import { Badge } from '@mui/joy';
// import ModalCart from './ModalCart';
import api from '../../config/APIClient';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useParams } from 'react-router-dom';
// import { BsCart } from 'react-icons/bs';
import toast from 'react-hot-toast';
import formatToVND from '../client/FormatVnd';
import SwipeableTemporaryDrawer from './ClientCart';
import ModalChooseProductLive from './ModalChooseProduct';
import birthday from '../../utils/images/birthday.jpg';
import ProductInlive from './ModalProducClient';
import apiUser from '../../config/APINormal';
import Cookies from 'js-cookie';

const socket = io('http://localhost:4000'); // Kết nối đến server
const WatchLive = () => {
    // let device;
    const [datas, setDatas] = useState({
        device: null,
        recvTransport: null,
    });

    const { liveId } = useParams();
    const [liveInfo, setLiveInfo] = useState(null);
    const [products, setProducts] = useState([]);
    const [countMember, setCountRoom] = useState(0);
    const [productPin, setProductPin] = useState(null);
    const [activeCart, setActiveCart] = useState({
        carts: [],
    });

    const [message, setMessage] = useState('');
    const [comments, setComments] = useState([]);
    const sendMessage = (type) => {
        switch (type) {
            case 1:
                let message = document.getElementById('comments').value;
                socket.emit('message', { text: message, type: 1 });
                break;
            case 2:
                socket.emit('message', { user: {}, type: 2 });
                break;
            default:
                break;
        }
    };
    const [data, setData] = useState({
        consumer: null,
    });
    const [product, setProduct] = useState(null);

    useEffect(() => {
        socket.emit('hostconnect', {
            liveId: liveId,
            token: Cookies.get("tokenModel")!=null?Cookies.get("tokenModel"):"",
            role: 'member',
        });
        
        socket.on('message', (data) => {
            switch (data.type) {
                case 'COMMENT':
                    setComments((prevComments) => [data, ...prevComments]);
                    break;
                case 'NEWMEMBER':
                    break;
                case 'ADDTOCART':
                    activeCart.carts.push(data.user);
                    break;
                case 'PIN':
                    handleAnimate();

                    if (data.data.data.conner.time !== -1) {
                        setTimeout(() => {
                            setProductPin(null);
                        }, data.data.data.conner.time);
                    }
                    setProductPin(data.data.data);
                    break;
                case 'RELOAD':
                    getProduct();
                    showVouher();
                    break;
                case 'HOSTDISCONNECT':
                    toast.error('Host đang discinnect ');
                    break;
                case 'CLEARPIN':
                    handleAnimate();
                    setProductPin(null);

                    break;
                    case 'ENDLIVE':
                        window.location.href="http://localhost:3001/"
    
                        break;
                case 'HOSTRECONNECT':
                    if (data.consumer != null) {
                        data.consumer.close();
                        alert(data.recvTransport.closed);
                    }

                    resetVideo();
                    setTimeout(() => {
                        consume();
                    }, 2000);
                    break;
                default:
                    break;
            }
        });

        const resetVideo = () => {
            const container = document.getElementById('containervideo');
            const oldVideoElement = document.getElementById('remoteVideo');
            container.removeChild(oldVideoElement);
            container.innerHTML = `<video
                                id="remoteVideo"
                                className="w-full h-[90%] rounded-[5px]"                                
                                // src="https://www.youtube.com/embed/yrviw5RysnE"
                                title="SHOPEE 9.9 SIÊU NHẠC HỘI - SIÊU NHÓM BÍ ẨN | Đắm chìm cùng các tiết mục từ SOOBIN, Rhymastic,..."
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                autoplay
                                // playsinline
                            ></video>`;
        };
        const showVouher = () => {
            const announceDiv = document.getElementById('voucher');
            gsap.to(announceDiv, { left: '5px', duration: 0.2 });
            setTimeout(() => {
                gsap.to(announceDiv, { left: '-400px', duration: 0.3 });
            }, 1500);
        };

        socket.on('connectfail', (data) => {
            alert('Phiên live có vẻ không hợp lệ');
        });

        socket.once('connectsuccess', async (data) => {
            socket.emit('getRtpCapabilities');
            socket.on('sendRtpCapabilities', async (rtpCapabilities) => {
                await loadDevice(rtpCapabilities);
            });
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    const loadDevice = async (rtpCapabilities) => {
        try {
            datas.device = new mediasoupClient.Device();
            await datas.device.load({ routerRtpCapabilities: rtpCapabilities });
        } catch (error) {}
    };

    const createReceiveTransport = async () => {
        socket.emit('createTransport');
        socket.on('transportCreated', async ({ id, iceParameters, iceCandidates, dtlsParameters }) => {
            datas.recvTransport = datas.device.createRecvTransport({
                id,
                iceParameters,
                iceCandidates,
                dtlsParameters,
            });
            datas.recvTransport.on('connect', ({ dtlsParameters }, callback, errback) => {
                socket.emit('connectTransport', { dtlsParameters }, (error) => {
                    if (error) {
                        errback(error);
                    } else {
                        callback();
                    }
                });
            });

            datas.recvTransport.on('connectionstatechange', (state) => {
                if (state === 'connected') {
                    console.log('Receive Transport connected');
                } else if (state === 'failed') {
                    console.error('Receive Transport connection failed');
                }
            });
            await consume();
        });
    };

    // const [flag,setFlag]=useState(0)
    const consume = async () => {
        socket.emit(
            'consume',
            { rtpCapabilities: datas.device.rtpCapabilities, liveId: liveId },
            async ({ id, producerId, kind, rtpParameters }) => {
                if (id !== null) {
                    data.consumer = await datas.recvTransport.consume({
                        id,
                        producerId,
                        kind,
                        rtpParameters,
                    });
                    const { track } = data.consumer;
                    const mediaStream = new MediaStream();
                    mediaStream.addTrack(track);
                    if (kind === 'video') {
                        getProduct();
                        apiUser
                            .get('/getinfolive?id=' + liveId)
                            .then((v) => v.data)
                            .then((v) => {
                                if (v.status === 200) {
                                    setLiveInfo(v.data);
                                }else{
                                    alert("Hellow dcndk")
                                }
                            });
                        const videoElement = document.getElementById('remoteVideo');
                        videoElement.srcObject = mediaStream;
                        try {
                            await videoElement.play();
                        } catch (error) {
                            alert('Có lỗi xảy ra ');
                        }
                        showMessage();
                    }
                } else {
                    alert('Ko thể tải phiên luve');
                }
            },
        );
    };

    const getProduct = () => {
        api.get(`/productinlives?id=${liveId}`)
            .then((v) => v.data)
            .then((v) => {
                setProducts(v.data);
            })
            .catch((error) => {});
    };

    function createConsumerTransport() {
        createReceiveTransport();
    }

    const showDiv = () => {
        const announceDiv = document.getElementById('announce');
        gsap.to(announceDiv, { left: '5px', duration: 0.2 });
        setTimeout(() => {
            gsap.to(announceDiv, { left: '-400px', duration: 0.3 });
            activeCart.carts = [];
        }, 1500);
    };

    const showMessage = useCallback(() => {
        setInterval(() => {
            if (activeCart.carts.length > 0) {
                if (activeCart.carts.length > 1) {
                    setMessage(activeCart.carts[0].tenTaiKhoan + ' Và một số người khác đang mua hàng');
                } else {
                    setMessage(activeCart.carts[0].tenTaiKhoan + ' đang mua hàng');
                }
                showDiv();
            }
        }, 4000);
    }, []);

    const handleAnimate = () => {
        const element = document.getElementById('product');
        if (element) {
            gsap.to(element, {
                scale: 0, // Thu nhỏ lại
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    gsap.to(element, {
                        scale: 1, // To ra trở lại kích thước ban đầu
                        duration: 1,
                        ease: 'elastic.out(1, 0.3)', // Hiệu ứng bật đàn hồi
                    });
                },
            });
        }
    };

    return (
        <>
            <div className="bg-black w-full">
                <div class="flex flex-wrap w-full p-6 bg-black">
                    <div class="w-full lg:w-9/12 p-1 bg-black-900 text-white lg:h-[640px] h-[450px]">
                        <div className="flex position-relative items-center mb-1 bg-gray-900 text-white p-2 rounded-lg w-full space-x-4">
                            <ProductInlive setProduct={setProduct} sendMessage={sendMessage} products={products}></ProductInlive>
                            <ModalChooseProductLive sendMessage={sendMessage} product={product} />
                            {/* <Produc */}
                            {productPin != null && (
                                <div
                                    id="product"
                                    className={`absolute  overflow-hidden bg-white rounded-md ${
                                        productPin.conner.age === 1 ? 'left-0' : 'right-0'
                                    }`}
                                    style={{
                                        zIndex: '66',
                                        width: '130px',
                                        top: '130px',
                                        // pointerEvents: 'none', // Không chiếm sự tương tác
                                    }}
                                >
                                    <div className="flex justify-between">
                                        <span
                                            className="bg-gray-600 p-1 rounded-sm text-sm text-white"
                                            style={{ position: 'absolute', top: '0', left: '0', zIndex: '1000', pointerEvents: 'none' }}
                                        >
                                            {productPin.soLuongGioiHan}
                                        </span>
                                        <span
                                            className="bg-red-100 p-1 rounded-sm text-sm text-red-600"
                                            style={{ position: 'absolute', top: '0', right: '0', zIndex: '1000', pointerEvents: 'none' }}
                                        >
                                            {productPin.giaGiam} %
                                        </span>
                                    </div>
                                    <img className="w-full" src={`${productPin != null ? productPin.p.hinhAnh : ''}`} />
                                    <span className="ml-1 text-red-500 mt-2 mb-2 text-xs font-bold" style={{ fontSize: '10px' }}>
                                        {productPin != null
                                            ? formatToVND(productPin.minPrice) + '-' + formatToVND(productPin.minPrice)
                                            : ''}
                                    </span>
                                    <div className="text-center">
                                        <button
                                            onClick={() => {
                                                setProduct(productPin);
                                            }}
                                            className="pl-3 pr-3 cursor-pointer rounded-md pt-1 pb-2 mb-1 border-red-500 text-sm bg-red-600 text-white text-center"
                                        >
                                            Mua ngay
                                        </button>
                                    </div>
                                </div>
                            )}

                            <img src={liveInfo != null && liveInfo.shop.hinhAnh} alt="avatar" className="w-10 h-10 rounded-full" />
                            <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                    <span className="text-base font-semibold mr-4">
                                        {liveInfo != null && liveInfo.shop.tenShop} |{' '}
                                        <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                                        <span className="material-icons">
                                            <BiUser size={13} className="d-inline" />
                                        </span>
                                        <span>
                                            {' '}
                                            {countMember} <BiHeartCircle color="red" size={30} className="d-inline-block ml-3" />{' '}
                                        </span>
                                    </span>
                                </div>
                                <div className="text-xs text-gray-400 flex items-center space-x-1">
                                    <span>{liveInfo != null && liveInfo.tieuDe} 🔥🔥🔥</span>
                                </div>
                            </div>
                            {/* thôn baois */}
                            <div id="announce" style={{ position: 'absolute', left: '-400px', top: '300px', zIndex: '999999' }}>
                                <span class="inline-flex items-center bg-amber-50 text-amber-600 text-xs font-medium mr-2 pl-2 pr-2.5 rounded-full py-1">
                                    {/* <span class="w-1 h-1 mr-1 rounded-full bg-amber-400 flex"></span> */}
                                    <BiCartAdd color="red" size={20} />
                                    {message}
                                </span>
                            </div>
                            <div id="voucher" style={{ position: 'absolute', left: '-400px', top: '200px', zIndex: '999999' }}>
                                <span class="inline-flex items-center bg-green-100 text-green-600 text-xs font-medium mr-2 pl-2 pr-2.5 rounded-full py-1">
                                    <img style={{ width: '30px' }} src={birthday} />
                                    <span class="w-1 h-1 mr-1 rounded-full bg-green-200 flex"></span>Một số khuyến mãi vừa được áp dụng
                                </span>
                            </div>
                            {/* Stats */}
                            <div className="flex items-center space-x-4 text-gray-400 text-sm">
                                <div className="flex items-center space-x-1">
                                    <span className="material-icons">
                                        {' '}
                                        <BiLike />{' '}
                                    </span>
                                    <span>43.3K</span>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center space-x-2">
                                <Badge
                                    badgeContent={products != null && products.length}
                                    color="warning"
                                    sx={{
                                        '& .MuiBadge-dot': {
                                            backgroundColor: 'white', // Màu nền của số
                                        },
                                        '& .MuiBadge-dot span': {
                                            color: 'red', // Màu chữ của số
                                        },
                                    }}
                                >
                                    <SwipeableTemporaryDrawer setProduct={setProduct} products={products} />
                                </Badge>
                            </div>
                        </div>
                        <div id="containervideo">
                            <video
                                id="remoteVideo"
                                style={{ width: '100%', height: '90%', borderRadius: '5px' }}
                                // src="https://www.youtube.com/embed/yrviw5RysnE"
                                title="SHOPEE 9.9 SIÊU NHẠC HỘI - SIÊU NHÓM BÍ ẨN | Đắm chìm cùng các tiết mục từ SOOBIN, Rhymastic,..."
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                autoplay
                                // playsinline
                            ></video>
                        </div>
                    </div>
                    {/* div phải  */}
                    <div class="w-full lg:w-3/12 p-2 relative mt-1 lg:bg-gray-900 sm:bg-black-800 text-white lg:h-[640px] h-[200px]">
                        <div
                            className="relative h-full absolute left-0 bottom-0 sm:h-2/2  flex flex-col-reverse overflow-y-auto pb-4"
                            style={{
                                overflow: 'hidden',
                                scrollbarWidth: 'thin', // Firefox
                                scrollbarColor: 'gray ', // Firefox
                                scrollBehavior: 'smooth',
                                boxSizing: 'border-box',
                            }}
                        >
                            {/* <div className="pt-1    pl-2">
                                <div className="w-full max-w-sm min-w-[150px] " style={{overflow:"hidden"}}>
                                    <div className="relative flex">
                                        
                                        <svg
                                            onClick={() => sendMessage(1)}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600"
                                        >
                                            <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"></path>
                                        sxsxs
                                        </svg>
                                    </div>
                                </div>
                               
                            </div>
                             */}
                            {/* Comments */}
                            <AnimatePresence initial={false}>
                                {comments.map((v, index) => {
                                    return (
                                        <motion.div
                                            key={v.index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Comment data={v} />
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                        <div className="relative w-full max-w-sm min-w-[200px]">
                            <input
                                id="comments"
                                type="text"
                                className="w-full rounded-full pl-3 pr-12 pt-2 pb-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                placeholder="Bạn đang nghĩ gì..."
                            />
                            <BiSend onClick={() => sendMessage(1)} className="absolute right-3 top-2.5 text-slate-600 cursor-pointer" />
                        </div>
                    </div>
                </div>

                <br />
                <br />
                <input id="id" placeholder="Nhập phiên live mà bạn muốn vào" type="number"></input>
                <button
                    className="bg-white"
                    onClick={() => {
                        createConsumerTransport();
                    }}
                >
                    Tham gia
                </button>
                <br />
                <h2 className="text-2xl bg-black font-semibold text-white px-6 p-12 pt-14 m-0" style={{ borderTop: '1px dashed white' }}>
                    Video LIVE được đề xuất
                </h2>
            </div>
        </>
    );
};

export default WatchLive;

const Comment = ({ data}) => (
    <div className="flex items-center space-x-3 p-1 text-white rounded-lg max-w-sm align-items-start">
        <img className='w-9 h-9 rounded-full'
            src={data.avatar}
        />
        <div>
            <p className="text-sm font-semibold text-yellow-100">{data.from}</p>
            <p className="text-xs font-medium text-white">{data.text}</p>
        </div>
    </div>
);

// const VideoCard = ({ title, viewer }) => (
//     <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg group">
//         <img
//             src="https://shopee.vn/Set-%C3%A1o-b%C3%A8o-h%E1%BB%9F-vai-tay-b%E1%BB%93ng-k%C3%A8m-ch%C3%A2n-v%C3%A1y-xo%C3%A8-c%C3%B3-l%C3%B3t-trong-set-b%E1%BB%99-%C4%91%E1%BB%93-n%E1%BB%AF-ch%E1%BA%A5t-voan-t%C6%A1-phong-c%C3%A1ch-d%E1%BB%85-th%C6%B0%C6%A1ng-HB601-!-i.1307223277.29409107686?sp_atk=ed93abb8-4e51-4e63-b8fe-dd7404a12abd&xptdk=ed93abb8-4e51-4e63-b8fe-dd7404a12abd"
//             alt="Live thumbnail"
//             className="w-full h-48 object-cover"
//         />
//         <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">0 người xem</div>
//         <div className="absolute top-2 right-2 bg-pink-500 text-white text-sm px-2 py-1 rounded">LIVE</div>
//         <div className="p-4">
//             <h3 className="text-lg font-semibold">{title}</h3>
//             <p className="text-gray-400 text-sm">{viewer}</p>
//         </div>
//     </div>
// );
