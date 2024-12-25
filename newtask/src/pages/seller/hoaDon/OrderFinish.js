import { useEffect, useRef, useState } from 'react';
import api from '../../../config/APISeller';
import gsap from 'gsap';
// import { useNavigate } from 'react-router-dom';
// import OrderItemDefault from './OrderItemDefault';
import order from '../../../utils/images/seller/order.png';
import OrderFinishItem from './OrderFinishItem';
import { Pagination, Stack } from '@mui/material';
const OrderFinish = ({ trangThai }) => {
    const tableRef = useRef(null);
    const [filter, setFilter] = useState({
        key: '',
        sortBy: 1,
        page: 0,
        numPage:0
    });
    // const navigate=useNavigate()
    // const [isCheckTab, setIsCheckTab] = useState(false);
    const [orders, setOrders] = useState([]);

    const getOrrder = () => {
        api.get(`/order/getAllOrderNormal?page=${filter.page}&key=${filter.key}&sortBy=${filter.sortBy}&trangThaiId=${trangThai}`)
            .then((v) => v.data)
            .then((v) => {
                filter.numPage=v.totalPages
                setOrders(v.content);
                gsap.fromTo(tableRef.current, { opacity: 0, y: 30 }, { opacity: 0.7, y: 0, duration: 0.6, ease: 'power3.out' });
            });
    };

    // const setOrderNew=(id)=>{
    //     orders.splice(id,1)
    //     setFlag(flage+1)
    // }

    const endOfPageRef = useRef(null);
    // const [flage, setFlag] = useState(0);

    // const changEcheckTab = () => {
    //     const updatedOrders = orders.map(v => ({ ...v, isCheck: !isCheckTab }));
    //     setOrders(updatedOrders);
    //     setIsCheckTab(!isCheckTab);
    // };

    // const addpage = () => {
    //     const newPage = filter.page + 1;
    //     api.get(`/order/getallchuanbihang?page=${newPage}&key=${filter.key}&sortBy=${filter.sortBy}`)
    //         .then(v => v.data)
    //         .then(v => {
    //             setOrders(prevOrders => [...prevOrders, ...v.content]);
    //             setFlag(flage + 1);
    //         });
    // };

    useEffect(() => {
        getOrrder();
    }, [filter]);

    return (
        <>
            <div>
                <br />
                <div className="flex" style={{ alignItems: 'center' }}>
                    <div className="w-12/12 mr-1 lg:w-5/12 p-1 ml-10 focus:outline-none text-sm">
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
                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
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
                <div className='flex justify-content-center'>
                <Stack spacing={2}>
                    <Pagination onChange={(event, value)=> setFilter(prevFilter => ({
                        ...prevFilter, // Giữ lại các thuộc tính cũ
                        page: value-1, // Chỉ thay đổi thuộc tính page
                    }))} count={filter.numPage} variant="outlined" color="primary" />
                </Stack>
                </div>
                <br />
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
                            <th className="px-4 py-3 text-center text-xs font-semibold  uppercase tracking-wider">Hành động</th>
                        </tr>
                    </thead>
                    <tbody ref={tableRef}>
                        {orders.map((v, index) => (
                            <OrderFinishItem order={v} />
                        ))}
                    </tbody>
                </table>
                <br />
                <div className={`${orders.length > 0 ? 'hidden' : 'block'} h-[300px] mt-5 `}>
                    <img style={{ width: '90px', margin: '0 auto' }} src={order} />
                    <p className="text-gray-400 text-center text-sm">Không có dữ liệu...</p>
                </div>

                <a ref={endOfPageRef} style={{ backgroundColor: '#007bff', color: 'white' }}></a>
            </div>
        </>
    );
};

export default OrderFinish;
