import { useEffect, useRef, useState } from "react";
import VoucherModal from "./ModalVoucher";
import gsap from "gsap";
import { Button, Checkbox } from "@mui/material";
import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { TbRestore } from "react-icons/tb";
import toast from "react-hot-toast";
import api from "../../../config/APISeller";

const VoucherUpdate = () => {
    const {type}=useParams()
    const componentRef = useRef(null);
    const  [objectRespone,setObjectRespone]=useState({
        "productDeleteVoucher":[]
    })
    const [flag,setFlag]=useState(1)
    const [size,setSize]=useState(0);
    const [voucher,setVoucher]=useState({voucher:{
        loaiVoucher:1,giaTriGiam:2
        },voucherProducts:new Map()
    })
    // const [isApply,setIsApply]=useState(false)
    const [listProduct,setListProduct]=useState(new Map())
    const deleteVoucherInsert=(obj)=>{
        if(obj.isCheck===false){
            objectRespone.productDeleteVoucher.push(obj.productId)
            obj.isDelete=true
        }else{
            listProduct.delete(obj.productId)
        }
        setFlag(flag+1)
    }

    const removeDeleteVoucherInsert=(obj)=>{
        objectRespone.productDeleteVoucher=objectRespone.productDeleteVoucher.filter(v=>v!==obj.productId)
        obj.isDelete=false
        setFlag(flag+1)
    }

    useEffect(()=>{
        if(type!=null){
            api.get(`/voucher/getvoucherbyid?id=${type}`).then(v=>v.data).then(v=>{
                voucher.voucher=v.data.voucher
                const newProductMap = new Map(v.data.voucherDetail.map(item => [item.productId, item]));
                setSize(newProductMap.size)
                setListProduct(newProductMap); 
                newProductMap.forEach((value, key) => {
                    value.isCheck = false;
                });
             })
        }        
    },[])

    const handleSubmit=()=>{
            let a= Array.from(listProduct.keys()).map(key => parseInt(key, 10));
            objectRespone.voucherShop=voucher.voucher;
            objectRespone.productInsertVoucher=a.splice(size)
            objectRespone.id=voucher.voucher.id
            updateVoucher()
    }
    const navigate = useNavigate()

    async function updateVoucher() {
              toast.promise(
                api.post('/voucher/updatevoucher',objectRespone, {
                    headers: {
                      'Content-Type': 'application/json'
                    }}).then(v=>v.data).then(v=>{
                    if(v.status!==200){
                        throw new Error(v.message)
                    }else{
                        navigate("/seller/voucher/0")
                    }
                  }),
                {
                    
                  loading: "Updating voucher.....", 
                  success: 'Update voucher successfully.', 
                  error: (error) => error.message,
                }
              );
    }
      

    useEffect(() => {
        gsap.fromTo(
          componentRef.current,
            { x: -100, opacity: 0 }, 
            { x: 0, opacity: 1, duration: 0.3 } 
        );
    }, []);
    return (
        <>
            <div ref={componentRef} className="mb-3">
                
                <div style={{ borderRadius: '7px' }} className="shadow-md mt-3 container mx-auto p-4 relative bg-white">
                    <p className="font-bold text-md text-blue-700">Thông tin cơ bản</p>

                    <div className=" border-gray-200 relative"></div>
                    <div class="container mx-auto mt-3">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 text-md text-medium  lg:text-right sm:text-left">Tên voucher</div>

                            <div class="col-span-12 lg:col-span-10  ">
                                <input
                                    value={voucher.voucher.tenVoucher}
                                    onChange={(e)=>{
                                        voucher.voucher.tenVoucher=e.target.value
                                        setFlag(flag+1)
                                    }}
                                    type="text"
                                    placeholder="Tên voucher hiển thị với người dùng"
                                    class="w-11/12 lg:w-10/12 p-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                />
                                <p className=" hidden lg:block text-xs mt-2 text-warning"></p>
                            </div>
                        </div>
                    </div>
                    {/* mã voucher */}
                    <div class="container mx-auto mt-3">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 text-md text-medium lg:text-right sm:text-left">Mã voucher</div>

                            <div class="col-span-12 lg:col-span-10  ">
                                <input 
                                    disabled
                                    value={voucher.voucher.maVoucher}
                                    maxLength="5"
                                    type="text"
                                    placeholder="Mã voucher áp dụng đối với hóa đơn"
                                    class="w-11/12 lg:w-10/12 p-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                />
                                <p className="hidden lg:block text-xs mt-2 text-warning"></p>
                            </div>
                        </div>
                    </div>
                    {/* thời gian sử dụng voucher */}
                    <div class="container mx-auto mt-3">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 text-md text-medium  lg:text-right sm:text-left">Thời gian sử dụng mã </div>

                            <div class="col-span-12 lg:col-span-10">
                                
                                <input
                                disabled
                                value={voucher.voucher.ngayBatDau}
                                    type="datetime-local"
                                    placeholder="Tìm Tên sản phẩm, SKU sản phẩm, SKU phân loại, Mã sản phẩm"
                                    class="w-5/12 lg:w-5/12 p-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                />
                                <input
                                    onChange={(e)=>{
                                        voucher.voucher.ngayKetThuc= new Date(e.target.value);
                                    }}
                                    type="datetime-local"
                                    placeholder="Tìm Tên sản phẩm, SKU sản phẩm, SKU phân loại, Mã sản phẩm"
                                    class="ml-2 w-5/12 lg:w-5/12 p-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                />
                                <p class="hidden lg:block text-xs mt-2 text-warning"></p>
                            </div>
                        </div>
                    </div>

                    {/* mô tả  */}
                    <div class="container mx-auto mt-3">
                            <div class="grid grid-cols-12 gap-4">
                                <div class="col-span-12 lg:col-span-2 text-md text-medium  lg:text-right sm:text-left">Mô tả chi tiết</div>

                                <div class="col-span-12 lg:col-span-10  ">
                                    <textarea rows={7}
                                    value={voucher.voucher.moTa}
                                    onChange={(e)=>{
                                        voucher.voucher.moTa=e.target.value
                                        setFlag(flag+1)
                                        // alert(ỏ)
                                    }}
                                        // type="text"
                                        placeholder="Để áp dụng voucher này.."
                                        class="w-11/12 lg:w-10/12 p-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                        />
                                    <p className="hidden lg:block text-xs mt-2 text-danger"></p>
                                    <p className="hidden lg:block text-xs mt-2 text-warning"></p>
                                </div>
                            </div>
                        </div>
                </div>

                {/* thông tin 2 */}
                <div style={{ borderRadius: '7px' }} className="shadow-md mt-3 container mx-auto p-4 relative bg-white">
                    <p className="font-semibold">Thiết lập giảm giá</p>

                    {/* form */}
                    {/* Tên chương trình */}
                    <div className=" border-gray-200 relative"></div>
                    <div class="container mx-auto mt-3">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 text-sm  lg:text-right sm:text-left">Giảm theo phần trăm</div>

                            <div class="col-span-12 lg:col-span-10  ">
                                <Checkbox {..."hhhs"} onChange={()=>{
                                voucher. voucher.loaiVoucher= voucher.voucher.loaiVoucher===1?0:1
                                setFlag(flag+1)
                                }} defaultChecked size="small" />
                            </div>
                        </div>
                    </div>
                    <div class="container mx-auto mt-3">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 text-md text-medium  lg:text-right sm:text-left">giá trị giảm</div>

                            <div class="col-span-12 lg:col-span-10  ">
                                <input
                                // disabled={isApply}
                                    value={voucher.voucher.giaTriGiam}
                                    onChange={(e)=>{
                                        voucher.voucher.giaTriGiam= e.target.value;
                                        // alert(vouch)
                                        setFlag(flag+1)
                                    }}
                                    type="number"
                                    placeholder="Tìm Tên sản phẩm, SKU sản phẩm, SKU phân loại, Mã sản phẩm"
                                    class="w-11/12 lg:w-10/12 p-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                />
                                {/* {voucher.voucher.loaiVoucher} */}
                                <p className=" hidden lg:block text-xs mt-2 text-red-600">{voucher.voucher.loaiVoucher==0&&voucher.voucher.giaTriGiam<1000?"Giá vui lòng lớn hơn 1000":""}</p>
                                <p className=" hidden lg:block text-xs mt-2 text-red-600">{voucher.voucher.loaiVoucher==1&&(voucher.voucher.giaTriGiam<1||voucher.voucher.giaTriGiam>99)?"Vui lòng nhập trong khoản 1-99":""}</p>
                            </div>
                        </div>
                    </div>
                    {/* mã voucher */}
                    <div class="container mx-auto mt-3">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 text-md text-medium  lg:text-right sm:text-left">Giá trị đơn tối thiểu</div>

                            <div class="col-span-12 lg:col-span-10  ">
                                <input
                                    // disabled={isApply}
                                    value={voucher.voucher.donToiThieu}
                                    onChange={(e)=>{
                                        voucher.voucher.donToiThieu= e.target.value;
                                        setFlag(flag+1)
                                    }}
                                    type="number"
                                    placeholder="Tìm Tên sản phẩm, SKU sản phẩm, SKU phân loại, Mã sản phẩm"
                                    class="w-11/12 lg:w-10/12 p-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                />
                                <p className=" hidden lg:block text-xs mt-2 text-danger">{voucher.voucher.donToiThieu<0?"Tối thiểu 0":""}</p>
                                <p className="hidden lg:block text-xs mt-2 text-warning">Nhập 0đ nếu không bắt buộc</p>
                            </div>
                        </div>
                    </div>
                    {/* số lược dụng tối đa */}
                    <div class="container mx-auto mt-3">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 text-md text-medium lg:text-right sm:text-left">Tổng lượt sử dụng tối đa</div>

                            <div class="col-span-12 lg:col-span-10  ">
                                <input
                                    value={voucher.voucher.soLuocDung}
                                    onChange={(e)=>{
                                        voucher.voucher.soLuocDung= e.target.value;
                                        setFlag(flag+1)
                                    }}
                                    type="text"
                                    placeholder="Tìm Tên sản phẩm, SKU sản phẩm, SKU phân loại, Mã sản phẩm"
                                    class="w-11/12 lg:w-10/12 p-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                />
                                <p className="hidden lg:block text-xs mt-2 text-danger">{voucher.voucher.soLuocDung<1?<span style={{color: "red", fontWeight: "bolder"}}>&#33; Số lược dùng tối thiểu 1</span>:""}</p>
                            </div>
                        </div>
                    </div>
                    {/* số lược tối đa / người  */}
                    <div class="container mx-auto mt-5">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 text-md text-medium  lg:text-right sm:text-left">Tổng lượt tối đa mỗi người</div>

                            <div class="col-span-12 lg:col-span-10  ">
                                <input
                                    // disabled={isApply}
                                    value={voucher.voucher.soLuocMoiNguoi}
                                    onChange={(e)=>{
                                        voucher.voucher.soLuocMoiNguoi= e.target.value;
                                        setFlag(flag+1)
                                    }}
                                    type="number"
                                    placeholder="Tìm Tên sản phẩm, SKU sản phẩm, SKU phân loại, Mã sản phẩm"
                                    class="w-11/12 lg:w-10/12 p-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                />
                                <p className="hidden lg:block text-xs mt-2 text-warning">{voucher.voucher.soLuocMoiNguoi<1||voucher.voucher.soLuocMoiNguoi>voucher.voucher.soLuocDung?"Lượt dùng / người phải >0 và < số lượt dùng":""}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* thông tin 2 */}
                <div style={{ borderRadius: '7px' }} className="shadow-md mt-3 container mx-auto p-4 relative bg-white">
                    <p className="font-semibold">Danh sách sản phẩm</p>
                    <div class="flex justify-between items-center w-full p-4 flex-wrap md:flex-nowrap">
                        <div class="text-gray-500">
                            <span className="text-sm">Sản phẩm được áp dụng({listProduct.size }) </span>
                        </div>
                        <button style={{borderRadius:"5px"}} className="bg-red-500 text-white p-2" onClick={()=>{
                            document.getElementById("togle").click()
                        }}>Chọn sản phẩm</button>
                    </div>
                    {/* số lược tối đa / người  */}
                    <div class="container mx-auto mt-2">
                        <div class="grid grid-cols-12 gap-4">
                            {/* <div class="col-span-12 lg:col-span-2 text-sm  lg:text-right sm:text-left"></div> */}

                            <div class="col-span-12 lg:col-span-10  " style={{overflow:"auto",height:"400px"}}>
                                <table class="border ml-4 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" >
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-800 dark:bg-light-200 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Thông tin sản phẩm
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Khoảng giá bán 
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Tổng số lượng hàng
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Giá ước lượng giảm
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                <span class="sr-only">Thao tác</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.from(listProduct.entries()).map(([key, value]) => (
                                                    <tr style={{borderBottom:"1px dotted gray"}} class="bg-white  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <th scope="row" class="px-6 py-4 flex font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        <img style={{width:"50px"}} src={value.productImage} />
                                                        <p className="ml-2 text-black whitespace-normal">{value.productName} - {value.productId}</p>
                                                    </th>
                                                    <td class="px-6 py-4">{value.minPrice} - {value.maxPrice} (VND)</td>
                                                    <td class="px-6 py-4">{value.soLuong}</td>
                                                    <td class="px-6 py-4">Từ 1000-2000</td>
                                                    <td class="px-6 py-4 text-right">
                                                        {value.isDelete==undefined||value.isDelete==false?<a style={{cursor:"pointer"}} 
                                                        onClick={()=>deleteVoucherInsert(value)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                                            <MdDelete/>
                                                        </a>:<a onClick={()=>{
                                                            removeDeleteVoucherInsert(value)
                                                        }}><TbRestore/></a>}
                                                    </td>
                                                </tr>
                                        ))}
                                        
                                    </tbody>
                                </table>
                                <p className="hidden lg:block text-xs mt-2 text-warning">Không vược quá số lượt tối đa</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div onClick={()=>{
                handleSubmit()
            }} style={{position:"fixed" ,bottom:"20px",right:"8%"}}>
                <MyComponents />
            </div>
            <div  style={{position:"fixed" ,bottom:"80px",right:"2%"}}>
                            <VoucherModal  flag={flag} map={listProduct} setFlag={setFlag}/>
            </div>
         </>
    );
};
export default VoucherUpdate;


const MyComponents = () => {
  return (
    <Button variant="contained" disableElevation>
    Tạo mã giảm giá
</Button>
  );
};
