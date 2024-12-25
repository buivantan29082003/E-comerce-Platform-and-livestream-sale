import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/admin/Dashboard';
import  Categories from '../pages/admin/Categories';
import Login from '../components/admin/Login';
import AdminLayout from '../layouts/Adminlayout';


export const AdminRoutes = () => (
    <Routes>
        <Route path="/" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="login" element={<Login />} />
        <Route path="category" element={<AdminLayout><Categories /></AdminLayout>} />
    </Routes>
);
