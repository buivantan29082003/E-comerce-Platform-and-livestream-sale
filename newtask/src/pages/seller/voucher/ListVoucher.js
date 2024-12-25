// import { useEffect, useRef } from 'react';
import TabVoucher from './tabVoucher';
import api from '../../../config/APISeller'; // Import Axios instance
import { Link, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Pagination,  Select, Stack, Switch } from '@mui/material';
import { CiFilter } from 'react-icons/ci';
import {  BiSortDown } from 'react-icons/bi';
import formatToVND from '../../client/FormatVnd';
import { AppContext } from '../../../App';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import bgvoucher from "../../../utils/images/seller/Bg-voucher.jpg"
const ListVoucher = () => {
    const {setFloadingPage } = useContext(AppContext);
    let { type } = useParams();
    const [typeFetch, setTypeFetch] = useState(type);
    const [size, setSize] = useState(5);
    const [vouchers, setVouchers] = useState([]);
    const [filter,setFilter]=useState({
        typeSort:0,
        typeFilter:[],
        numPage:0,
        page:0,
        key:""
    })
    const [flag,setFlag]=useState(0)
    
    useEffect(() => {
        getVoucherList();
    }, [typeFetch]);

    const getVoucherList = () => {
        api.post(`/voucher/getvoucher?page=${filter.page}&size=${size}&type=${typeFetch}&key=${filter.key}&typeSort=${filter.typeSort}`,filter.typeFilter,{
            headers:{
                "Content-Type":"application/json"
            }
        }).then((v) => v.data)
            .then((v) => {
                filter.numPage=v.data.totalPages
                setVouchers(v.data.content);
            })
            .catch((error) => {
                alert(error)
                alert('Có lỗi fetch voucher !!!');
            });
    };

    const updateStateVoucher =(id,trangThai,index)=>{
        toast.promise(api.post(`/voucher/updatestate?id=${id}&trangThai=${trangThai}`).then(v=>v.data).then(v=>{
            if(v.status===200){
                vouchers[index].trangThai=trangThai;
                setFlag(flag+1)
            }else{
                throw new Error(v.message)
            }
        }),{
            loading:"Đang cập nhật trạng thái voucher...",
            success:"Cập nhật thành công trạng thái voucher",
            error:error=>error.message
        })
    }

    useEffect(setFloadingPage,[])

    return (
        <div>
            <div className="shadow-lg mt-2 container mx-auto p-4 relative bg-white rounded-[7px]">
                <p className="font-semibold">
                    
                </p>
                {/* <VoucherReport/> */}
                <section className="create-voucher-now py-8 ">
        <div className="container mx-auto bg-white grid grid-cols-12 gap-4 p-6">
          {/* Left Content Column */}
          <div className="col-span-12 md:col-span-4">
            <h1 className="text-xl font-semibold">
              Tạo ngay Voucher để tăng đơn hàng cho Shop của bạn!
            </h1>
            <p className="mt-2 text-gray-700">
              Cơ hội tăng đến <span className="font-bold">43%</span> đơn hàng và
              <span className="font-bold">28%</span> doanh thu khi tạo Voucher
              ưu đãi cho Khách hàng.
            </p>
            <Link to={"/seller/newvoucher"}
              className="mt-4 inline-block bg-violet-400 text-white  py-2 px-6 rounded-md"
            >
              Tạo Voucher ngay!
            </Link>
          </div>
          {/* Right Image Column */}
          <div className="col-span-12 md:col-span-8">
            <img
              src={bgvoucher}
              alt="Voucher Image"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>
                {/* danh sách mã giảm giá  */}
                <div className="flex justify-content-between">
                    <p className="font-semibold">Danh sách mã giảm giá </p>
                    {/* <button class="flex items-center border border-red-500 text-red-500 px-4 py-2 mt-2 md:mt-0 rounded-md hover:bg-red-100">
                        + Thêm voucher
                    </button> */}
                </div>

                <TabVoucher setTypeFetch={setTypeFetch} />
                <br />
                <input
                    // value={key}
                    onChange={(e) =>{
                        filter.key=e.target.value
                    }}
                    type="text"
                    placeholder="Tên voucher, mã voucher"
                    class="w-4/12 mr-2 p-2 d-inline-block lg:w-5/12 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                />
                <div class="inline-flex items-center border border-gray-200 rounded-md focus-within:ring-1 focus-within:ring-blue-400">
                    <BiSortDown class=" text-gray-500" />
                    <select onChange={(e)=>{
                        filter.typeSort=e.target.value
                        getVoucherList()
                    }} class="w-full mr-2 p-2 border-0 focus:outline-none focus:ring-0 text-sm">
                        <option value={0}>Mới nhất</option>
                        <option value={1}>Theo số lược dùng</option>
                        <option value={2}>Theo số lược dùng mỗi người</option>
                        <option value={3}>Theo tên</option>
                    </select>
                </div>
                <div class="inline-flex ml-2 items-center border border-gray-200 rounded-md focus-within:ring-1 focus-within:ring-blue-400">
                    <CiFilter class=" text-gray-500" />
                    <select onChange={(e)=>{
                        switch (e.target.value) {
                            case "0":
                                filter.typeFilter=[]
                                break;
                            case "1":
                                filter.typeFilter=[1]
                                break;
                            case "2":
                                filter.typeFilter=[0]
                        }
                        getVoucherList()
                    }} class="w-full mr-2 p-2 border-0 focus:outline-none focus:ring-0 text-sm">
                        <option value={0}>All</option>
                        <option value={1}>Theo tiền</option>
                        <option value={2}>Theo phần trăm</option>
                    </select>
                </div>
                <button style={{border:"1px solid blue"}}
                    onClick={() => getVoucherList()}
                    class="flex mb-2 ml-2 d-inline-block  text-blue-600 items-center   p-2 mt-2 md:mt-0 rounded-md"
                >
                    Tìm kiếm
                </button>
                <div className='mb-1 mt-1'></div>
                {/* <Stack spacing={2}>
                    <Pagination
                        onChange={(event, value) => {
                            filter.page=value-1
                            getVoucherList()
                        }}
                        count={filter.numPage}
                        renderItem={(item) => (
                            <PaginationItem slots={{ previous: IoArrowBackCircleOutline, next: IoArrowForwardCircleOutline }} {...item} />
                        )}
                    />
                </Stack> */}
                <div className='flex align-items-center'>
                
                <FormControl className='mr-3' sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Size</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label small"
                        id="demo-simple-select-helper small"
                        value={size}
                        label="Age"
                        size='small'
                        onChange={(event) => setSize(event.target.value)}
                    >
                        <MenuItem value={5}>5 </MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                    </Select>
                </FormControl>
                <Stack spacing={2}>
                    <Pagination onChange={(event, value)=> {
                        filter.page=value-1;
                        getVoucherList()
                    }} count={filter.numPage} variant="outlined" color="primary" />
                </Stack>
                </div>
                <div class="mt-2 relative  shadow-md sm:rounded-lg overflow-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-auto">
                        <thead class="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Tên mã giảm giá
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Loại giảm giá
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Giảm giá
                                </th>
                                {/* <th scope="col" class="px-6 py-3">
                                    Giá trị giảm
                                </th> */}
                                <th scope="col" class="px-6 py-3">
                                    Số lượt tối đa
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Số lược đã dùng
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Lượt dùng mỗi người
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Thời gian áp dụng
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Trạng Thái
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-black">
                            {vouchers.map((v,index) => {
                                return (
                                    <>
                                        <tr class=" text-sm bg-white border-b dark:bg-gray-200 dark:border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-4 py-4">
                                                <Link style={{textDecoration:"none"}} to={"/seller/updatevoucher/"+v.id}><div className="flex items-center justify-content-lg-between">
                                                   
                                                   <div className='ml-2'>
                                                       <div className="font-semibold text-blue-800">
                                                            <Link to={`/seller/voucherinfo/${v.id}`}>{v.voucherName}</Link>
                                                        </div>
                                                       <div className="text-xs text-gray-500">Mã voucher: {v.maVoucher}</div>
                                                   </div>
                                               </div></Link>
                                            </td>
                                            <td class="px-6 py-4 ">
                                                <span className='text-green-600 inline-flex items-center justify-center bg-green-100 px-2 py-1 rounded-full text-xs font-medium shadow-sm'>
                                                Theo {v.loaiVoucher == 1 ? '%' : 'Giá tiền'}
                                                </span>
                                                </td>
                                            <td class="px-6 py-4">Giảm {v.giaTriGiam}
                                            {v.loaiVoucher == 1 ? '%' : 'VND'} cho {v.soLuongSanPhamApDung} sản phẩm</td>
                                            {/* <td class="px-6 py-4">
                                                {v.giaTriGiam}
                                                {v.loaiVoucher == 1 ? '%' : 'VND'}
                                            </td> */}
                                            <td class="px-6 py-4 ">{v.tongLuocDung}</td>
                                            <td class="px-6 py-4 ">
                                                <span className='text-red-600 inline-flex items-center justify-center bg-red-100 px-2 py-1 rounded-full text-xs font-medium shadow-sm'>
                                                Đã dùng {v.soLuocDaDung}
                                                </span>
                                                </td>
                                            <td class="px-6 py-4">{v.soLuocDungMoiNguoi}</td>
                                            <td className="px-6 py-4">
                                            {format(new Date(v.ngayBatDau), 'HH:mm dd/MM/yyyy')} -
                                            {format(new Date(v.ngayKetThuc), 'HH:mm dd/MM/yyyy')}
                                            </td>
                                            <td onClick={()=>updateStateVoucher(v.id,v.trangThai===1?0:1,index)} class="px-6 py-4">
                                                <Switch checked={v.trangThai!==0}  />
                                            </td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </table>
                    
                </div>

                <div className=" border-gray-200 relative"></div>
            </div>
        </div>
    );
};
export default ListVoucher;

// const VoucherReport=React.memo(()=>{

//     const [report, setReport] = useState({
//         sumary: 0,
//         countOrder: 0,
//         perUsed: 0,
//         accountCount: 0,
//     });
//     const fetchReport=(e)=>{
//         api.get(`/voucher/getreport?countday=${e}`)
//             .then((v) => v.data)
//             .then((v) => {
//                 setReport({
//                     sumary: v[0],
//                     countOrder: v[1],
//                     perUsed: v[2],
//                     accountCount: v[3],
//                 });
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     }

//     useEffect(() => {
//         fetchReport(7)
//     }, []);
//     return <>
//         Hiệu quả ({' '}
//                     <small className="test-xs">
//                         <select style={{ border: '0px solid red' }} onChange={(e) => fetchReport(e.target.value)}>
//                             <option value="7">7 ngày trước</option>
//                             <option value="30">30 ngày trước</option>
//                             <option value="60">2 tháng trước</option>
//                             <option value="18,262">tất cả</option>
//                         </select>{' '}
//                     </small>
//                     )
//         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 text-xs">
//                     <div class="border-r border-gray-300 p-4 rounded-lg shadow-sm">
//                         <h2 class="text-sm font-semibold">Số tiền đa giảm</h2>
//                         <p class="text-3xl font-bold">₫ {formatToVND(report.sumary)}</p>
//                         <p class="text-gray-500 ">
//                             so với 7 ngày trước <span class="font-semibold">0.00%</span>
//                         </p>
//                     </div>

//                     <div class="border-r border-gray-300 p-4 rounded-lg shadow-sm">
//                         <h2 class="text-sm  font-semibold">Đơn Hàng</h2>
//                         <p class="text-3xl font-bold">{report.countOrder}</p>
//                         <p class="text-gray-500">
//                             so với 7 ngày trước <span class="font-semibold">0.00%</span>
//                         </p>
//                     </div>

//                     <div class="border-r border-gray-300 p-4 rounded-lg shadow-sm">
//                         <h2 class="text-sm  font-semibold">Tỉ Lệ Sử Dụng</h2>
//                         <p class="text-3xl font-bold">{report.perUsed}%</p>
//                         <p class="text-gray-500">
//                             so với 7 ngày trước <span class="font-semibold">0.00%</span>
//                         </p>
//                     </div>

//                     <div class="border-r border-gray-300 p-4 rounded-lg shadow-sm">
//                         <h2 class="text-sm  font-semibold">Người Mua</h2>
//                         <p class="text-3xl font-bold">{report.accountCount}</p>
//                         <p class="text-gray-500">
//                             so với 7 ngày trước <span class="font-semibold">0.00%</span>
//                         </p>
//                     </div>
//                 </div>
//     </>
// })