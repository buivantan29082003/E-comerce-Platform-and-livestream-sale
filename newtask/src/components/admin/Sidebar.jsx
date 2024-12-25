import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
    return (
        <aside id="layout-menu" className={`layout-menu menu-vertical menu bg-menu-theme ${isOpen ? 'open' : ''} d-md-block`}>
            <div className="app-brand demo">
                <Link to="/admin" className="app-brand-link text-decoration-none">
                    <span className="app-brand-text demo menu-text fw-semibold ms-2">NHĐT</span>
                </Link>
            </div>
            <div className="menu-inner-shadow" />
            <li className="menu-header fw-medium">
                <span className="menu-header-text">Quản lí</span>
            </li>
            <ul className="menu-inner py-1">
                <li className="menu-item active open">
                    <a className="menu-link menu-toggle">
                        <i className="menu-icon tf-icons ri-home-smile-line" />
                        <span data-i18n="Dashboards">Thống kê</span>
                    </a>
                </li>

                <li className="menu-item">
                    <a href="#" className="menu-link menu-toggle text-decoration-none">
                        <i className="menu-icon tf-icons ri-layout-2-line" />
                        <div data-i18n="Layouts">Danh mục</div>
                    </a>
                </li>

                <li className="menu-item">
                    <a href="#" className="menu-link menu-toggle text-decoration-none">
                        <i className="menu-icon tf-icons ri-layout-left-line"></i>
                        <div data-i18n="">Danh mục</div>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#" className="menu-link menu-toggle text-decoration-none">
                        <i className="menu-icon tf-icons ri-shield-keyhole-line" />
                        <div data-i18n="Authentications">Danh mục</div>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#" className="menu-link menu-toggle text-decoration-none">
                        <i className="menu-icon tf-icons ri-box-3-line" />
                        <div data-i18n="Misc">Danh mục</div>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#" className="menu-link menu-toggle text-decoration-none">
                        <i className="menu-icon tf-icons ri-toggle-line" />
                        <div data-i18n="User interface">Danh mục</div>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#" className="menu-link menu-toggle text-decoration-none">
                        <i className="menu-icon tf-icons ri-box-3-line" />
                        <div data-i18n="Extended UI">Danh mục</div>
                    </a>
                </li>
                <li className="menu-header fw-medium mt-4">
                    <span className="menu-header-text">Quản trị viên</span>
                </li>
                <li className="menu-item">
                    <a href="#" className="menu-link menu-toggle text-decoration-none">
                        <i className="menu-icon tf-icons ri-user-line" />
                        <div data-i18n="Form Elements">Tài khoản</div>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="#" className="menu-link menu-toggle text-decoration-none">
                        <i className="menu-icon tf-icons ri-box-3-line" />
                        <div data-i18n="Form Layouts">Phân quyền</div>
                    </a>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
