// import './App.css';
import { ClientRoutes } from './routes/clientRoute';
// import { AdminRoutes } from './routes/adminRoute';
// import Login from './components/Login';
// import Register from './components/Register';
// import Cart from './pages/client/Cart';
// import Checkout from './pages/client/Checkout';
// import { CartProvider } from './pages/client/CartContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './pages/client/HomePage';
// import ProductDetails from './pages/client/ProductDetails';
// import ThankYouPage from './pages/client/ThankYouPage';
// import SellerRegister from './pages/client/SellerRegister';
// import SellerDashboard from './pages/seller/SellerDashboard';
// import Sidebar from './pages/seller/Sidebar';
// import MainSeller from './pages/seller/MainSeller';
// import ViewProduct from './pages/seller/viewproduct/ViewProduct';
// import ProductTable from './pages/seller/viewproduct/productTable';
// import CUProduct from './pages/seller/product/CUproduct';
// import KhuyenMaiView from './pages/seller/KhuyenMai/KhuyenMaiView';
// import CUKhuyenMai from './pages/seller/KhuyenMai/CUKhuyenMai';
// import HoaDonView from './pages/seller/hoaDon/HoaDonView';
// import ListVoucher from './pages/seller/voucher/ListVoucher';
// import VoucherView from './pages/seller/voucher/VoucherView';
// import DashboardMain from './pages/seller/DashBoard';
// import VoucherUpdate from './pages/seller/voucher/VoucherUpdate';
// import UpdateKhuyenMai from './pages/seller/KhuyenMai/UpdateKhuyenMai';
// import UpdateProduct from './pages/seller/product/UpdateProduct';
// import ChoThanhToan from './pages/seller/hoaDon/ChoThanhToan';
// import ChuanBiHang from './pages/seller/hoaDon/hoaDonState/HoaDonChoLay';
// import DonHuy from './pages/seller/hoaDon/DonHuy';
// import OrderDefault from './pages/seller/hoaDon/OrderDefault';
// import MainClient from './pages/client/AuthClient';
// import MyAccountOrder from './pages/client/OrderManage.js/Order';
// import OrderDetailUser from './pages/client/OrderManage.js/OrderDetail';
// import DetailProduct from './pages/client/product/ProductDetail';
// import HostLive from './pages/Live/HostLive';
// import HomePage from './pages/client/HomePage';
// import HomePages from './pages/client/HomePage';
// import HomePage from './pages/client/Home';
// import HomePages from './pages/client/HomePage';
// import Checkout from './pages/client/Checkout';
// import DoanhThuManage from './pages/test/DoanhThuManage';
// import BaoCaoThuNhap from './pages/test/DoanhThuManage';
// import OrderDetail from './pages/seller/hoaDon/OrderDetail';
// import OrderConfirmation from './pages/seller/voucher/VoucherDetail';
// import ReviewList from './pages/seller/Rating';
// import WatchLive from './pages/Live/Rename';
// import ClientLive from './pages/Live/ClientLive';
// import UpdateShop from './pages/seller/shopInfo/UpdateShop';
// import UpdateAddressShop from './pages/seller/shopInfo/UpdateAddressShop';
// import CreateLive from './pages/seller/live/CreateLive';
// import ListLive from './pages/seller/live/ListLive';
// import SellerLive from './pages/Live/SellerLive';
// import CreateShop from './pages/seller/CreateShop';
import { Toaster } from 'react-hot-toast';
// import RegisterShop from './pages/seller/RegisterShop';
// import LoginForm from './components/Login';
// import RegisterForm from './components/Register';
// import loadings from "../src/utils/images/loading.gif"
import { createContext, useEffect, useState } from 'react';
import RouteSeller from './pages/seller/RouteSeller';
import WatchLive from './pages/Live/Rename';
// import SellerRoutes from './pages/seller/SellerRoute';
export const AppContext = createContext
();
function App(props) {
    const [loading, setLoading] = useState(true); // State loading
    const setFloadingPage=()=>{
        setLoading(true);
        setTimeout(()=>{
          setLoading(false)
        },300)
      }
      useEffect(()=>{
        setFloadingPage()
      },[])   
    return (
        <AppContext.Provider value={{setFloadingPage}}>
            <div style={{position:"relative"}} className="flex items-center justify-center">
            {loading && (
              <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center" style={{zIndex:"99999"}}>
                <div className="text-center">
                  <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16 mx-auto mb-4"></div>
                </div>
              </div>
            )}
            <Toaster/>
            <RouteSeller/>
            <Routes>
            <Route path="/client/live/:liveId" element={<WatchLive />} />
            </Routes>
            </div>
        </AppContext.Provider>
    );
}
export default App;
