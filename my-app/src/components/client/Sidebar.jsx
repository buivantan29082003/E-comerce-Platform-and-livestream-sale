import React from "react";
import { NavLink } from "react-router-dom"; // Nhập NavLink

const Sidebar = () => {
  return (
    <div className="col-lg-2">
      <div className="row">
        <div className="col-lg-5 d-flex justify-content-center">
          <img
            src="/assets/client/images/avatar2.png"
            alt=""
            className="avatar"
          />
        </div>
        <div className="col-lg-7">
          <p className="fw-6">NamJava</p>
          <p className="d-flex">
            <img src="/assets/client/images/icon/edit.svg" alt="" />
            Sửa Hồ Sơ
          </p>
        </div>
      </div>
      <ul className="my-account-nav list-unstyled">
        <li className="nav-item">
          <button
            className="nav-link"
            data-bs-toggle="collapse"
            data-bs-target="#accountMenu"
            aria-expanded="false"
            aria-controls="accountMenu"
          >
            <img src="/assets/client/images/icon/HoSo1.svg" alt="" /> Tài khoản
            của tôi
          </button>
          <ul className="collapse list-unstyled ps-3" id="accountMenu">
            <li>
              <NavLink
                to="/client/my-account-profile"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Hồ Sơ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/client/my-account-address"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Địa Chỉ
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/client/my-account-password"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Đổi Mật Khẩu
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/client/my-account-notification"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Cài Đặt Thông Báo
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/client/my-account-privacy-settings"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Những Thiết Lập Riêng Tư
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink
            to="/client/my-account-order"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <img src="/assets/client/images/icon/HoSo2.svg" alt="" /> Đơn mua
          </NavLink>
        </li>
        <li className="nav-item">
          <button
            className="nav-link"
            data-bs-toggle="collapse"
            data-bs-target="#notificationMenu"
            aria-expanded="false"
            aria-controls="notificationMenu"
          >
            <img src="/assets/client/images/icon/HoSo3.svg" alt="" /> Thông Báo
          </button>
          <ul className="collapse list-unstyled ps-3" id="notificationMenu">
            <li>
              <NavLink
                to="/client/my-account-nof-order"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Cập Nhật Đơn Hàng
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/client/my-account-nof-promotions"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Khuyến Mãi
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/client/my-account-nof-update-modelworld"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Cập Nhật ModelWorld
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink
            to="/client/my-account-voucher"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <img src="/assets/client/images/icon/HoSo4.svg" alt="" /> Kho
            Voucher
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
