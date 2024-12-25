import React, { useState } from "react";
import "../../assets/admin/css/admin.css";

const VoucherAdmin = () => {
  const [activeTab, setActiveTab] = useState({
    modelworld: "all",
    shop: "all",
  });

  const showTab = (type, tab) => {
    setActiveTab((prev) => ({ ...prev, [type]: tab }));
  };

  return (
    <div className="bg-gray-100">
      {/* Create Voucher Section */}
      <section className="create-voucher-now py-8">
        <div className="container mx-auto bg-white grid grid-cols-12 gap-4 p-6">
          {/* Left Content Column */}
          <div className="col-span-12 md:col-span-4">
            <h1 className="text-xl font-semibold">
              Tạo ngay Voucher để tăng đơn hàng cho Shop của bạn!
            </h1>
            <p className="mt-2 text-gray-700">
              Cơ hội tăng đến <span className="font-bold">43%</span> đơn hàng và
              <span className="font-bold">28%</span> doanh thu khi tạo Voucher
              ưu đãi cho Khách hàng.
            </p>
            <a
              href="#"
              className="mt-4 inline-block btn-color-admin text-white py-2 px-6 rounded-md"
            >
              Tạo Voucher ngay!
            </a>
          </div>
          {/* Right Image Column */}
          <div className="col-span-12 md:col-span-8">
            <img
              src="../../../public/assets/admin/img/Bg-voucher.jpg"
              alt="Voucher Image"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Voucher Creation Options Section */}
      <section className="create-voucher-options">
        <div className="container mx-auto bg-white p-4">
          <h2 className="text-xl font-semibold mb-4">Tạo Voucher</h2>
          <p className="text-gray-600 mb-6">
            Tạo Mã giảm giá dành cho Shop hoặc Mã giảm giá phù hợp với kênh và
            đối tượng người mua.
            <a href="#" className="btn-color-admin">
              Tìm hiểu thêm
            </a>
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold">Voucher toàn sàn</h3>
              <p className="text-gray-600 mt-1 mb-3">
                Voucher áp dụng cho tất cả sản phẩm thuộc sàn ModelWorld.
              </p>
              <button className="btn-color-admin text-white py-2 px-4 rounded">
                Tạo
              </button>
            </div>
            <div className="bg-white p-4 rounded-md shadow">
              <h3 className="text-lg font-semibold">Voucher mặc hàng</h3>
              <p className="text-gray-600 mt-1 mb-3">
                Voucher chỉ áp dụng cho nhóm sản phẩm nhất định thuộc sàn
                ModelWorld.
              </p>
              <button className="btn-color-admin text-white py-2 px-4 rounded">
                Tạo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Voucher List Section */}
      <VoucherList
        title="Danh sách mã giảm giá phát hành bởi ModelWorld"
        type="modelworld"
        activeTab={activeTab}
        showTab={showTab}
      />
      <VoucherList
        title="Danh sách mã giảm giá phát hành bởi Shop"
        type="shop"
        activeTab={activeTab}
        showTab={showTab}
      />
    </div>
  );
};

const VoucherList = ({ title, type, activeTab, showTab }) => (
  <section className={`list-voucher-${type} rounded-md  mt-8`}>
    <div className="container bg-white mx-auto">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          {["all", "ongoing", "upcoming", "expired"].map((tab) => (
            <button
              key={tab}
              onClick={() => showTab(type, tab)}
              className={`tab-button ${
                activeTab[type] === tab ? "active" : ""
              }`}
            >
              {tab === "all"
                ? "Tất cả"
                : tab === "ongoing"
                ? "Đang diễn ra"
                : tab === "upcoming"
                ? "Sắp diễn ra"
                : "Đã kết thúc"}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`tab-content ${activeTab[type] === "all" ? "" : "hidden"}`}
      >
        <VoucherTable />
      </div>
    </div>
  </section>
);

const VoucherTable = () => (
  <div className="overflow-auto">
    <table className="min-w-full bg-white border">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="py-3 px-4 border">Tên Voucher / Mã Voucher</th>
          <th className="py-3 px-4 border">Loại mã</th>
          <th className="py-3 px-4 border">Sản phẩm áp dụng</th>
          <th className="py-3 px-4 border">Người mua mục tiêu</th>
          <th className="py-3 px-4 border">Giảm giá</th>
          <th className="py-3 px-4 border">Tổng lượt sử dụng</th>
          <th className="py-3 px-4 border">Đã dùng</th>
          <th className="py-3 px-4 border">Thời gian lưu Mã giảm giá</th>
          <th className="py-3 px-4 border">Thao tác</th>
        </tr>
      </thead>
      <tbody className="text-center text-gray-600">
        <tr>
          <td className="py-4 px-4 border" colSpan="9">
            Không có Mã giảm giá nào
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default VoucherAdmin;
