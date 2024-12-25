import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/client/HomePage";
import ProductPage from "../pages/client/ProductPage";
import ClientLayout from "../layouts/Clientlayout";


export const ClientRoutes = () => (
  <Routes>
    <Route path="/" element={<ClientLayout><HomePage /></ClientLayout>} />
    <Route path="admin" element={<ClientLayout><ProductPage /></ClientLayout>} />
  </Routes>
);
