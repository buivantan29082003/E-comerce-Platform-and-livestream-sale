import React, { createContext, Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SellerLive from "../Live/SellerLive";
import WatchLive from "../Live/Rename";
import api from "../../config/APIClient";
import toast from "react-hot-toast";
import SellerChat from "./Chat/SellerChat";

// Lazy loading các thành phần
const MainSeller = React.lazy(() => import("./MainSeller"));
const OrderDetail = React.lazy(() => import("./hoaDon/OrderDetail"));
const UpdateShop = React.lazy(() => import("./shopInfo/UpdateShop"));
const UpdateAddressShop = React.lazy(() => import("./shopInfo/UpdateAddressShop"));
const DashboardMain = React.lazy(() => import("./DashBoard"));
const ViewProduct = React.lazy(() => import("./viewproduct/ViewProduct"));
const CUProduct = React.lazy(() => import("./product/CUproduct"));
const UpdateProduct = React.lazy(() => import("./product/UpdateProduct"));
const CUKhuyenMai = React.lazy(() => import("./KhuyenMai/CUKhuyenMai"));
const KhuyenMaiView = React.lazy(() => import("./KhuyenMai/KhuyenMaiView"));
const UpdateKhuyenMai = React.lazy(() => import("./KhuyenMai/UpdateKhuyenMai"));
const HoaDonView = React.lazy(() => import("./hoaDon/HoaDonView"));
const ReviewList = React.lazy(() => import("./Rating"));
const ListVoucher = React.lazy(() => import("./voucher/ListVoucher"));
const VoucherView = React.lazy(() => import("./voucher/VoucherView"));
const VoucherUpdate = React.lazy(() => import("./voucher/VoucherUpdate"));
const OrderConfirmation = React.lazy(() => import("./voucher/VoucherDetail"));
const CreateLive = React.lazy(() => import("./live/CreateLive"));
const ListLive = React.lazy(() => import("./live/ListLive"));
const RegisterShop = React.lazy(() => import("./RegisterShop"));
export const AppContext = createContext();
const RouteSeller = () => {
 const [shop,setShop]=useState(null)
  useEffect(()=>{
    api.get("/checkseller").then(v=>v.data).then(v=>{
      if(v.status===200){
        setShop(v.data)
      }
      else{
          toast.error(v.message)
          window.location.href="http://localhost:3001/"
      }
    })
  },[])
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center" style={{zIndex:"99999"}}>
    <div className="text-center">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16 mx-auto mb-4"></div>
    </div>
  </div>}>
       <AppContext.Provider value={{shop}}>
      <Routes>
        <Route path="/seller" element={<MainSeller />}>
          <Route path="orderdetail/:id" element={<OrderDetail />} />
          <Route path="shopinfo/" element={<UpdateShop />} />
          <Route path="updateadress/" element={<UpdateAddressShop />} />
          <Route path="*" element={<DashboardMain />} />
          <Route path="product" element={<ViewProduct />} />
          <Route path="chat" element={<SellerChat />} />
          <Route path="newproduct" element={<CUProduct />} />
          <Route path="updateproduct/:id" element={<UpdateProduct />} />
          <Route path="khuyenmai" element={<CUKhuyenMai />} />
          <Route path="newkhuyenmai" element={<KhuyenMaiView />} />
          <Route path="updatekhuyenmai/:id?" element={<UpdateKhuyenMai />} />
          <Route path="order" element={<HoaDonView />} />
          <Route path="review" element={<ReviewList />} />
          <Route path="voucher/:type?" element={<ListVoucher />} />
          <Route path="newvoucher/" element={<VoucherView />} />
          <Route path="updatevoucher/:type?" element={<VoucherUpdate />} />
          <Route path="voucherinfo/:id" element={<OrderConfirmation />} />
          <Route path="newlive" element={<CreateLive />} />
          <Route path="live" element={<ListLive />} />
          <Route path="seller" element={<RegisterShop />} />
          <Route path="live/start/:id" element={<SellerLive />} />
        </Route>

      </Routes>
      </AppContext.Provider>
    </Suspense>
  );
};

export default RouteSeller;
