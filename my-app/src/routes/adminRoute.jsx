import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard"; // Đường dẫn tới Dashboard
import Profile from "../pages/client/MyAccountAddress"; // Đường dẫn tới Profile
import Categories from "../pages/admin/Categories"; // Đường dẫn tới Categories
import Login from "../components/admin/Login"; // Đường dẫn tới Login
import AdminLayout from "../layouts/Adminlayout"; // Đường dẫn tới AdminLayout
import QuanLyNguoiBan from "../pages/admin/QuanLyNguoiBan";
import QuanLyChiTietNguoiBan from "../pages/admin/QuanLyChiTietNguoiBan";
import VoucherAdmin from "../pages/admin/VoucherAdmin";
export const AdminRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <AdminLayout>
          <Dashboard />
        </AdminLayout>
      }
    />
    <Route path="login" element={<Login />} />

    <Route
      path="profile"
      element={
        <AdminLayout>
          <Profile />
        </AdminLayout>
      }
    />
    <Route
      path="/voucher"
      element={
        <AdminLayout>
          <VoucherAdmin />
        </AdminLayout>
      }
    />
    <Route
      path="sellers"
      element={
        <AdminLayout>
          <QuanLyNguoiBan />
        </AdminLayout>
      }
    />
    <Route
      path="sellersdetail/:id"
      element={
        <AdminLayout>
          <QuanLyChiTietNguoiBan />
        </AdminLayout>
      }
    />

    {/* Thêm các Route khác ở đây */}
  </Routes>
);
