import { useContext, useEffect, useRef, useState } from "react";
import TabVoucher from "../voucher/tabVoucher";
// import { Pagination, Stack } from "react-bootstrap";
// import { PaginationItem } from "@mui/material";
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from "react-icons/io5";
import { Pagination, PaginationItem, Stack, Switch } from "@mui/material";
import { Link } from "react-router-dom";
import { BiSortDown } from "react-icons/bi";
import toast from "react-hot-toast";
import api from "../../../config/APISeller";
import { AppContext } from "../../../App";

const CUKhuyenMai = () => {
    const [khuyenMai,setKhuyenMai]=useState([])
    const [typeFetch,setTypeFetch]=useState(0);
    const [numPage,setNumPage]=useState(3)
    const [page,setPage]=useState(0)
    const [size,setSize]=useState(5)
    const componentRef = useRef(null);
    const [key,setkey]=useState('')
    const [flag,setFlag]=useState(0)
    const {setFloadingPage } = useContext(AppContext);
    const [filter,setFilter]=useState({
        typeSort:0,
        startDate:null,
        endDate:null
    })

    useEffect(()=>{
        setFloadingPage()
    },[])

    const changeStateKhuyenMai=(id,state,index)=>{
        toast.promise(api.post(`/khuyenmai/updatestate/${id}/${state}`).then(v=>v.data).then(v=>{
            if(v.status===200){
                khuyenMai[index].trangThai=state
                // alert(khuyenMai[index].trangThai)
                setFlag(flag+1)
            }else{
                throw new Error(v.message)
            }
        }),{
            loading:"Đang xử lý yêu cầu...",
            success:"Cập nhật thành công trạng thái",
            error:error=>error.message
        })
    }

    useEffect(()=>{
        fetchData()
    },[typeFetch])
    

    const fetchData=()=>{
        api.get(`/khuyenmai/getall?typeSort=${filter.typeSort}&page=${page}&size=${size}&type=${typeFetch}&key=${key}
            ${filter.startDate!=null&&filter.endDate!=null?`&startDate=${filter.startDate.toISOString()}&endDate=${filter.endDate.toISOString()}`:``}`).then(v=>v.data).then(v=>{
            setKhuyenMai(v.data.content)
            setNumPage(v.data.totalPages)
        }).catch(error=>{
            alert(error)
        })
    }

    return (
        <div ref={componentRef}>
            <div style={{ borderRadius: '7px' }} className="container mx-auto p-4 relative bg-white">
                <p className="text-black-800 font-semibold">Kênh người bán > Quản lý khuyến mãi > Thêm khuyến mãi</p>
                <div className=" border-gray-200 relative"></div>
            </div>
            

            <div style={{ borderRadius: '7px' }} className="mt-2 container mx-auto p-4 relative bg-white">
                <input
                    value={key}
                    
                    onChange={(e)=>setkey(e.target.value)}
                    type="text"
                    placeholder="Tên chương trình - tên sản phẩm"
                    class="mr-2 w-10/12 mb-2 lg:w-5/12 p-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                />
                <div class="inline-flex items-center border border-gray-200 rounded-sm focus-within:ring-1 focus-within:ring-blue-400">
                    <BiSortDown class=" text-gray-500" />
                    <select onChange={(e)=>{
                        filter.typeSort=e.target.value
                        fetchData()
                    }} class="w-full mr-2 p-2 border-0 focus:outline-none focus:ring-0 text-sm">
                        <option value={0}>Mới nhất</option>
                        <option value={1}>Theo giá trị giảm</option>
                        <option value={2}>Nó bị gì vậy bận</option>
                    </select>
                </div>
                <br></br>
                <input
                    onChange={(e)=>{
                        filter.startDate=new Date(e.target.value)
                    }}
                    type="date"
                    placeholder="Tìm Tên sản phẩm, SKU sản phẩm, SKU phân loại, Mã sản phẩm"
                    class="mr-2 w-5/12 lg:w-3/12 p-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                /> 
                <input
                    onChange={(e)=>{
                        filter.endDate=new Date(e.target.value)
                        
                    }}
                    type="date"
                    placeholder="Tìm Tên sản phẩm, SKU sản phẩm, SKU phân loại, Mã sản phẩm"
                    class="w-5/12 lg:w-3/12 p-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                />
                <span onClick={()=>{
                    fetchData()
                }} href="#_" style={{border:"1px solid violet"}} class="mt-2 relative inline-flex items-center justify-start px-3 py-2 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
                    <span class="w-48 h-48 rounded rotate-[-40deg] bg-purple-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
                    <span  class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">Tìm kiếm</span>
                </span>
                <br />
                <TabVoucher setTypeFetch={setTypeFetch}/>
                <br />
                <Stack spacing={2}> 
                    <Pagination
                        onChange={(event,value)=>setPage(value-1)}
                        count={numPage}
                        renderItem={(item) => (
                        <PaginationItem
                            slots={{ previous: IoArrowBackCircleOutline, next: IoArrowForwardCircleOutline }}
                            {...item}
                        />
                        )}
                    />
                </Stack>
                <div class="mt-2   shadow-md " style={{overflow:"auto"}}>
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" >
                        <thead class="text-md font-semibold text-gray-700  bg-gray-800 dark:bg-gray-800 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Mã
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Tên khuyến mãi
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Ngày bắt đầu
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Ngày kết thúc
                                </th>
                                <th scope="col" class="px-6 py-3">
                                   Thông tin giảm
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Trạng thái
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-black'>

                        {khuyenMai.map((v,index) => (
                                <tr class="bg-white border-b dark:bg-gray-200 dark:border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td class="px-6 py-4 text-blue-700">
                                    {v.id}
                                </td>
                                    <td className="px-4  cursor-pointer py-4 text-blue-700">
                                        <Link style={{textDecoration:"none"}} to={"/seller/updatekhuyenmai/"+v.id}> {v.tenKhuyenMai}</Link>
                                    </td>
                                <td class="px-6 py-4">
                                {new Date(v.ngayBatDau).toLocaleDateString("vi-VN", {
                                                    day: "2-digit", month: "2-digit", year: "numeric",
                                                })} {new Date(v.ngayBatDau).toLocaleTimeString("vi-VN")}
                                </td>
                                <td class="px-6 py-4">
                                    {new Date(v.ngayKetThuc).toLocaleDateString("vi-VN", {
                                                        day: "2-digit", month: "2-digit", year: "numeric",
                                                    })}{new Date(v.ngayKetThuc).toLocaleTimeString("vi-VN")}    
                                </td>
                                <td class="px-6 py-4">Giảm {v.giaTriGiam}% cho <strong>{v.images.length} </strong> sản phẩm</td>
                                <td class="px-6 py-4">
                                <Switch checked={v.trangThai!==0} onChange={()=>changeStateKhuyenMai(v.id,v.trangThai===1?0:1,index)}  />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default CUKhuyenMai;
