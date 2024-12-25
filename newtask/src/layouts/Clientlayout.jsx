import React from 'react';
import Header from '../components/client/Header';
import Footer from '../components/client/Footer';
// import '../index.css';
// import React from "react";
import "../assets/client/css/bootstrap.min.css";
import "../assets/client/css/bootstrap-select.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import Header from "../components/client/Header";
// import Footer from "../components/client/Footer";
import "../assets/client/css/bootstrap.min.css";
import "../assets/client/css/bootstrap-select.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../index.css";
// import "../assets/client/css/style.css";

const ClientLayout = ({ children }) => {
  return (
    <div className="client-layout-wrapper">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="client-content">
        {children}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ClientLayout;
