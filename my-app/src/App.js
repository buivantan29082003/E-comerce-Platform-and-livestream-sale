import { ClientRoutes } from "./routes/clientRoute";
import { AdminRoutes } from "./routes/adminRoute";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import MainSeller from "../src/pages/seller/MainSeller";
import OrderDetail from "../src/pages/seller/hoaDon/OrderDetail";
import DashboardMain from "../src/pages/seller/DashboardMain";
import ViewProduct from "../src/pages/seller/viewproduct/ViewProduct";
import CUProduct from "../src/pages/seller/product/CUproduct";
import UpdateProduct from "../src/pages/seller/product/UpdateProduct";
import CUKhuyenMai from "../src/pages/seller/KhuyenMai/CUKhuyenMai";
import KhuyenMaiView from "../src/pages/seller/KhuyenMai/KhuyenMaiView";
import UpdateKhuyenMai from "../src/pages/seller/KhuyenMai/UpdateKhuyenMai";
import HoaDonView from "../src/pages/seller/hoaDon/HoaDonView";
import ReviewList from "../src/pages/seller/Rating";
import ListVoucher from "../src/pages/seller/voucher/ListVoucher";
import VoucherView from "../src/pages/seller/voucher/VoucherView";
import VoucherUpdate from "../src/pages/seller/voucher/VoucherUpdate";
import OrderConfirmation from "../src/pages/seller/voucher/VoucherDetail";
function App(props) {
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<ClientRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />

        <Route path="/seller" element={<MainSeller />}>
          <Route path="orderdetail/:id" element={<OrderDetail />}></Route>
          <Route path="*" element={<DashboardMain />}></Route>
          <Route path="product" element={<ViewProduct></ViewProduct>} />
          <Route path="newproduct" element={<CUProduct />} />
          <Route path="updateproduct/:id" element={<UpdateProduct />} />
          <Route path="khuyenmai" element={<CUKhuyenMai />} />
          <Route path="newkhuyenmai" element={<KhuyenMaiView />} />
          <Route path="updatekhuyenmai/:id?" element={<UpdateKhuyenMai />} />
          <Route path="order" element={<HoaDonView />}></Route>
          <Route path="review" element={<ReviewList />} />
          <Route path="voucher/:type?" element={<ListVoucher />} />
          <Route path="newvoucher/" element={<VoucherView />} />
          <Route path="updatevoucher/:type?" element={<VoucherUpdate />} />
          <Route path="voucherinfo/:id" element={<OrderConfirmation />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
