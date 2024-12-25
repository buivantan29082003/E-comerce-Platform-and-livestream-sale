import { useNavigate } from 'react-router-dom';
import { FaCommentDots } from 'react-icons/fa';
import { MdOutlineSpeakerNotes } from 'react-icons/md';
import Header from '../../components/client/Header';
import api from '../../config/APIClient';
import { useEffect, useRef, useState } from 'react';
import { BsShop } from 'react-icons/bs';
import formatToVND from './FormatVnd';
import toast from 'react-hot-toast';
function Checkout() {
    const navigate = useNavigate();
    const [cartList, setCartList] = useState(new Map());
    const [data, setData] = useState({
        voucherSan: 0,
        voucherShop: 0,
        tienHang: 0,
        phiShip: 0,
    });

    const [flag, setFlag] = useState(0);
    const submit = () => {
        let ids = [];
        cartList.forEach((v, k) => {
            v.data.forEach((v) => {
                if (v.isCheck === true) {
                    ids.push(v.id);
                }
            });
        });
        localStorage.setItem('ids', JSON.stringify(ids));
        navigate('/user/auth/checkout');
    };

    const updatePlus = (v, p) => {
        toast.promise(api.post(
            '/cart/updatecart',
            {
                id: v.id,
                productDetailId: 14047,
                soLuong: v.sanPhamSoLuong + p,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )
            .then((v) => v.data)
            .then((vv) => {
                if (vv.status === 200) {
                    v.sanPhamSoLuong += p;
                    if(v.soLuocDaDung+v.sanPhamSoLuong>v.soLuongGioHan){
                        toast.error("Số lượng vược quá giới hạn đặt của live sẽ không còn áp dụng giá giảm")
                    }
                    setFlag(flag + 1);
                }else{
                    throw new Error(vv.message)
                }
            }),{
            loading:"Đang thêm vào giỏ hàng",
            success:"Cập nhật thành công vào giỏ hàng",
            error:(error)=>error.message
        })
    };

    useEffect(() => {
        let tongs = 0;
        cartList.forEach((v, k) => {
            v.tongDon = v.data.reduce((subtotal, sanPham) => {
                let giaSauKhuyenMai =
                    sanPham.isCheck === true
                        ? sanPham.giaBan * sanPham.sanPhamSoLuong -
                          sanPham.giaBan * sanPham.sanPhamSoLuong * (sanPham.giaTriKhuyenMai / 100)
                        : 0;
                return subtotal + giaSauKhuyenMai;
            }, 0);
            tongs += v.tongDon;
        });
        data.tienHang = tongs;
        setH(h + 1);
    }, [flag, cartList]);

    const [h, setH] = useState(0);
    const tableRef = useRef(null);

    const getCartInList = () => {
        api.get('/cart/getcart')
            .then((v) => v.data)
            .then((v) => {
                const a = new Map(Object.entries(v.data));
                let map = new Map();
                a.forEach((k, v) => {
                    map.set(v, {
                        data: k,
                    });
                });
                setCartList(map);
            });
    };

    useEffect((v) => {
        getCartInList();
    }, []);

    return (
        <div className="container w-full mx-auto px-4 py-8 bg-white rounded-lg m-4 shadow">
            <Header />
            <h1 className="text-2xl font-bold mb-6 border-b pb-2">Giỏ hàng</h1>
            <div>
                <div className="mb-6" ref={tableRef}>
                    {Array.from(cartList).map(([key, value]) => (
                        <div className="mb-6 m-2.5  rounded-sm p-3 shadow-sm">
                            <div className="flex items-center justify-between bg-white flex-wrap pb-3">
                                <div className="flex items-center">
                                    <div class="flex items-center ml-2">
                                        <input
                                            onClick={(e) => {
                                                value.data.forEach((v) => {
                                                    if (v.sanPhamSoLuong <= v.soLuong) {
                                                        v.isCheck = e.target.checked;
                                                    }
                                                });
                                                setFlag(flag + 1);
                                            }}
                                            id="checked-checkbox"
                                            type="checkbox"
                                            value=""
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                    </div>
                                    <BsShop size={6} color="orange" className="size-8 ml-4 mr-2" />
                                    <h2 className="text-md sm:text-sm">{value.data[0].shopName}</h2>
                                </div>
                                <button className="text-xs p-2 rounded-full hover:bg-blue-100 text-blue-500 flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
                                    <FaCommentDots />
                                    <span>Chat với shop</span>
                                </button>
                            </div>

                            {value.data.map((v) => (
                                <div className="flex flex-wrap items-center justify-between p-2 bg-white  mb-2">
                                    <div className=" mt-3 flex items-center space-x-4 w-full items-start">
                                        <input
                                            onClick={() => {
                                                if (v.isCheck == undefined) {
                                                    v.isCheck = true;
                                                } else {
                                                    v.isCheck = !v.isCheck;
                                                }
                                                setFlag(flag + 1);
                                            }}
                                            checked={v.isCheck === true}
                                            disabled={v.sanPhamSoLuong > v.soLuong}
                                            type="checkbox"
                                            value=""
                                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />

                                        <img
                                            src={v.hinhAnh}
                                            alt="Chi Dện Bộ LED Unit Gold Dơn MG 1/100 Unicorn Banshee Phenex"
                                            className="w-9 h-9 sm:w-25 sm:h-25 object-cover rounded-sm"
                                        />
                                        <div className="flex flex-col w-full sm:w-4/12">
                                            <p className="text-sm sm:text-sm font-semibold overflow-hidden text-ellipsis mb-1 max-w-[350px] whitespace-normal line-clamp-2">
                                                {v.tenSanPham}
                                            </p>
                                            <span className="text-xs sm:text-sm text-gray-500 flex items-center">
                                                Phân loại hàng <span class="mx-1">•</span> {v.tenBienThe}
                                            </span>

                                            <span className="text-xs sm:text-sm text-gray-500 flex items-center">
                                                Trạng thái: {v.sanPhamSoLuong > v.soLuong ? 'Hết hàng' : `còn ${v.soLuong}`}
                                            </span>
                                        </div>
                                        <div className="w-full fl sm:w-2/12 text-center flex items-center justify-between space-x-2">
                                            <span
                                                className={
                                                    'text-xs sm:text-xs text-gray-400 ' +
                                                    `${v.giaTriKhuyenMai > 0 ? 'line-through text-red-700' : ''}`
                                                }
                                            >
                                                <sup>đ</sup>
                                                {formatToVND(v.giaBan - v.giaBan * (v.giaTriKhuyenMai / 100))}
                                            </span>
                                            {v.liveId!=null&&<div
                                                class="inline-block px-2  text-red-500 font-semibold rounded-sm"
                                                style={{ border: '1px solid red ',fontSize:"10px" }}
                                            >
                                            SH Live  {v.giaGiam+" % - "+(v.soLuongGioHan<0?" Không giới hạn":"còn: "+v.soLuongGioHan)}
                                            </div>}
                                        </div>
                                        <div class="flex items-center border border-gray-300 rounded">
                                            <button type='button'
                                                onClick={() => updatePlus(v, 1)}
                                                class="px-4 py-2 border-r border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none"
                                            >
                                                +
                                            </button>

                                            <input
                                                onChange={(e) => {
                                                    if (Number(e.target.value)) {
                                                        updatePlus(v, e.target.value - v.sanPhamSoLuong);
                                                    }
                                                }}
                                                value={v.sanPhamSoLuong}
                                                type="number"
                                                class="w-16 text-center py-2 text-gray-700 focus:outline-none"
                                            />

                                            <button
                                                onClick={() => {
                                                    updatePlus(v, -1);
                                                }}
                                                class="px-4 py-2 border-l border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none"
                                            >
                                                -
                                            </button>
                                        </div>

                                        <div className="w-full sm:w-2/12 text-right">
                                            <p className="text-sm sm:text-xs text-right text-orange-700 font-medium">
                                                <sup>đ</sup>
                                                {formatToVND((v.giaBan - v.giaBan * (v.giaTriKhuyenMai / 100)) * v.sanPhamSoLuong)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="grid grid-cols-12 gap-4 mt-3 items-start">
                                <div className="col-span-12 lg:col-span-6  ">
                                    <MdOutlineSpeakerNotes className="inline" size="15" />{' '}
                                    <span className="text-sm"> Voucher của shop</span>
                                    <br />
                                    <textarea
                                        onChange={(e) => {
                                            value.ghiChu = e.target.value;
                                        }}
                                        rows={10}
                                        className="mt-2 flex-grow border border-gray-100 p-2 rounded-sm resize-none h-12 w-full"
                                        placeholder="Lưu ý cho người bán..."
                                    ></textarea>
                                </div>

                                <div className="col-span-12 lg:col-span-6 text-right mt-2">
                                    <span className="text-sm sm:text-xs mr-2 ">Tiền sản phẩm ({value.length} sản phẩm): </span>
                                    <span className="text-sm sm:text-md text-blue-700">
                                        {' '}
                                        <sup>đ</sup>
                                        {formatToVND(value.tongDon)}
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
                    <hr className="text-gray-400 border-dotted" />
                    <div className="my-4">
                        <div className="flex justify-between mb-2">
                            <span></span>
                            <span className="text-gray-500 text-sm">
                                Tổng tiền hàng: <sup className="ml-4">đ</sup>
                                {data.tienHang.toFixed(0)}
                            </span>
                        </div>
                    </div>
                    <hr />
                    <div className="mt-6 flex justify-end flex items-start justify-between">
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
                            className="bg-red-600 text-white px-6 py-2 rounded-sm shadow hover:bg-blue-600"
                        >
                            Mua hàng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
