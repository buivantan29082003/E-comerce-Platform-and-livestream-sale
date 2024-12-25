import React, { useCallback, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import * as mediasoupClient from 'mediasoup-client';
import {BiCart, BiCartAdd, BiHeart, BiSend, BiUser } from 'react-icons/bi';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import api from '../../config/APISeller';
import apiNormal from '../../config/APINormal';
import apiSeller from '../../config/APISeller';
import floatingheart from '../../utils/images/seller/floatingheart.gif';
import ManageLive from './ManageLive';
import gsap from 'gsap';
import { BsJournalMinus } from 'react-icons/bs';
import { Button } from '@mui/material';
import PositionedPopper from './EmojiTooltip';
import toast from 'react-hot-toast';
const socket = io('http://localhost:4000');

const SellerLive = () => {
    const { id } = useParams();
    const [data, setData] = useState({
        device: null,
        producerTransport: null,
    });
    const [liveInfo, setLiveInfo] = useState(null);
    const [comments, setComments] = useState([]);
    const videoRef = useRef(null);
    const [products, setProducts] = useState([]);
    const fetchProduct = () => {
        api.get('/productinlives?id=' + id)
            .then((v) => v.data)
            .then((v) => {
                setProducts(v.data);
            })
            .catch((error) => {
            alert(error);
            }
        );
    };

    const [activeCart, setActiveCart] = useState({
        carts: [],
        member: 0,
    });

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
    useEffect(() => {
        apiSeller
            .get('/checklive?liveId=' + id)
            .then((v) => v.data)
            .then((v) => {
                if (v.status === 200) {
                    socket.emit('hostconnect', {
                        liveId: id,
                        token: Cookies.get('tokenModel') != null ? Cookies.get('tokenModel') : '',
                        role: 'host',
                    });
                    apiNormal
                        .get('/getinfolive?id=' + id)
                        .then((v) => v.data)
                        .then((v) => {
                        if (v.status === 200) {
                            setLiveInfo(v.data);
                        }
                    });
                    socket.on('message', (data) => {
                        switch (data.type) {
                            case 'COMMENT':
                                setComments((prevComments) => [data, ...prevComments]);
                                break;
                            case 'NEWMEMBER':
                                activeCart.member++;
                                break;
                            case 'ADDTOCART':
                                activeCart.carts.push(data.user);
                                break;
                            case "RELOAD":
                                // fetchProduct()
                                break;
                            case "ENDLIVE":
                                // alert("Helo ")
                                // socket.close()
                                // data.producerTransport.close()
                                window.location.href="/seller/live"
                                break;
                            case "ENDLIVEFAIL":
                                toast.error("Kết thúc live không thành công, vui lòng thử lại sao.")
                                break;
                            default:
                                break;
                        }
                    });

                    socket.on('connectsuccess', async (data) => {
                        socket.emit('getRtpCapabilities');
                        socket.on('sendRtpCapabilities', async (rtpCapabilities) => {
                            await loadDevice(rtpCapabilities);
                        });
                    });
                    socket.on('connectfail', async (data) => {
                        alert('Phiên live có vẻ không hợp lệ');
                    });
                    socket.on('reconnect', async (data) => {
                        socket.emit('getRtpCapabilities');
                        socket.on('sendRtpCapabilities', async (rtpCapabilities) => {
                            await loadDevice(rtpCapabilities);
                        });
                    });
                    return () => {
                        socket.disconnect();
                    };
                } else {
                    let a = v.data;
                    if (window.confirm('Bạn đang live ở phiên live số ' + a + ', bạn có muốn tiếp tục')) {
                    }
                }
            });
    }, []);
    const showVouhers = () => {
        const announceDiv = document.getElementById('voucher');
        gsap.to(announceDiv, { left: '5px', duration: 0.2 });
        setTimeout(() => {
            gsap.to(announceDiv, { left: '-400px', duration: 0.3 });
            activeCart.carts = [];
        }, 2000);
    };

    const loadDevice = async (rtpCapabilities) => {
        try {
            data.device = new mediasoupClient.Device();
            await data.device.load({ routerRtpCapabilities: rtpCapabilities });
            createSendTransport()
        } catch (error) {
            console.error('Error loading device:', error);
        }
    };
    const [message, setMessage] = useState('');
    const sendProductPin = (product) => {
        socket.emit('message', { type: 4, data: product });
    };
    const showDiv = () => {
        const announceDiv = document.getElementById('announce');
        gsap.to(announceDiv, { left: '5px', duration: 0.2 });
        setTimeout(() => {
            gsap.to(announceDiv, { left: '-400px', duration: 0.3 });
            activeCart.carts = [];
        }, 2000);
    };
    const showMessage = useCallback(() => {
        setInterval(() => {
            if (activeCart.member > 0) {
                showVouhers();
                activeCart.member = 0;
            }
            if (activeCart.carts.length > 0) {
                if (activeCart.carts.length > 1) {
                    setMessage(activeCart.carts[0].tenTaiKhoan + ' Và một số người khác đang mua hàng');
                } else {
                    setMessage(activeCart.carts[0].tenTaiKhoan + ' đang mua hàng');
                }
                showDiv();
            }
        }, 4500);
    }, []);

    const createSendTransport = async () => {
        socket.emit('createTransport');
        socket.on('transportCreated', async ({ id, iceParameters, iceCandidates, dtlsParameters }) => {
            data.producerTransport = data.device.createSendTransport({
                id,
                iceParameters,
                iceCandidates,
                dtlsParameters,
            });

            data.producerTransport.on('connect', ({ dtlsParameters }, callback, errback) => {
                socket.emit('connectTransport', { dtlsParameters }, (error) => {
                    if (error) {
                        errback(error);
                    } else {
                        callback();
                    }
                });
            });

            data.producerTransport.on('produce', (parameters, callback, errback) => {
                socket.emit(
                    'produce',
                    { transportId: data.producerTransport.id, kind: parameters.kind, rtpParameters: parameters.rtpParameters, liveId: 1 },
                    ({ id, error }) => {
                        if (error) {
                            errback(error);
                        } else {
                            callback({ id });
                        }
                    },
                );
            });
            await produce();
            showMessage();
        });
    };

    const produce = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            const track = stream.getVideoTracks()[0];
            const producer = await data.producerTransport.produce({ track });
            document.getElementById('video').srcObject = stream;
            document.getElementById('video').play();
            fetchProduct();
        } catch (error) {
            console.error('Error producing media stream:', error);
        }
    };

    return (
        <>
            <div className="bg-black w-full">
                <div class="flex flex-wrap w-full p-6 bg-black">
                    <div class="w-full lg:w-9/12 p-1 bg-black-900 text-white lg:h-[570px] h-[450px]">
                        <div className="flex position-relative items-center mb-1 bg-gray-900 text-white p-2 rounded-lg w-full space-x-4">
                            <img src={liveInfo != null && liveInfo.shop.hinhAnh} alt="avatar" className="w-10 h-10 rounded-full" />
                            <div className="flex-1">
                                <div className="text-base font-semibold mr-4">
                                    <span>{liveInfo != null && liveInfo.tieuDe} 🔥🔥🔥</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className=" text-sm text-gray-400 flex items-center space-x-1">
                                    <span className="hidden md:inline">
                                            {liveInfo != null && liveInfo.shop.shopName} {' '}
                                            </span>                                        
                                        <CountCart socket={socket} />
                                    </span>
                                </div>
                                
                            </div>
                            <div id="announce" style={{ position: 'absolute', left: '-400px', top: '300px', zIndex: '999999' }}>
                                <span class="inline-flex items-center bg-amber-50 text-amber-600 text-xs font-medium mr-2 pl-2 pr-2.5 rounded-full py-1">
                                    <BiCartAdd color="red" size={20} />
                                    {message}
                                </span>
                            </div>
                            <div id="voucher" style={{ position: 'absolute', left: '-400px', top: '200px', zIndex: '999999' }}>
                                <span class="inline-flex items-center bg-red-50 text-red-600 text-xs font-medium mr-2 pl-2 pr-2.5 rounded-full py-1">
                                    <BsJournalMinus color="red" size={20} /> {activeCart.member} người vừa mới tham gia
                                </span>
                            </div>
                            <img style={{ position: 'absolute', right: '8%', top: '300px', zIndex: '999999' }} src={floatingheart} />

                            <ManageLive
                                socket={socket}
                                liveId={id}
                                sendMessage={sendProductPin}
                                products={products}
                                setProducts={setProducts}
                            />
                            <div onClick={() => {
                                socket.emit("message",{type:8})
                            }} className="flex items-center space-x-2">
                               <Button>Stop</Button>
                            </div>
                            <div onClick={() => document.getElementById('cartlive').click()} className="flex items-center space-x-2">
                               <span className='bg-red-600 text-white pt-1 pb-1 pl-4 pr-4 rounded-lg'>Live</span>
                            </div>
                        </div>
                        <video
                            id="video"
                            ref={videoRef}
                            style={{ width: '100%', height: '90%', borderRadius: '5px', overflow: 'hidden' }}
                            title="SHOPEE 9.9 SIÊU NHẠC HỘI - SIÊU NHÓM BÍ ẨN | Đắm chìm cùng các tiết mục từ SOOBIN, Rhymastic,..."
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            playsinline
                        ></video>
                    </div>
                    <div class="w-full lg:w-3/12 p-3 relative mt-1 lg:bg-gray-900 sm:bg-black-800 text-white lg:h-[570px] h-[200px]">
                        <div
                            className="relative h-full absolute left-0 bottom-0 sm:h-2/2  flex flex-col-reverse overflow-y-auto pb-4"
                            style={{
                                overflow: 'hidden',
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'gray ', 
                                scrollBehavior: 'smooth',
                                boxSizing: 'border-box',
                            }}
                        >
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
                className="w-full rounded-full pl-3  pt-2 pb-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Bạn đang nghĩ gì..."
              />
              <PositionedPopper/>
              <BiSend
                onClick={() => sendMessage(1)}
                className="absolute right-3 top-2.5 text-slate-600 cursor-pointer"
              />
            </div>
                    </div>
                </div>

                <br />
                <br />
                <input id="id" placeholder="Nhập phiên live mà bạn muốn vào" type="number"></input>
                <button
                    className="bg-white"
                    onClick={() => {
                        produce();
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

export default SellerLive;
    const Comment = ({ data }) => (
        <div className="flex items-center  mt-3 space-x-3 p-1 text-white rounded-lg max-w-sm align-items-start">
            <img className="w-8 h-8 rounded-full" src={data.avatar} />
            <div>
                <p className="text-xs  text-yellow-100">{data.from}</p>
                <p className="text-xs  text-white">{data.text}</p>
            </div>
        </div>
    );
    const CountCart=React.memo(({socket})=>{
    const [countCart,setCountCart]=useState("0")
    const [countMember,setCountMember]=useState("0")
    const [countLike,setCountLike]=useState("1k")
    useEffect(()=>{
      socket.on("message", (data) => {
        switch (data.type) {
          case "ADDTOCART":
            setCountCart(data.countCart)
            break;
        case "NEWMEMBER":
            setCountMember(data.sizeMember)
            break;
        case "COUNTLIKE":
            setCountLike(data.data)
            break;
          default:
            break;
        }
      });
    },[])
    return <>

<span className="material-icons  ml-2">
            <BiHeart size={15} className="d-inline" />  {countLike}
    </span>
        <span className="material-icons  ml-2">
            <BiUser size={15} className="d-inline" />  {countMember}
        </span>
    <span className="material-icons  ml-2">
            <BiCart size={15} className="d-inline" />  {countCart}
    </span>
    </>

  })


  
  