import React, { useState } from "react";
// import ModalReport from "./ModalReport";
import toast from "react-hot-toast";
import { Button, Menu, MenuItem } from "@mui/material";
// import ModalCancel from "./ModalCancel";
import SpringModal from "./ModalItemOrder";
import { FaCheckCircle, FaEye } from "react-icons/fa";
import formatToVND from "../../client/FormatVnd";
import { format } from "date-fns";
// import ModalCancel from "./ModalCancel";
// import { IoTelescope } from "react-icons/io5";
import ModalReport from "./ModalCancelNotReload";

const OrderItemCancel = ({ order, isCheckTab }) => {
  const [flag, setFlag] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
      setAnchorEl(null);
  };
  const al = (message) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded shadow-lg pointer-events-auto flex`}
      >
        <div className="flex-1">
          <p>{message}</p>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)} // Use toast.dismiss with t.id
          className="ml-4 text-blue-700 font-bold"
        >
          X
        </button>
      </div>
    ));
  };

  return (
    <>
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
                        <FaCheckCircle className="mr-1" /> {order.trangThai.tenTrangThai}
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
                            <MenuItem  onClick={() => al(order.lyDo)}>  Xem lý do hủy đơn </MenuItem>
                            <MenuItem><ModalReport order={order}/></MenuItem>
                        </Menu>
                    </div>
                </td>
            </tr>
        </>
    // <div className="w-11/12 mx-auto bg-white shadow-md rounded-sm overflow-hidden mb-4">
    //   <div className="flex items-center justify-between p-2 justify-content-between">
    //     <div className="flex items-center space-x-2 w-10/12 ml-4">
    //       <input
    //         onClick={() => {
    //           order.isCheck = !order.isCheck;
    //           setFlag(flag + 1);
    //         }}
    //         checked={order.isCheck === true}
    //         type="checkbox"
    //       />
    //       <span className="font-medium text-sm">
    //         {order.accountId.hoVaTen} - {order.accountId.soDienThoai}
    //       </span>
    //     </div>
    //   </div>
    //   <div className="flex items-center justify-between p-2 mb-3 justify-content-between">
    //     <div className="flex items-center space-x-2 w-10/12">
    //       <span className="font-semibold text-sm ml-4">
    //         {new Date(order.ngayTaoDon).toDateString()} . ID đơn hàng: {order.id}
    //       </span>
    //     </div>
    //   </div>
    //   <div className="w-[95%] h-[1px] bg-gray-300 mx-auto"></div>
    //   {order.orderDetails.map((v) => (
    //     <div className="p-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-12/12">
    //       <div className="flex-shrink-0">
    //         <img
    //           style={{ width: "70px" }}
    //           src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lmzl2bj75yhkc1_tn"
    //           alt="5D Mask"
    //         />
    //       </div>
    //       <div className="flex-grow w-12/12">
    //         <h2 className="font-semibold text-sm text-green-600">
    //           {v.product.product.tenSanPham}
    //         </h2>
    //         <p className="text-gray-500 text-xs">
    //           {v.product.mauSac.tenMau} - {v.product.kichThuoc.tenKichThuoc}
    //         </p>
    //         <div className="flex items-center justify-between mt-2">
    //           <p className="text-xs">x{v.soLuong} x {v.giaBan}</p>
    //           <p className="text-xs text-red-500">
    //             <sup>đ</sup>{v.soLuong * v.giaBan}
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    //   <div className="w-[95%] h-[1px] bg-lightgray mx-auto my-1.5 mb-3"></div>
    //   <p className="text-xs text-right mr-5 pr-1">
    //     Voucher shop:{" "}
    //     <span className="text-sm text-red-500">
    //       <sup>đ</sup>{order.tienTru}
    //     </span>
    //   </p>
    //   <p className="text-xs text-right mr-5 pr-1">
    //     Voucher sàn:{" "}
    //     <span className="text-sm text-red-500">
    //       <sup>đ</sup>{order.tienTruVoucherSan}
    //     </span>
    //   </p>
    //   <p className="text-xs text-right mr-5 pr-1">
    //     Thành tiền:{" "}
    //     <span className="text-sm text-red-500">
    //       <sup>đ</sup>{order.tongTien}
    //     </span>
    //   </p>
    //   <div className="flex space-x-2 p-4 justify-content-between w-12/12">
    //     <div className="flex">
    //       <button
    //         onClick={() => al(order.lyDo)}
    //         className="bg-red-600 text-white text-sm px-4 py-2 rounded-sm"
    //       >
    //         Xem lý do hủy đơn
    //       </button>
    //       <button className="border text-sm border-gray-300 text-black px-4 py-2 rounded-sm lg:ml-2">
    //         Xem chi tiết đơn hàng
    //       </button>
    //       <ModalReport />
    //     </div>
    //   </div>
    // </div>
  );
};

export default OrderItemCancel;
