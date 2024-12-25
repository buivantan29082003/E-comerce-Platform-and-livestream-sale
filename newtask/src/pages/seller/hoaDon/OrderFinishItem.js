import React from "react"
import { useNavigate } from "react-router-dom"
import api from "../../../config/APISeller"
import { format } from "date-fns";
import { FaCheckCircle, FaEye } from "react-icons/fa";
import formatToVND from "../../client/FormatVnd";
const SpringModal = React.lazy(() => import("./ModalItemOrder"));
const OrderFinishItem=({order})=>{
    const [flag,setFlag]=React.useState(0)
    const navigate=useNavigate()
    return    <>
         <tr className="hover:bg-gray-100 transition-colors">
        <td className="px-4 py-4 max-w-[150px] truncate text-sm font-medium text-gray-900">
            HD{order.id}
        </td>
        <td className="px-4 py-4 max-w-[200px] truncate text-sm text-gray-500">
        {order.accountId.soDienThoai}
        </td>
        <td className="px-4 py-4 max-w-[200px] truncate text-sm text-gray-500">
        {order.accountId.hoVaTen}
        </td>
        <td className="px-4 py-4 max-w-[150px] truncate text-sm text-gray-500">
        {format(new Date(order.ngayTaoDon), "HH:mm dd/MM/yyyy")}
        </td>
        <td className="px-4 py-4 max-w-[150px] truncate text-sm text-gray-500">
          {formatToVND(order.tongTien)}
        </td>
        <td className="px-4 py-4 max-w-[200px] text-sm">
          <span className="text-green-600 inline-flex items-center justify-center bg-green-100 px-2 py-1 rounded-full text-xs font-medium shadow-sm">
            <FaCheckCircle className="mr-1" /> Giao hàng thành công
          </span>
        </td>
        <td className="cursor-pointer">
        <FaEye style={{display:"inline-block"}} color="blue"/> <span className="text-xs"> <SpringModal cart={order.orderDetails}/></span>
        </td>
        <td className="px-4 py-4 max-w-[200px] truncate text-sm">
          <button
            onClick={() => alert("Xem chi tiết đơn hàng 123456")}
            className="text-blue-600 hover:text-blue-800 hover:underline transition duration-200"
          >
            Xem chi tiết
          </button>
          <br/>
          {/* <button onClick={()=>{
                    api.post(`/order/submitorder?id=${order.id}`).then(v=>v.data).then(v=>{
                        if(v.status===200){
                            alert(v.message)
                            order.daNhanHang=1;
                            setFlag(flag+1)
                        }else{
                            alert(v.message)
                        }
                    })
               }} hidden={
                ((new Date() - new Date(order.ngayTaoDon))<(604800000)) 
            } className="text-blue-600 hover:text-blue-800 hover:underline transition duration-200"> {order.daNhanHang==0?"Xác nhận đơn":"Đã hoàn tất"}</button>  */}
        </td>
      </tr>
    </>    
}
export default React.memo(OrderFinishItem)