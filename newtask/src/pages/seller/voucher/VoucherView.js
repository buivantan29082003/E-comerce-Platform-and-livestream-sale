import { useContext, useEffect, useRef, useState } from "react";
import VoucherModal from "./ModalVoucher";
// import gsap from "gsap";
import { Button, Checkbox } from "@mui/material";
import React from 'react';
import ToggleSwitch from "../product/Toglle";
import toast from "react-hot-toast";
import formatVietnamCurrency from "../FormateVND";
import { AppContext } from "../../../App";
import api from "../../../config/APISeller";
import { useNavigate } from "react-router-dom";

const VoucherView = () => {
    const {setFloadingPage } = useContext(AppContext);
    const componentRef = useRef(null);
    const [flag,setFlag]=useState(1)
    const [flag2,setFlag2]=useState(1)
    const [voucher,setVoucher]=useState({voucher:{
        loaiVoucher:1,giaTriGiam:2
        },voucherProducts:new Map()
    })
    const [listProduct,setListProduct]=useState(new Map())
    const [isSend,setIsSend]=useState(true)


    const handleSubmit=()=>{
        if(listProduct.size>0){
            let a= Array.from(listProduct.keys()).map(key => parseInt(key, 10));
            voucher.voucherProducts=a;
            createOrder()
        }else{
            alert("Chưa chọn sản phẩm nào !!!")
        }
    }


    const deleteProduct=(key)=>{
        listProduct.delete(key)
        setFlag(flag+1)
    }
    const navigate=useNavigate()

    async function createOrder() {
            toast.promise(
                api.post(`/voucher/addvoucher?issend=${isSend}`, 
                    voucher,{
                        headers: {
                            'Content-Type': 'application/json'
                          }
                    }
                  ).then(v=>v.data).then(v=>{
                    if(v.status===200){
                        navigate("/seller/voucher/0")
                    }else{
                        throw new Error(v.message)
                    }
                  }),
                {
                    
                  loading: "Đang thực hiện.....", 
                  success: 'Tạo mã giảm giá thành công.', 
                  error: (error) => error.message,
                }
              );
      }
      

    useEffect(() => {
        setFloadingPage()
        // gsap.fromTo(
        //     componentRef.current,
        //     { x: -100 },
        //     { x: 0, duration: 0.2 } 
        // );
    }, []);
    return (
        <>
            <div >
                <VoucherModal flag={flag2} map={listProduct} setFlag={setFlag2}/>
            </div>
            <div ref={componentRef} className="mb-3">
            
                <div style={{ borderRadius: '7px' }} className="container mx-auto p-4 relative bg-white">
                    <p className=" font-bold text-md text-blue-900">Kênh người bán > Quản lý voucher > thao tac voucher</p>
                    <div className=" border-gray-200 relative"></div>
                </div>
                <div style={{ borderRadius: '7px' }} className="shadow-md mt-3 container mx-auto p-4 relative bg-white">
                    <p className="font-bold text-lg text-blue-800">Thông tin cơ bản</p>

                    {/* form */}
                    {/* Tên chương trình */}
                    <div className=" border-gray-200 relative"></div>
                    <div class="container mx-auto mt-3">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 text-sm font-medium  lg:text-right sm:text-left">Tên voucher</div>

                            <div class="col-span-12 lg:col-span-10  ">
                                <input
                                    onChange={(e)=>{
                                        voucher.voucher.tenVoucher=e.target.value
                                        setFlag2(flag2+1)
                                    }}
                                    type="text"
                                    placeholder="Tên voucher hiển thị với người dùng"
                                    class="w-11/12 p-2 lg:w-10/12 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                />
                                <p className=" hidden lg:block text-xs mt-2 text-danger">{voucher.voucher.tenVoucher!==undefined&&voucher.voucher.tenVoucher.length<5?"Nhập ít nhất 5 ký tự cho tên voucher":""}</p>
                                <p className=" hidden lg:block text-xs mt-2 text-warning"></p>
                            </div>
                        </div>
                    </div>
                    {/* mã voucher */}
                    <div class="container mx-auto mt-3">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 text-sm font-medium lg:text-right sm:text-left">Mã giảm giá</div>

                            <div class="col-span-12 lg:col-span-10  ">
                                <input
                                    // value={voucher.voucher.maVoucher}
                                    onChange={(e)=>{
                                        voucher.voucher.maVoucher=e.target.value
                                        // setFlag(flag+1)
                                    }}
                                    maxLength="5"
                                    type="text"
                                    placeholder="Mã voucher"
                                    class="w-11/12 p-2 lg:w-10/12 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                />
                                <p className="hidden lg:block text-xs mt-2 text-warning"></p>
                            </div>
                        </div>
                    </div>
                    {/* thời gian sử dụng voucher */}
                    <div class="container mx-auto mt-3">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 text-sm font-medium lg:text-right sm:text-left">Thời gian sử dụng mã </div>

                            <div class="col-span-12 lg:col-span-10">
                                
                                <input
                                    onChange={(e)=>{
                                        voucher.voucher.ngayBatDau= new Date(e.target.value);
                                        setFlag(flag+1)
                                    }}  
                                    type="datetime-local"
                                    class="w-5/12 p-2 lg:w-5/12 p-1 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                />
                                <input
                                    onChange={(e)=>{
                                        voucher.voucher.ngayKetThuc= new Date(e.target.value);
                                        setFlag(flag+1)
                                    }}
                                    type="datetime-local"
                                    class="ml-2 p-2 w-5/12 lg:w-5/12 p-1 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                />
                                <p class="hidden lg:block text-xs mt-2 text-danger">{voucher.voucher.ngayBatDau<voucher.voucher.ngayketThuc?"Ngày Bắt đâu phải lớn hơn ngày hiện tại":""}</p>
                            </div>
                        </div>
                    </div>

                     {/* mô tả  */}
                     <div class="container mx-auto mt-3">
                            <div class="grid grid-cols-12 gap-4">
                                <div class="col-span-12 lg:col-span-2 text-sm font-medium lg:text-right sm:text-left">Mô tả chi tiết</div>

                                <div class="col-span-12 lg:col-span-10  ">
                                    <textarea rows={7}
                                    // value={voucher.voucher.moTa}
                                    onChange={(e)=>{
                                        voucher.voucher.moTa=e.target.value
                                        // setFlag(flag+1)
                                        // alert(ỏ)
                                    }}
                                        // type="text"
                                        placeholder="Mô tả về voucher"
                                        class="w-11/12 p-2 lg:w-10/12 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                        />
                                    {/* <p className="hidden lg:block text-xs mt-2 text-danger"></p>
                                    <p className="hidden lg:block text-xs mt-2 text-warning">Giới hạn 150 ký tự ({}/150 )</p> */}
                                </div>
                            </div>
                        </div>
                </div>

                {/* thông tin 2 */}
                <div style={{ borderRadius: '7px' }} className="shadow-sm mt-3 container mx-auto p-4 relative bg-white">
                    <p className="font-bold text-lg text-blue-800">Thiết lập giảm giá</p>

                    {/* form */}
                    {/* Tên chương trình */}
                    <div className=" border-gray-200 relative"></div>
                    <div class="container mx-auto mt-3">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 text-sm font-medium lg:text-right sm:text-left">Giảm theo phần trăm</div>

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
                            <div class="col-span-12 lg:col-span-2 text-sm font-medium lg:text-right sm:text-left">giá trị giảm</div>

                            <div class="col-span-12 lg:col-span-10  ">
                                <input 
                                    // value={voucher.voucher.giaTriGiam}
                                    onChange={(e)=>{
                                        voucher.voucher.giaTriGiam= e.target.value;
                                        setFlag(flag+1)
                                    }}
                                    type="number"
                                    placeholder="Giá trị giảm"
                                    class="w-11/12 p-2 lg:w-10/12 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                />
                                {/* {voucher.voucher.loaiVoucher} */}
                                <p className=" hidden lg:block text-xs mt-2 text-danger">{voucher.voucher.loaiVoucher==0&&voucher.voucher.giaTriGiam<1000?"Giá vui lòng lớn hơn 1000":""}</p>
                                <p className=" hidden lg:block text-xs mt-2 text-danger">{voucher.voucher.loaiVoucher==1&&(voucher.voucher.giaTriGiam<1||voucher.voucher.giaTriGiam>99)?"Vui lòng nhập trong khoản 1-99":""}</p>
                                {/* <p className=" hidden lg:block text-xs mt-2 text-warning"> Giảm tiền tối thiểu 1000 VND - 1 đến 99 nếu giảm theo phần trăm</p> */}
                            </div>
                        </div>
                    </div>
                    <div class="container mx-auto mt-3">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 text-sm font-medium lg:text-right sm:text-left">Giảm tối đa</div>

                            <div class="col-span-12 lg:col-span-10  ">
                                <input disabled={voucher. voucher.loaiVoucher===0}
                                    value={voucher.voucher.giamToiDa}
                                    onChange={(e)=>{
                                        voucher.voucher.giamToiDa= e.target.value;
                                        setFlag(flag+1)
                                    }}
                                    type="number"
                                    placeholder="Giới hạn giảm"
                                    class="w-11/12 p-2 lg:w-10/12 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                />
                                {/* {voucher.voucher.loaiVoucher}
                                <p className=" hidden lg:block text-xs mt-2 text-red">{voucher.voucher.loaiVoucher==0&&voucher.voucher.giaTriGiam<1000?"Giá vui lòng lớn hơn 1000":""}</p>
                                <p className=" hidden lg:block text-xs mt-2 text-red">{voucher.voucher.loaiVoucher==1&&(voucher.voucher.giaTriGiam<1||voucher.voucher.giaTriGiam>99)?"Vui lòng nhập trong khoản 1-99":""}</p> */}
                                <p className=" hidden lg:block text-xs mt-2 text-warning"> nhập 0 nếu không giới hạn giảm</p>
                            </div>
                        </div>
                    </div>

                    <div class="container mx-auto mt-3">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 text-sm font-medium lg:text-right sm:text-left">Giá trị đơn tối thiểu</div>

                            <div class="col-span-12 lg:col-span-10  ">
                                <input
                                    value={voucher.voucher.donToiThieu}
                                    onChange={(e)=>{
                                        voucher.voucher.donToiThieu= e.target.value;
                                        setFlag(flag+1)
                                    }}
                                    type="number"
                                    placeholder="Đơn tối thiểu"
                                    class="w-11/12 p-2 lg:w-10/12 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                />
                                <p className=" hidden lg:block text-xs mt-2 text-danger">{voucher.voucher.donToiThieu<0?"Tối thiểu 0":""}</p>
                                <p className="hidden lg:block text-xs mt-2 text-warning">Nhập 0đ nếu không bắt buộc</p>
                            </div>
                        </div>
                    </div>
                    {/* số lược dụng tối đa */}
                    <div class="container mx-auto mt-3">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 text-sm font-medium lg:text-right sm:text-left">Tổng lượt sử dụng tối đa</div>

                            <div class="col-span-12 lg:col-span-10  ">
                                <input
                                    // value={voucher.voucher.soLuocDung}
                                    onChange={(e)=>{
                                        voucher.voucher.soLuocDung= e.target.value;
                                        setFlag(flag+1)
                                    }}
                                    type="text"
                                    placeholder="Số lược tối đa"
                                    class="w-11/12 p-2 lg:w-10/12 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                />
                                <p className="hidden p-2 lg:block text-xs mt-2 text-danger">{voucher.voucher.soLuocDung<1?"Số lược dùng tối thiểu = 1":""}</p>
                            </div>
                        </div>
                    </div>
                    {/* số lược tối đa / người  */}
                    <div class="container mx-auto mt-3">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 text-sm font-medium lg:text-right sm:text-left">Tổng lượt sử dụng tối đa/ người</div>

                            <div class="col-span-12 lg:col-span-10  ">
                                <input
                                    // value={voucher.voucher.soLuocMoiNguoi}
                                    onChange={(e)=>{
                                        voucher.voucher.soLuocMoiNguoi= e.target.value;
                                        setFlag(flag+1)
                                    }}
                                    type="number"
                                    placeholder="Số lược mỗi người"
                                    class="w-11/12 p-2 lg:w-10/12 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                />
                                <p className="hidden lg:block text-xs mt-2 text-danger">{voucher.voucher.soLuocMoiNguoi<1||voucher.voucher.soLuocMoiNguoi>voucher.voucher.soLuocDung?"Lượt dùng / người phải >0 và < số lượt dùng":""}</p>
                            </div>
                        </div>
                    </div>
                    

                    <div class="container mx-auto mt-5">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 text-sm font-medium lg:text-right sm:text-left">Tùy chọn gửi thông báo đến các khách hàng.</div>

                            <div onClick={()=>{
                                setIsSend(!isSend)
                            }}  class="col-span-12 lg:col-span-10  ">
                            <ToggleSwitch />
                            <div class="col-span-12 lg:col-span-10  ">
                                    <textarea rows={7}
                                    onChange={(e)=>{
                                        voucher.moTaThongBao=e.target.value
                                    }}
                                        placeholder="Nội dung thông báo đến khách hàng"
                                        class="w-11/12 p-2 lg:w-10/12 p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                        />
                                </div>
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
                        {/* <VoucherModal flag={flag} map={listProduct} setFlag={setFlag}/> */}
                        <div class="container mx-auto mt-2">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 text-sm  lg:text-right sm:text-left"></div>

                            <div class="col-span-12 lg:col-span-10  " style={{overflow:"auto"}}>
                                <table class="border w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-700">
                                    <thead class="text-xs text-gray-900 uppercase bg-gray-700 dark:bg-light-200 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Sản phẩm
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Giá bán 
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Số lượng tổng
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                <span class="sr-only">Thao tác</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    
                                    <tbody>
                                        {Array.from(listProduct.entries()).map(([key, value]) => (
                                                    <tr style={{borderBottom:"1px dotted gray"}} class="bg-white  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        <img style={{width:"50px"}} src={value.productImage} />
                                                    </th>
                                                    <td class="px-6 py-4">{formatVietnamCurrency(value.minPrice)} - {formatVietnamCurrency(value.maxPrice)} </td>
                                                    <td class="px-6 py-4">{value.soLuong} sản phẩm</td>
                                                    {/* <td class="px-6 py-4">Từ {formatVietnamCurrency(vou'')}</td> */}
                                                    <td onClick={()=>{
                                                        deleteProduct(key)
                                                    }} class="cursor-pointer px-6 py-4 text-right">
                                                        <Button variant="outlined" >
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                                ))}
                                    </tbody>
                                </table>
                                {/* <p className="hidden lg:block text-xs mt-2 text-warning">Không vược quá số lượt tối đa</p> */}
                            </div>
                        </div>
                    </div>
                    </div>
                    {/* số lược tối đa / người  */}
                   
                </div>
                
            </div>
            <div onClick={()=>{
                handleSubmit()
            }} style={{position:"fixed" ,bottom:"20px",right:"8%"}}>
                <MyComponents />
            </div>
            {/* <button style={{position:"fixed" ,bottom:"20px",right:"20px"}} className="" onClick={()=>handleSubmit()}><MyComponents/> */}
         </>
    );
};
export default VoucherView;


const MyComponents = () => {
  return (
    <Button variant="contained" disableElevation>
          Tạo mã giảm giá
    </Button>
  );
};
