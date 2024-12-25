import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ClientLayout from "../layouts/Clientlayout";
import HomePage from "../pages/client/HomePage";
import Sidebar from "../components/client/Sidebar";
import MyAccountProfile from "../pages/client/MyAccountProfile";
import MyAccountOrder from "../pages/client/MyAccountOrder";
import MyAccountAddress from "../pages/client/MyAccountAddress";
import MyAccountPassword from "../pages/client/MyAccountPassword";
import MyAccountNotification from "../pages/client/MyAccountNotification";
import MyAccountPrivacySettings from "../pages/client/MyAccountPrivacySettings";
import MyAccountNofOder from "../pages/client/MyAccountNofOder";
import MyAccountNofPromotion from "../pages/client/MyAccountNofPromotion";
import MyAccountNofUpdateModelworld from "../pages/client/MyAccountNofUpdateModelworld";
import MyAccountVoucher from "../pages/client/MyAccountVoucher";
import DetailProduct from "../pages/client/DetailProduct";
import test from "../pages/client/test";
export const ClientRoutes = () => (
  <ClientLayout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<DetailProduct />} />
      <Route path="/test" element={<test />} />
      {/* Các route có Sidebar */}
      <Route
        path="/client/*"
        element={
          <>
            <Sidebar /> {/* Giữ Sidebar ở đây */}
            <Routes>
              <Route path="my-account-profile" element={<MyAccountProfile />} />
              <Route path="my-account-order" element={<MyAccountOrder />} />
              <Route path="my-account-address" element={<MyAccountAddress />} />
              <Route
                path="my-account-password"
                element={<MyAccountPassword />}
              />
              <Route
                path="my-account-notification"
                element={<MyAccountNotification />}
              />
              <Route
                path="my-account-privacy-settings"
                element={<MyAccountPrivacySettings />}
              />
              <Route
                path="my-account-nof-order"
                element={<MyAccountNofOder />}
              />
              <Route
                path="my-account-nof-promotions"
                element={<MyAccountNofPromotion />}
              />
              <Route
                path="my-account-nof-Update-Modelworld"
                element={<MyAccountNofUpdateModelworld />}
              />
              <Route path="my-account-voucher" element={<MyAccountVoucher />} />
              {/* Thêm các Route khác nếu cần */}
              <Route
                path="*"
                element={
                  <div className="col-lg-10">
                    <h2>Page Not Found</h2>
                  </div>
                }
              />

              {/* Route chi tiết sản phẩm */}
            </Routes>
          </>
        }
      />
    </Routes>
  </ClientLayout>
);
