import { useEffect, useRef, useState } from 'react';
import api from '../../../config/APISeller';
import gsap from 'gsap';
import OrderItemDefault from './OrderItemDefault';
import order from '../../../utils/images/seller/order.png';
import { Stack } from '@mui/joy';
import { Pagination, PaginationItem } from '@mui/material';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5';
const OrderDefaault = ({ trangThai }) => {
    const tableRef = useRef(null);
    const [filter, setFilter] = useState({
        key: '',
        sortBy: 1,
        page: 0,
        numPage: 1,
    });
    const [isCheckTab, setIsCheckTab] = useState(false);
    const [orders, setOrders] = useState([]);
    const [flag,setFlag]=useState(0)
    const getOrrder = () => {
        api.get(`/order/getAllOrderNormal?page=${filter.page}&key=${filter.key}&sortBy=${filter.sortBy}&trangThaiId=${trangThai}`)
            .then((v) => v.data)
            .then((v) => {
                filter.numPage=v.totalPages
                setOrders(v.content);
                console.log(v.content)
                gsap.fromTo(tableRef.current, { opacity: 0, y: 30 }, { opacity: 0.7, y: 0, duration: 0.5, ease: 'power3.out' });
            });
    };

    
    const removeOrder=(index)=>{
        orders.splice(index,1);
        setFlag(flag+1)
    }

    const changEcheckTab = () => {
        const updatedOrders = orders.map((v) => ({ ...v, isCheck: !isCheckTab }));
        setOrders(updatedOrders);
        setIsCheckTab(!isCheckTab);
    };


    const updateNextState = () => {
        const idList = orders.filter((v) => v.isCheck).map((item) => item.id);
        if (idList.length > 0) {
            if (window.confirm('Bạn chắc muốn câp nhật các đơn hàng này ?')) {
                api.post(`/order/nextorder?status=${trangThai}`, idList, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((v) => v.data)
                    .then((v) => {
                        if (v.status === 200) {
                            alert(v.message);
                            filter.page=0;
                            getOrrder()
                        } else {
                            alert(v.message);
                        }
                    })
                    .catch((error) => {
                        alert('Yêu cầu xử lý không thành công...');
                    });
            }
        } else {
            alert('Bạn chưa chọn đơn hàng nào để cập nhật');
        }
    };

    useEffect(() => {
        getOrrder();
    }, [filter]);

    return (
        <>
            <div>
                <br />
                <div className="flex" style={{ alignItems: 'center' }}>
                    <div className="w-12/12 mr-1 lg:w-5/12 p-1 ml-10  text-sm">
                        <div className="relative">
                            <input
                                value={filter.key}
                                onChange={(e) => {
                                    setFilter((prevFilter) => ({
                                        ...prevFilter,
                                        key: e.target.value,
                                    }));
                                }}
                                type="text"
                                className="block w-full rounded-md border-0 py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                placeholder="0.00"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                                <select
                                    onChange={(e) => {}}
                                    id="currency"
                                    className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                >
                                    <option value={1} style={{ fontWeight: 'bold' }}>
                                        Tên khách hàng
                                    </option>
                                    <option value={2} style={{ fontWeight: 'bold' }}>
                                        Mã Hóa đơn
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <select style={{ height: '38px' }} className="mr-1 rounded w-12/12 lg:w-5/12 border border-gray-200 text-sm">
                        <option>Sort theo ngày đặt đơn</option>
                        <option>Sort theo giá tiền</option>
                    </select>
                    <button
                        onClick={() => {
                            setFilter((prevFilter) => ({ ...prevFilter, page: 0 }));
                            getOrrder();
                        }}
                        className="bg-red-500 text-white p-2 text-sm rounded"
                    >
                        Áp dụng{' '}
                    </button>
                </div>
                <br />
                <div className="mb-2 pl-5 ml-11">
                <div className='flex justify-content-center'>
                <Stack spacing={2}>
                    <Pagination onChange={(event, value)=> setFilter(prevFilter => ({
                        ...prevFilter, // Giữ lại các thuộc tính cũ
                        page: value-1, // Chỉ thay đổi thuộc tính page
                    }))} count={filter.numPage} variant="outlined" color="primary" />
                </Stack>
                </div>
                    <br />
                    <input className="inline-block mr-3" onClick={changEcheckTab} type="checkbox" />{' '}
                    <span className="text-sm font-semibold"> Chọn tất cả</span>
                    <button
                        onClick={() => updateNextState()}
                        hidden={orders.filter((v) => v.isCheck).length < 1}
                        type="button"
                        class=" ml-5 inline-block rounded bg-info px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-info-3 transition duration-150 ease-in-out hover:bg-info-accent-300 hover:shadow-info-2 focus:bg-info-accent-300 focus:shadow-info-2 focus:outline-none focus:ring-0 active:bg-info-600 active:shadow-info-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    >
                        Xử lý tiếp đơn hàng
                    </button>
                </div>

                <table className="min-w-full text-center table-auto border-collapse">
                    <thead className="bg-gray-700 text-white">
                        <tr>
                            <th className="px-4 py-3 text-center text-xs font-semibold  uppercase tracking-wider">Mã đơn</th>
                            <th className="px-4 py-3  text-center text-xs font-semibold uppercase tracking-wider">Số điện thoại khách</th>
                            <th className="px-4 py-3  text-center text-xs font-semibold   uppercase tracking-wider">Khách hàng</th>
                            <th className="px-4 py-3  text-center text-xs font-semibold  uppercase tracking-wider">Ngày tạo</th>
                            <th className="px-4 py-3text-center text-xs font-semibold   uppercase tracking-wider">Tổng giá trị</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold  uppercase tracking-wider">Trạng thái</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold  uppercase tracking-wider">Xem sản phẩm</th>
                            <th className="px-4 py-3 text-center text-xs font-semibold  uppercase tracking-wider"></th>
                        </tr>
                    </thead>
                    <tbody ref={tableRef}>
                    {orders.map((v,index) => (
                        <OrderItemDefault trangThai={trangThai} index={index} removeOrder={removeOrder} order={v} />
                    ))}
                    
                    </tbody>
                </table>
                <div className={`${orders.length > 0 ? 'hidden' : 'block'} h-[300px] mt-5 `}>
                    <img style={{ width: '90px', margin: '0 auto' }} src={order} />
                    <p className="text-gray-400 text-center text-sm">Không có dữ liệu...</p>
                </div>
            </div>
        </>
    );
};

export default OrderDefaault;
