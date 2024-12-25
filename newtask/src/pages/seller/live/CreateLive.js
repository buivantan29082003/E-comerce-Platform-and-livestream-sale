import { useState } from 'react';
// import ModalVoucher from "../voucher/ModalVoucher";
import VoucherModal from '../voucher/ModalVoucher';
import { MdDelete } from 'react-icons/md';
import api from '../../../config/APISeller';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const CreateLive = () => {
    const [listProduct, setListProduct] = useState(new Map());
    const [flag2, setFlag2] = useState(1);
    const [live,setlive]=useState({})
    const deleteProduct = (key) => {
        listProduct.delete(key);
        setFlag2(flag2 + 1);
    };

    const navigate=useNavigate()
    const createLive=()=>{
        
        toast.promise(
            api.post("/live/createlive",{
                "live":live,
                productIds:Array.from(listProduct.keys())
            },{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(v=>v.data).then(v=>{
                if(v.status!==200){
                    throw new Error(v.message)
                }else{
                    navigate("/seller/live")
                }
            }),
            {
              loading: "Creating live.....", 
              success: 'Create live successfully.', 
              error: (error) => error.message,
            }
          );
        
    }
    return (
        <>
            <VoucherModal flag={flag2} map={listProduct} setFlag={setFlag2} />
            <div style={{ borderRadius: '7px' }} className="container mx-auto p-4 relative bg-white">
                <p className=" font-semibold text-blue-600">Kênh người bán > live </p>
                <div className=" border-gray-200 relative"></div>
            </div>

            <div style={{ borderRadius: '7px' }} className="shadow-md mt-3 container mx-auto p-4 relative bg-white">
                <p className="font-semibold text-md font-semibold text-blue-600">Tạo livestream</p>
                <div class="container mx-auto mt-3">
                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-12 lg:col-span-2 text-sm font-semibold  lg:text-right sm:text-left">Hình ảnh</div>

                        <div class="col-span-12 lg:col-span-10 h-30 lg:w-3/12 sm:w-5/12" style={{ overflow: 'hidden' }}>
                            <img
                                src="data:image/jpeg;base64,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"
                                style={{ width: '100%' }}
                            />
                        </div>
                    </div>
                </div>
                <div class="container mx-auto mt-3">
                    <div class="grid grid-cols-12 gap-4">
                        <div class="col-span-12 lg:col-span-2 text-sm font-semibold lg:text-right sm:text-left">Tiêu đề</div>

                        <div class="col-span-12 lg:col-span-10  ">
                            <input
                                value={live.tieuDe}
                                onChange={(e) => {
                                    live.tieuDe = e.target.value;
                                    setFlag2(flag2 + 1);
                                }}
                                type="text"
                                placeholder="vui lòng nhập tiêu đề cho buổi phát trực tiếp của bạn"
                                class="w-11/12 p-2 lg:w-9/12 p-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                            />
                            <p className="hidden lg:block text-xs mt-2 text-danger">{live.tieuDe!==undefined&&live.tieuDe.length<10?"Vui lòng nhập ít nhất 10 ký tự":""}</p>
                        </div>
                    </div>
                </div>

                <div class="container mx-auto mt-3">
                    <div class="container mx-auto mt-3">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 text-sm font-semibold lg:text-right sm:text-left">Mô tả</div>
                            <div class="col-span-12 lg:col-span-10  ">
                                <textarea
                                    rows={5}
                                    // value={khuyenMai.giaTriGiam}
                                    onChange={(e) => {
                                        live.moTa = e.target.value;
                                        // setFlag(flag + 1);
                                    }}
                                    placeholder="Nhập mô tả cho phiên live"
                                    class="w-11/12 lg:w-9/12 p-1 border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="container mx-auto mt-3">
                    <div class="container mx-auto mt-3">
                        <div class="grid grid-cols-12 gap-4">
                            <div class="col-span-12 lg:col-span-2 text-sm  lg:text-right sm:text-left font-semibold">Thêm sản phẩm vào live</div>

                            <div class="col-span-12 lg:col-span-10  ">
                                <div
                                    onClick={() => {
                                        document.getElementById('togle').click();
                                    }}
                                    style={{ border: '1px dashed gray' }}
                                    onChange={(e) => {}}
                                    class="w-4/12 cursor-pointer lg:w-3/12 p-1 hover:bg-blue-200 text-blue-600  rounded text-center"
                                >
                                    + thêm sản phẩm
                                </div>


                                <div class="col-span-12 lg:w-9/12 mt-2 " style={{ overflow: 'auto' }}>
                                <table class="border w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-600 dark:bg-light-200 dark:text-gray-400">
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
                                            <tr
                                                style={{ borderBottom: '1px dotted gray' }}
                                                class="bg-white  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                            >
                                                <th
                                                    scope="row"
                                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    <img style={{ width: '50px' }} src={value.productImage} />
                                                </th>
                                                <td class="px-6 py-4">
                                                    {value.minPrice} - {value.maxPrice} (VND)
                                                </td>
                                                <td class="px-6 py-4">{value.soLuong}</td>
                                                <td
                                                    onClick={() => {
                                                        deleteProduct(key);
                                                    }}
                                                    class="cursor-pointer px-6 py-4 text-right"
                                                >
                                                    <MdDelete color="red" />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                                <div class="col-span-12 lg:col-span-10 mt-2  ">
                                    <div
                                        onClick={() => {
                                            createLive()
                                        }}
                                        style={{ border: '1px solid red' }}
                                        onChange={(e) => {}}
                                        class="w-4/12 cursor-pointer lg:w-3/12 p-1 hover:bg-red-100 text-red-600  rounded text-center"
                                    >
                                        Tạo live
                                    </div>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default CreateLive;
