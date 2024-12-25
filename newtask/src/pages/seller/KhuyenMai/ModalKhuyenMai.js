import React, { useEffect, useState } from 'react';
import api from '../../../config/APISeller';
// import { useParams } from 'react-router-dom';
import { Pagination, PaginationItem, Stack } from '@mui/material';
import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5';

const KhuyenMaiModal = ({map,setFlag,flag,khuyenMai}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productList,setProductList]=useState([])
    const [filter,setFilter]=useState({
        page:0,
        numPage:0
    })
    const openModal = () => {
        setIsModalOpen(true);
        getKhuyenMai()
        setTimeout(() => {
            document.getElementById('myModal').classList.remove('opacity-0');
            document.getElementById('modalPanel').classList.remove('scale-95');
        }, 10);
    };

    const getKhuyenMai=()=>{
        api.post(`/khuyenmai/getproductnotinptomotion?page=${filter.page}`,{
            "startDate":khuyenMai.ngayBatDau,
            "endDate":khuyenMai.ngayKetThuc
        },{
            headers: {
                'Content-Type': 'application/json',
            } 
        }).then(v=>{
                return v
        }).then(v=>{
            let data=v.data.data.content;

            data.forEach(v => {
              v.totalProduct= v.productDetails.reduce((tong, item) => tong + item.soLuong, 0);
              v.isCheck=false;
            });
            const maps = new Map(data.map(item => [item.productId, item]));
            filter.numPage=v.data.data.totalPages
            setProductList(maps)
        })
    }

    useEffect(()=>{
        getKhuyenMai()
    },[])

    const handleOnclick=(key)=>{
        key.isCheck=!key.isCheck;
    }

    const closeModal = () => {
        document.getElementById('myModal').classList.add('opacity-0');
        document.getElementById('modalPanel').classList.add('scale-95');
        setTimeout(() => {
            setIsModalOpen(false);
        }, 300);
        productList.forEach((k,v)=>{
            if(k.isCheck===true){
                map.set(v,k)
            }
        })
        setFlag(flag+1)
    };

    return (
        <div className='text-xs'>
            <button style={{border:"1px solid blue"}}
                onClick={openModal}
                class="flex items-center   text-blue-500 px-4 py-2 mt-2 md:mt-0 rounded-sm hover:bg-red-1000"
            >
                <span class="mr-2 text-lg">+</span> Thêm sản phẩm
            </button>
            {/* Modal */}
            {isModalOpen && (
                <div id="myModal" className="relative z-10 opacity-0 transition-opacity duration-300 ease-out">
                    {/* Background backdrop */}
                    <div
                        id="modalOverlay"
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        aria-hidden="true"
                        onClick={closeModal}
                    ></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex items-end justify-center text-center sm:items-center sm:p-0">
                            <div
                                id="modalPanel"
                                className="relative transform scale-95 transition-transform duration-300 ease-out overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-4xl"
                            >
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4" id="modal-title">
                                        Danh sách sản phẩm
                                    </h3>

                                    {/* Search Bar */}
                                    <div className="relative mb-4">
                                        <input
                                            type="text"
                                            placeholder="Tên hoặc mã sản phẩm"
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
                                        />
                                        <Stack spacing={2}> 
                                        <Pagination
                                            onChange={(event,value)=>{
                                                filter.page=value-1
                                                getKhuyenMai()
                                            }}
                                            count={filter.numPage}
                                            renderItem={(item) => (
                                            <PaginationItem
                                                slots={{ previous: IoArrowBackCircleOutline, next: IoArrowForwardCircleOutline }}
                                                {...item}
                                            />
                                            )}
                                        />
                                    </Stack>
                                        {/* {numPage} */}
                                    </div>

                                    {/* Category Selection with Horizontal Scroll */}
                                    <div style={{height:"400px",overflow:"auto"}}>
                                    <table class="min-w-full border border-gray-300">
                                        <thead class="bg-gray-100">
                                            <tr>
                                                <th class="px-4 py-2 border-b text-left">
                                                    <input type="checkbox" class="form-checkbox" />
                                                </th>
                                                <th class="px-4 py-2 border-b text-left">Sản Phẩm</th>
                                                <th class="px-4 py-2 border-b text-right">Tổng kho hàng</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {  
                                            Array.from(productList.entries()).map(([key, value]) => 
                                                <>
                                                    <tr class="bg-white py-2">
                                                <td class="px-4 py-2 border-b text-left">
                                                    <input type="checkbox"  onClick={()=>handleOnclick(value)} class="form-checkbox" />
                                                </td>
                                                <td class="px-4 py-2 border-b text-left">
                                                    <div class="flex items-center">
                                                        <img
                                                            src={value.productImage}
                                                            alt="Product Image"
                                                            class="w-10 h-10 rounded"
                                                        />
                                                        <div class="ml-2">
                                                            <div class="text-sm font-semibold">{value.productName}</div>
                                                            <div class="text-xs text-gray-500">Mã: {value.productId}</div>
                                                        </div>
                                                        </div>
                                                        </td>
                                                        <td class="px-4 py-2 border-b text-right">{value.totalProduct}</td>
                                                    </tr>
                                                </>
                                            )
                                            }
                                        </tbody>
                                    </table>
                                    </div>
                                    
                                </div>

                                <div className="flex mt-2 ml-2 mr-2" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                    <p>
                                        Đã chọn: <strong>2 sản phẩm</strong>
                                    </p>
                                    <div
                                        className="flex  px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
                                        style={{ alignItems:"center",justifyContent:"center" }}
                                    >
                                        <button onClick={closeModal}
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        >
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KhuyenMaiModal;
