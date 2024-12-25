import { FaChevronDown, FaMapMarkerAlt, FaShippingFast } from 'react-icons/fa';
import { MdCardGiftcard, MdOutlineSpeakerNotes } from 'react-icons/md';
import Header from '../../components/client/Header';
import api from '../../config/APIClient';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import VariableWidth from './VoucherChoose';
import VoucherSanChoose from './VoucherSan';
import { useNavigate } from 'react-router-dom';
import { FcShop } from 'react-icons/fc';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { BiSolidDiscount } from 'react-icons/bi';
import formatToVND from './FormatVnd';
import toast from 'react-hot-toast';
function Checkout() {
    const [cartList, setCartList] = useState(new Map());
    const [diaChi, setDiaChi] = useState({
        toanBoDiaChi: '',
    });
    const navigate = useNavigate();
    const [flag, setFlag] = useState(0);
    const [order, setOrder] = useState({
        thanhToan:{
            id:2
        }
    });
    const [data, setData] = useState({
        voucherSan: 0,
        voucherShop: 0,
        tienHang: 0,
        phiShip: 0,
    });
    const submit = () => {
            order.diaChi = diaChi;
            let cartItem = [];
            const result = {};
            cartList.forEach((v, k) => {
                v.data.forEach((v) => {
                    cartItem.push(v.id);
                });
                v.data = [];
                result[k] = v;
                if (v.voucherShop != undefined) {
                    v.voucherShopId = {
                        id: v.voucherShop.voucherId,
                    };
                    v.voucherShop = undefined;
                }
            });
            order.items = cartItem;
            order.orderShop = result;
        toast.promise(api.post('/order/addorder', order, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((v) => v.data)
            .then((v) => {
                if (v.status == 200) {
                    if (order.thanhToan.id === 2) {
                        window.open(v.data, '_blank');
                    }
                } else {
                    throw new Error(v.message)
                }
            }),{
            loading:"Đang chuẩn bị",
            error:(error)=>error.message
        })
            
    };

    useEffect(() => {
        let tongs = 0;
        data.voucherShop = 0;
        data.phiShip = 0;
        cartList.forEach((v, k) => {
            let ton = v.data.reduce((subtotal, sanPham) => {
                let giaSauKhuyenMai =
                    sanPham.giaBan * sanPham.sanPhamSoLuong - sanPham.giaBan * sanPham.sanPhamSoLuong * (sanPham.giaTriKhuyenMai / 100);
                return subtotal + giaSauKhuyenMai;
            }, 0);
            v.tongTien = ton;
            tongs += ton;
            if (v.voucherShop !== undefined) {
                data.voucherShop += v.voucherShop.priceDiscount;
            }
            data.phiShip += v.phiShip;
        });
        data.tienHang = tongs;
        if (order.voucherSan != null) {
            let tienTru = 0;
            if (order.voucherSan.hinhThucApDung == 1) {
                tienTru = tongs - data.voucherShop;
            } else {
                tienTru = data.phiShip;
            }
            if (order.voucherSan.loaiVoucher == 1) {
                let t = order.voucherSan.giaTriGiam;
                data.voucherSan =
                    (t / 100) * tienTru > order.voucherSan.gioiHanGiam && order.voucherSan.gioiHanGiam > 0
                        ? order.voucherSan.gioiHanGiam
                        : (t / 100) * tienTru;
            } else {
                let t = order.voucherSan.giaTriGiam;
                data.voucherSan = tienTru - t < 0 ? tienTru : tienTru - t;
            }
        }
        setH(h + 1);
    }, [flag, cartList]);

    const [h, setH] = useState(0);
    const tableRef = useRef(null);
    const [diaChis, setDiaChis] = useState([]);

    const getCartInList = () => {
        let a = JSON.parse(localStorage.getItem('ids'));
        console.log(a);
        api.post('/cart/getcartinlist', a, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((v) => v.data)
            .then((v) => {
                const a = new Map(Object.entries(v.data));
                let map = new Map();
                a.forEach((k, v) => {
                    map.set(v, {
                        data: k,
                        ghiChu: '',
                        phiShip: 0,
                    });
                });
                if (a.size < 1) {
                    navigate('/user/auth/cart');
                }
                setCartList(map);
                gsap.fromTo(tableRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
            });
    };
    async function calculateShipping() {
        const token = '1c0642bd-4891-11ef-af01-5a4abb38d4d4';
        const shopId = '5146217';
        const requestData = {
            from_district_id: 1454,
            from_ward_code: '21211',
            service_id: 53320,
            service_type_id: null,
            to_district_id: diaChi.districtId,
            to_ward_code: diaChi.wardCode,
            height: 50,
            length: 20,
            weight: 200,
            width: 20,
            insurance_value: 10000,
            cod_failed_amount: 2000,
            coupon: null,
            items: [
                {
                    name: 'TEST1',
                    quantity: 1,
                    height: 200,
                    weight: 1000,
                    length: 200,
                    width: 200,
                },
            ],
        };

        const response = await fetch('https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Token: token,
                ShopId: shopId,
            },
            body: JSON.stringify(requestData),
        });

        const result = await response.json();
        if (result.code === 200) {
            return result.data.total;
        } else {
            alert(`Có lỗi xảy ra: ${result.message}`);
        }
    }

    const getDiaChiOfUser = () => {
        api.get('/diachi/getdiachi')
            .then((v) => v.data)
            .then((v) => {
                setDiaChis(v);
                setDiaChi(v[0]);
                cartList.forEach((v, k) => {
                    calculateShipping().then((vv) => {
                        v.phiShip = vv;
                        setFlag(flag + 1);
                    });
                });
            });
    };

    useEffect((v) => {
        getCartInList();
        getDiaChiOfUser();
    }, []);

    return (
        <div className="container w-full mx-auto px-4 py-8 bg-white rounded-lg m-4 shadow">
            <Header />
            <h1 className="text-2xl font-bold mb-6 border-b pb-2">Thanh Toán</h1>
            <form>
                <div className="container mx-auto mb-6">
                    <Accordion>
                        <AccordionSummary expandIcon={<FaChevronDown />} aria-controls="panel1-content" id="panel1-header">
                            <FaMapMarkerAlt size="22" className="mr-3" />
                            Địa chỉ nhận hàng - <span className="ml-2 text-sm text-black">{diaChi.toanBoDiaChi}</span>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div id="diachis">
                                {diaChis.map((v, index) => (
                                    <div key={index} className="border-t pt-2 flex flex-wrap items-center">
                                        <p className="text-sm font-bold text-gray-900 mx-3">SDT: {v.soDienThoai}</p>
                                        <p className="text-sm text-gray-600">{v.toanBoDiaChi}</p>
                                        <div className="ml-auto">
                                            <input
                                                name="a"
                                                onClick={() => {
                                                    setDiaChi(v);
                                                }}
                                                type="radio"
                                                id={`checkbox-${index}`}
                                            />
                                            <label
                                                htmlFor={`checkbox-${index}`}
                                                className="cursor-pointer text-sm text-blue-500 hover:text-blue-700 ml-2"
                                            >
                                                Chọn
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>

                {/* */}
                <div className="mb-6" ref={tableRef}>
                    {Array.from(cartList).map(([key, value]) => (
                        <div className="bg-white p-4 rounded-lg shadow-md w-full mx-auto my-4">
                            <div className="flex items-center gap-3 border-b pb-4 mb-4">
                                <span className="flex items-center gap-2 text-gray-600 text-sm font-bold">
                                    <FcShop className="size-8 ml-4 " />
                                    Minh Long
                                </span>{' '}
                                |<span class="px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-md">Xem shop</span>
                            </div>
                            {value.data.map((v) => {
                                const giaTriKhuyenMai = v.giaTriKhuyenMai / 100;
                                v.giaDaGiam= v.giaBan * giaTriKhuyenMai * v.sanPhamSoLuong;
                                if (v.liveId != null && (v.soLuongGioHan == -1 || v.soLuongGioHan >=v.soLuocDaDung+v.sanPhamSoLuong)) {
                                    // const soLuongApDung = Math.min(v.sanPhamSoLuong, v.soLuongGioHan);
                                    const giaGiamLive = (v.giaBan * v.sanPhamSoLuong) * (1 - giaTriKhuyenMai) * (v.giaGiam / 100);
                                    v.giaDaGiam += giaGiamLive;
                                }
                                return <>
                                    <div className="flex flex-wrap items-center gap-4  pb-4 mb-4">
                                    <img src={v.hinhAnh} alt="Tao Do Tan Cuong" className="w-15 h-20 object-cover rounded-lg" />
                                    <div className="flex flex-col flex-1">
                                        <span className="text-md font-medium text-green-800">{v.tenSanPham}</span>
                                        <span className="text-sm text-gray-500">Loại: {v.tenBienThe} <br/>
                                            {v.liveId!=null&&
                                                <span className=' px-2 text-xs text-red-500 font-bold rounded-sm' 
                                                style={{border:"1px solid red",display:"inline-block"}} >Live Giảm:{v.giaGiam}% - còn: {v.soLuongGioHan}</span>
                                            }
                                        </span>
                                        
                                        <span className={' inline-block text-red-500 text-xs mt-1 '}>
                                            Giảm: {v.giaTriKhuyenMai == 0 ? 0 : v.giaTriKhuyenMai} %
                                        </span>
                                    </div>
                                    <div className="text-right">
                                        <span className=" text-gray-800 text-xs">
                                            <span className={`${v.giaTriKhuyenMai > 0 ? 'line-through text-red-700' : ''}`}>
                                                {' '}
                                                Giá bán:
                                                <sup className="ml-1">đ</sup>{v.giaBan} 
                                            </span>
                                        </span>
                                        <div className="mt-3 mb-3 text-xs text-gray-800">Số lượng: {v.sanPhamSoLuong}</div>
                                        <span className=" text-gray-800 text-xs">
                                            Tổng: <sup>đ</sup> {formatToVND(v.giaBan)} - {formatToVND(v.giaDaGiam)}
                                        </span>
                                    </div>
                                </div>  
                                </>
                            }
                            )}
                            <hr class="border-t border-gray-500 border-dashed"/>
                            <div className="flex items-center justify-center px-4 py-3  border-gray-300 relative">
                                <div className="flex items-center text-red-500">
                                    <BiSolidDiscount size={20} className="inline mr-2 " />
                                    <span className="text-sm text-gray-700">Voucher của Shop</span>
                                </div>
                                <div className="absolute right-0">
                                    <VariableWidth setFlag={setFlag} flag={flag} values={value} keys={key} />
                                </div>
                            </div>

                            <div className="flex items-start gap-4 bg-light p-3">
                                <div className="flex flex-col flex-1">
                                    <span className="text-gray-500 text-sm">
                                        <MdOutlineSpeakerNotes className="inline" size="15" /> <span className="text-sm"> Lời nhắn</span>
                                        <br />
                                        <textarea
                                            style={{ width: '50%' }}
                                            onChange={(e) => {
                                                value.ghiChu = e.target.value;
                                            }}
                                            rows={10}
                                            className="mt-2 flex-grow border border-gray-100 p-2 rounded-sm resize-none h-12 w-full"
                                            placeholder="Lưu ý cho người bán..."
                                        ></textarea>
                                    </span>
                                </div>
                                <div className="col-span-12  lg:col-span-6 text-right mt-2">
                                    <span className="text-sm sm:text-xs mr-2 font-semibold">Tiền sản phẩm sản phẩm): </span>
                                    <span className="text-sm sm:text-md text-blue-700">
                                        {' '}
                                        <sup>đ</sup>
                                        {value.tongTien}
                                    </span>
                                    <br />
                                    <br />
                                    <span className="text-sm sm:text-xs mr-2 font-semibold">Tiền voucher : </span>
                                    <span className="text-sm sm:text-md text-blue-700">
                                        {' '}
                                        <sup>đ</sup>
                                        {value.voucherShop != null ? value.voucherShop.priceDiscount.toFixed(0) : 0}
                                    </span>

                                    <br />
                                    <br />
                                    <span className="text-sm sm:text-xs mr-2 font-semibold ">Phí ship : </span>
                                    <span className="text-sm sm:text-md text-blue-700">
                                        {' '}
                                        <sup>đ</sup>
                                        <span id={'ship' + `${key}`}></span>
                                    </span>
                                    <br />
                                    <br />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ height: `${cartList.size < 1 ? '299px' : '0px'}` }}></div>
                <div className="mt-3 shawdow-sm border-blue-300 p-6 m-2.5 rounded-sm">
                    <div className="flex flex-wrap justify-between items-center mb-4">
                        <div className="flex items-center ">
                            <BiSolidDiscount color="red" size={20} />
                            <span className="ml-2"> Model World Voucher</span>
                        </div>
                        <div className="flex text-blue-500 hover:underline no-underline items-center">
                            {order.voucherSan != null && order.voucherSan.hinhThucApDung == 1 ? <MdCardGiftcard /> : <FaShippingFast />}
                            <VoucherSanChoose datas={data} flag={flag} setFlag={setFlag} order={order} />
                        </div>
                    </div>

                    <hr className="text-gray-400 border-dotted" />
                    
                    {/* Payment */}
                    <div className="flex flex-wrap justify-between items-center my-4">
                        <div className="flex items-center">
                            <span className="text-blue-500 mr-2">💳</span>
                            <span>Phương thức thanh toán</span>
                        </div>
                        <span className="no-underline text-sm text-blue-500 ">
                            <input onClick={()=>{
                                order.thanhToan.id=2
                            }} name='d' checked type='radio'/> Online <input onClick={()=>{
                                order.thanhToan.id=1
                            }} className='ml-2' name='d' type='radio'/> COD
                        </span>
                    </div>

                    <hr className="border-dotted text-gray-400" />

                    {/*  */}
                    <div className="my-4">
                        <div className="flex justify-between mb-2">
                            <span></span>
                            <span className="text-gray-500 text-sm">
                                Tổng tiền hàng: <sup className="ml-4">đ</sup>
                                {data.tienHang.toFixed(0)}
                            </span>
                        </div>
                        <div className="mt-3 flex justify-between mb-2">
                            <span></span>
                            <span className="text-gray-500 text-sm">
                                Phí vận chuyển: <sup className="ml-4">đ</sup>
                                {data.phiShip}
                            </span>
                        </div>
                        <div className="mt-3 flex justify-between mb-2">
                            <span></span>
                            <span className="text-gray-500 text-sm">
                                Tiền voucherShop:
                                {data.voucherShop.toFixed(0)}
                            </span>
                        </div>
                        <div className="mt-3 flex justify-between mb-2">
                            <span></span>
                            <span className="text-gray-500 text-sm">
                                Tiền voucherSan:
                                {data.voucherSan.toFixed(0)}
                            </span>
                        </div>
                        <div className="mt-3 flex justify-between mb-2">
                            <span></span>
                            <span className="text-gray-500 text-sm">
                                tổng tiền hàng:
                                <sup className="ml-4" style={{ color: 'red' }}>
                                    đ
                                </sup>
                                <span className="text-lg text-red text-red-500 text-lg font-medium">
                                    {(data.tienHang + data.phiShip - data.voucherSan - data.voucherShop).toFixed(0)}
                                </span>
                            </span>
                        </div>
                    </div>

                    <hr />
                    <div className="mt-6 flex justify-end align-content-start justify-content-between">
                        <p className="text-xs sm:text-xs text-gray-500 mt-4">
                            Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo
                            <a href="//" className="text-blue-500 hover:underline">
                                {' '}
                                Điều khoản Model World
                            </a>
                        </p>
                        <button
                            onClick={() => {
                                submit();
                            }}
                            type="button"
                            className="bg-blue-700 text-white px-6 py-2 rounded-sm shadow hover:bg-blue-600"
                        >
                            Đặt hàng
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Checkout;
