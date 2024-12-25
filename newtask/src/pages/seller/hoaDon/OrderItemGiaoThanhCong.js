import React, { useEffect, useState } from "react"
import api from "../../../config/APISeller"
import toast from "react-hot-toast"
import { FaCheckCircle, FaEye } from "react-icons/fa"
import formatToVND from "../../client/FormatVnd"
import { format } from "date-fns"
import SpringModal from "./ModalItemOrder"
import { Button, Menu, MenuItem } from "@mui/material"

const OrderItemGiaoThanhCong=({order,removeOrder,index})=>{
    const [flag,setFlag]=React.useState(0)
    const [isEdit,setIsEdit]=useState(false)
    useEffect(()=>{
        setIsEdit(new Date() >new Date(new Date(order.ngayTaoDon).getTime() + 7 * 24 * 60 * 60 * 1000))
    //     const sevenDaysFromNow = new Date(new Date(order.ngayTaoDon).getTime() + 7 * 24 * 60 * 60 * 1000); // Cộng thêm 7 ngày
    // return date > sevenDaysFromNow;
    },[])
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };
   

    const updateDonHang=()=>{
        toast.promise(
            api.post("/order/xacnhan?id="+order.id).then(v=>v.data).then(v=>{
                if(v.status !==200){
                    throw new Error(v.message)
                }else{
                    removeOrder(index)
                }
            })
            ,{          
                loading: "Updating status order.....", 
                success: 'Update order successfully.', 
                error: (error) => error.message,
        })
        
    }
     const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return  <>
    {' '}
    <tr className="hover:bg-gray-100 transition-colors">
        <td className="px-4 py-4 max-w-[150px] truncate text-sm font-medium text-gray-900">
            <input
                onClick={() => {
                    order.isCheck = !order.isCheck;
                    setFlag(flag + 1);
                }}
                checked={order.isCheck === true}
                type="checkbox"
            />{' '}
            HD{order.id}
        </td>
        <td className="px-4 py-4 max-w-[200px] truncate text-sm text-gray-900">{order.accountId.soDienThoai}</td>
        <td className="px-4 py-4 max-w-[200px] truncate text-sm text-gray-500">{order.accountId.hoVaTen}</td>
        <td className="px-4 py-4 max-w-[150px] truncate text-sm text-gray-500">
            {format(new Date(order.ngayTaoDon), 'HH:mm dd/MM/yyyy')}
        </td>
        <td className="px-4 py-4 max-w-[150px] truncate text-sm text-gray-500">{formatToVND(order.tongTien)}</td>
        <td className="px-4 py-4 max-w-[200px] text-sm">
            <span className="text-green-600 inline-flex items-center justify-center bg-green-100 px-2 py-1 rounded-full text-xs font-medium shadow-sm">
                <FaCheckCircle className="mr-1" /> {'Đã giao hàng'}
            </span>
        </td>
        <td className="cursor-pointer">
            <FaEye style={{ display: 'inline-block' }} color="blue" />{' '}
            <span className="text-xs">
                {' '}
                <SpringModal cart={order.orderDetails} />
            </span>
        </td>
        <td className="px-4 py-4 max-w-[200px] truncate text-sm">
            <div>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Thao tác
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => {}}>Xem chi tiết</MenuItem>
                    {/* <MenuItem onClick={updateOrderSingle}>Tiếp tục xử lý</MenuItem> */}
                    <MenuItem> <button
                    disabled={!isEdit}
                    onClick={() => updateDonHang()}
                    className="text-green-600 border-2 hover:bg-green-700 hover:text-white border-green-600 p-2 text-sm rounded-sm"
                    >
                    {isEdit?"Xác nhận đơn hàng":"Người dùng chưa xác nhận"}
                </button></MenuItem>
                </Menu>
            </div>
        </td>
    </tr>
</>
}
export default React.memo(OrderItemGiaoThanhCong)