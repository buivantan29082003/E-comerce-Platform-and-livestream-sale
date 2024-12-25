
// import { useEffect, useRef } from 'react';
import api from '../../../config/APISeller'; // Import Axios instance
import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Pagination, PaginationItem, Select, Stack } from '@mui/material';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
const ListLive = () => {
    const [vouchers, setVouchers] = useState([]);
    // const [key, setkey] = useState('');
    const navigate=useNavigate()
    const [filter,setFilter]=useState({
        typeSort:0,
        typeFilter:[],
        numPage:0,
        page:0,
        key:""
    })


    const getLive=()=>{
        api.get("/live/getall").then(v=>v.data).then(v=>{
            filter.page=v.data.totalPages;
            setVouchers(v.data.content)

        }).catch(error=>{
            alert("Có lỗi fetch dữ liệu")
        })
    }

    useEffect(()=>{
        getLive()
    },[])


    return (
        <div>
            <div className="container mx-auto p-4 relative bg-white rounded-[7px]">
                <p className=" font-semibold">Kênh người bán > Live > Danh sách live</p>
                <div className=" border-gray-200 relative"></div>
            </div>
            <div className="shadow-lg mt-2 container mx-auto p-4 relative bg-white rounded-[7px]">
                <Stack spacing={2}>
                    <Pagination
                        onChange={(event, value) => {
                            filter.page=value-1
                        }}
                        count={filter.numPage}
                        renderItem={(item) => (
                            <PaginationItem slots={{ previous: IoArrowBackCircleOutline, next: IoArrowForwardCircleOutline }} {...item} />
                        )}
                    />
                </Stack>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Size</InputLabel>
                    <Select
                        style={{ height: '50px' }}
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Age"
                    >
                        <MenuItem value={5}>5 </MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                        <MenuItem value={30}>30</MenuItem>
                    </Select>
                </FormControl>
                <div class="mt-2 relative  shadow-md sm:rounded-lg overflow-auto">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-auto">
                        <thead class="text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    LiveId
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Lược like
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Giỏ hàng được đặt
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Trạng thái
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-black">
                            {vouchers.map((v) => {
                                return (
                                    <>
                                        <tr class="font-medium text-sm bg-white border-b dark:bg-gray-200 dark:border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-4 py-4">
                                                <div className="flex items-center ">
                                                    <img src={"data:image/jpeg;base64,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"}
                                                        style={{ width: '50px' }}
                                                    />
                                                    <div className='ml-2'>
                                                        <div className="font-semibold text-gray-800">{v.tieuDe}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4">{v.countLike}</td>
                                            <td class="px-6 py-4">{v.cartCount}</td>
                                            <td class="px-6 py-4">{v.startTime==null?"Chưa diễn ra":v.endTime==null?"Đang diễn ra":"Đã kết thúc"}</td>
                                            <td class="px-6 py-4">
                                                <button className='bg-red p-3' onClick={()=>{
                                                    navigate("/seller/live/start/"+v.id)
                                                }} disabled={!v.startTime===null}>Bắt đầu</button>
                                                <p>Xem thống kê</p>
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
export default ListLive;
