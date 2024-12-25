import React, { useEffect, useState } from 'react';
import api from '../../../config/APIClient';
import { useNavigate } from 'react-router-dom';
import OrderEmpty from '../../../utils/images/seller/OrderEmpty.png';
import { CgCheckO } from 'react-icons/cg';
import { FcShop } from 'react-icons/fc';
import RatingModal from './ModelRating';
// import "../../client/OrderManage.js/style.css";
// import  "../../client/OrderManage.js/style.css"
const MyAccountOrder = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState(1);
    const [page, setPage] = useState(0);
    const [flag, setFlag] = useState(0);
    const renderComponent = (order, index) => {
        // eslint-disable-next-line default-case
        switch (activeTab) {
            case 1:
                return <ActionPayment setOrders={setOrderss} navigate={navigate} orderId={order.id} index={index} />;
            case 2:
                return <ActionPrepare navigate={navigate} orderId={order.id} setOrders={setOrderss} index={index} />;
            case 3:
                return <ActionNormal navigate={navigate} orderId={order.id}/>;
            case 4:
                return <ActionNormal navigate={navigate} orderId={order.id}/>;
            case 5:
                return <ActionFinish order={order} index={index} navigate={navigate} setFlags={setFlags} />;
            case 6:
                return <ActionNormal navigate={navigate} orderId={order.id}/>;
            case 7:
                return <ActionCacel orderId={order} navigate={navigate} />;
        }
    };

    const setOrderss=(index)=>{
        setOrders((prevOrders) => prevOrders.filter((_, i) => i !== index));
    }

    const setFlags = () => {
        setFlag(flag + 1);
    };

    useEffect(() => {
        api.get(`/order/getAllOrderNormal?trangThaiId=${activeTab}`)
            .then((v) => {
                return v.data;
            })
            .then((v) => {
                setOrders(v.content);
            });
    }, [activeTab]);

    return (
        <div className="col-lg-10">
            <ul className="nav nav-tabs bg-white" id="myTab" role="tablist">
                {[
                    'Chờ thanh toán',
                    'Chuẩn bị hàng',
                    'Chờ lấy hàng',
                    'Chờ giao hàng',
                    'Giao thành công',
                    'Giao thất bại',
                    'Đơn hủy',
                ].map((tab, index) => (
                    <li className="nav-item" role="presentation" key={index}>
                        <button
                            className={`nav-link ${activeTab === index ? 'active' : ''}`}
                            onClick={() => {
                                setActiveTab(index+1);
                            }}
                            type="button"
                            role="tab"
                        >
                            {tab}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="tf-search-sticky pt-3">
                <form className="tf-mini-search-frm">
                    <fieldset className="text">
                        <input
                            type="text"
                            placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên sản phẩm"
                            name="text"
                            required
                        />
                    </fieldset>
                    <button type="submit">
                        <i className="icon-search"></i>
                    </button>
                </form>
            </div>
            <div className="tab-content" id="myTabContent">
                <div id="tab0" role="tabpanel">
                    <div className="my-account-content account-order">
                        <div className="wrap-account-order">
                        <div
                          className={`${orders.length < 1 ? 'flex h-[580px] w-full bg-white text-center justify-center items-center flex-col' : 'hidden'}`}
                            >
                            <img style={{ width: '200px', marginBottom: '16px' }} src={OrderEmpty} alt="Order Empty" />
                            <p className="text-sm text-gray-500">Không có dữ liệu...</p>
                            </div>
                            <table>
                                <tbody>
                                {orders.map((order, index) => (
                                        <>
                                            <div key={index} className="mb-2 border rounded-lg p-4 bg-white shadow-sm">
                                                {/* Header */}
                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                                                    <div className="flex items-center mb-2 md:mb-0">
                                                        <FcShop/>
                                                        <span className="font-semibold text-gray-700">{order.shop.shopName}</span>
                                                        <a
                                                            href={order.links?.view_shop}
                                                            className="ml-4 px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center"
                                                        >
                                                            <img
                                                                src="/assets/client/images/icon/Store2.svg"
                                                                alt=""
                                                                className="mr-1 w-4 h-4"
                                                            />
                                                            Xem Shop
                                                        </a>
                                                    </div>
                                                    
                                                </div>
                                                {order.orderDetails &&
                                                    order.orderDetails.map((v, i) => (
                                                        <div key={i} className="flex flex-col md:flex-row items-start md:items-center mb-4">
                                                            <div className="w-16 h-16 md:w-24 md:h-24 overflow-hidden rounded-md mr-4">
                                                                <img
                                                                    src={v.product.hinhAnh}
                                                                    alt="Product"
                                                                    className="object-cover w-full h-full"
                                                                />
                                                            </div>
                                                            <div className="flex-1 mb-2 md:mb-0">
                                                                <p className="font-semibold text-gray-800">
                                                                    {v.product.product.tenSanPham}
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    Phân loại hàng: {v.product.kichThuoc.tenKichThuoc} x {v.soLuong}
                                                                </p>
                                                                {activeTab===5?<RatingModal orderDetail={v}  />:<></>}   
                                                                
                                                                
                                                            </div>
                                                            <div className="flex flex-col items-end">
                                                                <p className="text-gray-500 line-through">
                                                                    ₫{(v.giaBan * 2).toLocaleString()}
                                                                </p>
                                                                <p className="text-red-600 font-semibold">₫{v.giaBan.toLocaleString()}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                <hr class="border-t border-gray-500 border-dashed"/>
                                                {/* Total Price and Actions */}
                                                <div className="flex flex-col md:flex-row justify-between items-center mt-4">
                                                    <p className="text-gray-700 font-semibold mb-2 md:mb-0">
                                                        Thành tiền: <span className="text-red-600">₫{order.total}</span>
                                                    </p>
                                                    <div className="flex space-x-2">
                                                       {renderComponent(order,index)}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                </tbody>
                            </table>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccountOrder;

const ActionPayment = ({ orderId, index, navigate ,setOrders}) => {

    const getUrlPayMent = () => {
        api.get(`/order/geturlpayment?orderId=${orderId}`)
            .then((v) => v.data)
            .then((v) => {
                if (v.status == 200) {
                    window.open(v.data, '_blank');
                } else {
                    alert(v.message);
                }
            });
    };

    const cancelOrder = () => {
        const userInput = prompt('Please enter your text:');
        api.post(`/order/cancelsingle/${orderId}/${userInput}`)
            .then((v) => v.data)
            .then((v) => {
                if (v.status == 200) {
                    alert(v.message);
                    setOrders(index)
                } else {
                    alert(v.message);
                }
            })
            .catch((Error) => {
                alert('Yêu cầu xử lý thất bại, vui lòng thử lại trong giây lác');
            });
    };
    return (
        <>
            <button
                onClick={() => {
                    getUrlPayMent();
                }}
                className="bg-transparent hover:bg-yellow-500 text-yellow-700 font-semibold  py-2 px-4 border border-yellow-500 hover:border-transparent rounded">
            
                Thanh toán ngay
            </button>
            <button onClick={() => navigate(`/user/auth/orderdetail/${orderId}`)} className="bg-transparent hover:bg-green-500 text-green-700 font-semibold  py-2 px-4 border border-green-500 hover:border-transparent rounded">
            Xem chi tiết đơn hàng.
            </button>
            <button
                onClick={() => {
                    cancelOrder();
                }}
                className="bg-transparent hover:bg-red-500 text-red-700 font-semibold  py-2 px-4 border border-red-500 hover:border-transparent rounded"
            >
                Hủy đơn hàng
            </button>
        </>
    );
};
const ActionPrepare = ({orderId,setOrders,index,navigate}) => {
    const cancelOrder = () => {
        const userInput = prompt('Please enter your text:');
        api.post(`/order/cancelsingle/${orderId}/${userInput}`)
            .then((v) => v.data)
            .then((v) => {
                if (v.status == 200) {
                    alert(v.message);
                    setOrders(index)
                } else {
                    alert(v.message);
                }
            })
            .catch((Error) => {
                alert('Yêu cầu xử lý thất bại, vui lòng thử lại trong giây lác');
            });
    };
    return (
        <>
            <button onClick={()=>navigate(`/user/auth/orderdetail/${orderId}`)} className="bg-transparent hover:bg-green-500 text-green-700 font-semibold  py-2 px-4 border border-green-500 hover:border-transparent rounded">
            Xem chi tiết đơn hàng.
            </button>
            <button onClick={()=>{
                cancelOrder()
            }} className="bg-transparent hover:bg-red-500 text-red-700 font-semibold  py-2 px-4 border border-red-500 hover:border-transparent rounded"
            >
                Hủy đơn hàng
            </button>
        </>
    );
};

const ActionNormal = ({navigate,orderId}) => {
    return (
        <>
            <button onClick={() => navigate(`/user/auth/orderdetail/${orderId}`)} lassName="bg-transparent hover:bg-green-500 text-green-700 font-semibold  py-2 px-4 border border-green-500 hover:border-transparent rounded">
            Xem chi tiết đơn hàng.
            </button>
        </>
    );
};

const ActionFinish = ({ order, index, setFlags, navigate }) => {
    const confirmOrder = () => {
        alert(order.id)
        api.post(`/order/confirm/${order.id}`)
            .then((v) => v.data)
            .then((v) => {
                if (v.status == 200) {
                    alert(v.message);
                    order.daNhanHang = 1;
                    setFlags();
                } else {
                    alert(v.message);
                }
            })
            .catch((Error) => {
                alert('Yêu cầu xử lý thất bại, vui lòng thử lại trong giây lác');
            });
    };
    return (
        <>
            <button onClick={() => navigate(`/user/auth/orderdetail/${order.id}`)} className="bg-transparent hover:bg-green-500 text-green-700 font-semibold  py-2 px-4 border border-green-500 hover:border-transparent rounded">
            Xem chi tiết đơn hàng.
            </button>
            <span
                onClick={() => {
                    confirmOrder();
                }}
                className={`btn btn-btn-outline cursor-pointer ${order.daNhanHang === 1 ? 'disabled' : ''} `}
            >
                Đã nhận được hàng {order.daNhanHang === 1 ? <CgCheckO className="inline" /> : <></>}
            </span>
        </>
    );
};

const ActionCacel = ({ orderId, navigate }) => {
    const copyOrder = () => {
        api.post(`/order/copyorder/${orderId.id}`)
            .then((v) => v.data)
            .then((v) => {
                if (v.status === 200) {
                    navigate('/user/auth/cart');
                } else {
                    alert(v.message);
                }
            })
            .then((Error) => {
                // alert('Yêu cầu xử lý thất bại vui lòng thử lại sao...');
            });
    };
    return (
        <>
            <button onClick={()=>navigate(`/user/auth/orderdetail/${orderId.id}`)}  className="bg-transparent hover:bg-green-500 text-green-700 font-semibold  py-2 px-4 border border-green-500 hover:border-transparent rounded">
                Xem chi tiết đơn hàng.
            </button>
            <button
                onClick={() => {
                    copyOrder();
                }}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
                Đặt lại đơn
            </button>
        </>
    );
};
