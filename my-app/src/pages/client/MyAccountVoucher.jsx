import React, { useState } from "react";
import voucherData from "../../data/json/voucherData.json";

const MyAccountVoucher = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Đếm số lượng voucher cho từng danh mục
  const voucherCounts = {
    all: voucherData.vouchers.length,
    modelworld: voucherData.vouchers.filter(
      (voucher) => voucher.category === "modelworld"
    ).length,
    shop: voucherData.vouchers.filter((voucher) => voucher.category === "shop")
      .length,
  };

  // Lọc voucher dựa trên tab hiện tại
  const filteredVouchers = voucherData.vouchers.filter((voucher) =>
    activeTab === "all" ? true : voucher.category === activeTab
  );

  return (
    <div className="col-lg-10">
      <div className="card-address">
        <div className="head-address d-flex justify-content-between align-items-center">
          <div>
            <span className="fw-6 fs-18">Kho Voucher</span>
          </div>
          <div className="d-flex">
            <p className="text-color-blue pe-3 border-dark-subtle border-end">
              Tìm thêm voucher
            </p>
            <p className="text-color-blue ps-3 pe-3 border-dark-subtle border-end">
              Xem lịch sử voucher
            </p>
            <p className="ps-3">Tìm hiểu</p>
          </div>
        </div>
        <div className="body-profile">
          <div className="addVoucher">
            <form className="m-0 p-3">
              <div className="row">
                <div className="col-2 d-flex align-items-center justify-content-end">
                  <p>Mã Voucher</p>
                </div>
                <div className="col-8">
                  <input type="text" />
                </div>
                <div className="col-2 d-flex align-items-center justify-content-start">
                  <button
                    type="button"
                    className="btn btn-outline-secondary color-white"
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="container">
            {/* Tabs */}
            <ul className="nav nav-tabs bg-white">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "all" ? "active" : ""}`}
                  onClick={() => setActiveTab("all")}
                >
                  Tất cả ({voucherCounts.all})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${
                    activeTab === "modelworld" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("modelworld")}
                >
                  ModelWorld ({voucherCounts.modelworld})
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "shop" ? "active" : ""}`}
                  onClick={() => setActiveTab("shop")}
                >
                  Shop ({voucherCounts.shop})
                </button>
              </li>
            </ul>
            {/* Nội dung các tab */}
            <div className="tab-content">
              {filteredVouchers.length > 0 ? (
                <div className="row">
                  {filteredVouchers.map((voucher) => (
                    <div key={voucher.id} className="col-md-6 mb-4">
                      <div className="voucher-item d-flex">
                        <div className="voucher-info">
                          <span className="badge bg-primary">
                            {voucher.badge}
                          </span>
                          <h5>{voucher.type}</h5>
                          <p>{voucher.discount}</p>
                          <p>
                            <strong>{voucher.description}</strong>
                          </p>
                          <p className="text-muted">
                            Có hiệu lực từ: {voucher.validFrom}
                          </p>
                          <a href="#" className="text-primary">
                            Điều kiện
                          </a>
                        </div>
                        <div className="voucher-action text-center">
                          <span className="badge bg-danger">
                            {voucher.button}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center mt-4">
                  Không có voucher nào trong tab này.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountVoucher;
