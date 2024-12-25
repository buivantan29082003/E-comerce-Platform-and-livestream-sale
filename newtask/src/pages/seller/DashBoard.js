import { BarChart, PieChart } from "@mui/x-charts";

import React, { useEffect, useState } from "react";
import api from "../../config/APISeller";
// import api from "../../../config/APISeller";
function DashboardMain() {
  const [data, setData] = useState({
    OrderSoLuong: {},
    productTopSale: [],
  });

  const [uData, setUpdata] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [pData, setPpdata] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [IData, setIpdata] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const xLabels = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  useEffect(() => {
    api
      .get("/report")
      .then((v) => v.data)
      .then((v) => {
        const grouped = v.month.reduce((acc, curr) => {
          const key = curr[2];
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(curr);
          return acc;
        }, {});
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].forEach((v) => {
          const a = grouped["" + v];
          if (a != null) {
            a.forEach((t) => {
              if (t[1] == 6) {
                uData[v] = t[0];
              } else if (t[1] == 7) {
                pData[v] = t[0];
              } else {
                IData[v] = t[0];
              }
            });
          }
        });
        setData(v);
      })
      .catch((error) => {
        alert("Có lỗi xảy ra");
      });
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-2 ml-2">
      <div className="xl:col-span-2 space-y-4 ">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Tổng quan cửa hàng
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
            {[
              {
                label: "Chờ chuẩn bị hàng",
                value: data.OrderSoLuong["2"] || 0,
                icon: "🛒",
                color: " text-gray-600",
              },
              {
                label: "Đã giao đơn vị vận chuyển",
                value: data.OrderSoLuong["3"] || 0,
                icon: "🚚",
                color: " text-gray-600",
              },
              {
                label: "Đang giao hàng",
                value: data.OrderSoLuong["4"] || 0,
                icon: "📦",
                color: " text-gray-600",
              },
              {
                label: "Đã giao hàng",
                value: data.OrderSoLuong["5"] || 0,
                icon: "✔️",
                color: " text-gray-600",
              },
              {
                label: "Giao thành công",
                value: data.OrderSoLuong["6"] || 0,
                icon: "✅",
                color: " text-gray-600",
              },
              {
                label: "Giao thất bại",
                value: data.OrderSoLuong["7"] || 0,
                icon: "❌",
                color: " text-gray-600",
              },
              {
                label: "Đơn hủy",
                value: data.OrderSoLuong["8"] || 0,
                icon: "🛑",
                color: " text-gray-600",
              },
              {
                label: "Sản phẩm hết hàng",
                value: data.sanPhamHetHang || 0,
                icon: "🔔",
                color: " text-gray-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center p-4 rounded-lg ${item.color} shadow-sm hover:shadow-md transition-shadow`}
              >
                <div className="text-4xl">{item.icon}</div>
                <span className="text-3xl font-bold mt-2">{item.value}</span>
                <span className="text-sm text-gray-700 mt-1">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phần kênh người bán */}
        <div class="bg-white shadow-lg rounded-lg p-6 max-w-screen-xl mx-auto">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Top sản phẩm bán chạy</h2>
            <p class="text-gray-600 text-sm mb-6">
              Các sản phẩm có lượt bán cao nhất shop
            </p>
          </div>

          <div class="border p-6 rounded-lg mb-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 lg:grid-cols-4 gap-6">
              {data.productTopSale.map((v) => {
                return (
                  <div class="bg-white shadow-md rounded-sm overflow-hidden col-span-6 md:col-span-3 lg:col-span-1">
                    <div class="relative">
                      <img
                        src={v[2]}
                        alt="Nike Air MX Super 2500 - Red"
                        class="w-full h-30 object-cover"
                      />
                    </div>
                    <div class="p-4">
                      <h3 class="text-sm truncate font-semibold">{v[1]}</h3>
                      <p class="mt-2 text-gray-600">
                        <span class="text-xs text-blue-500 font-bold">
                          Tổng đơn: {v[6]}{" "}
                        </span>
                        <br />
                        <span class="text-gray-500 text-xs">
                          Số đơn : {v[3]}{" "}
                        </span>
                        <br />
                        <span class="text-gray-500 text-xs">
                          Số người mua: {v[4]}
                        </span>
                        <br />
                        <span class="text-gray-500 text-xs">
                          Số bán ra: {v[5]}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <DoanhThu />

        {/* Phân Tích Bán Hàng */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Phân Tích Bán Hàng</h2>
          </div>
          <p className="text-sm text-gray-600">
            Tổng quan dữ liệu của shop đối với đơn hàng đã xác nhận
          </p>
          <div className="mt-4 ">
            {/* Biểu đồ */}
            <div className="w-2/2 flex flex-col ">
              <BarChart
                width={500}
                height={300}
                series={[
                  { data: pData, label: "Thành công", id: "Thành công" },
                  { data: uData, label: "Thất bại", id: "Thất bại" },
                  { data: IData, label: "Hủy", id: "Hủy" },
                ]}
                xAxis={[{ data: xLabels, scaleType: "band" }]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* */}
      <div className="xl:col-span-1 space-y-4">
        {/* Hình ảnh */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          Đánh giá của shop
          <img
            src="https://files.oaiusercontent.com/file-zZErywcQdMLveaaZCaOmYMDh?se=2024-10-16T04%3A31%3A31Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Dd38e9281-4b17-44b8-9e1b-958770cdea6d.webp&sig=Y3/LDMr23HSqmHUxyMlur1QYJyHDybXYGtiqadK6j7U%3D"
            alt=""
            className="w-full  rounded-lg shadow"
          />
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "Số lược đã dùng" },
                  { id: 1, value: 15, label: "" },
                  { id: 2, value: 20, label: "series C" },
                ],
              },
            ]}
            width={400}
            height={200}
          />
        </div>

        {/* Thông Báo */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Thông Báo</h2>
          </div>
          <hr />
          <div className="mt-4 text-sm space-y-4">
            {/* Thông Báo 1 */}
            <div className="border-b pb-3">
              <p className="font-bold text-red-600">🚀 Sự Kiện Đặc Biệt</p>
              <p>
                Model Toys Sale Week! Hàng trăm mô hình giảm giá đến <b>50%</b>.
                Cơ hội để sở hữu những mẫu mô hình HOT nhất năm nay!
              </p>
              <p className="text-gray-500 text-xs">Hôm Nay 10:00</p>
            </div>
            {/* Thông Báo 2 */}
            <div className="border-b pb-3">
              <p className="font-bold text-blue-600">
                🎉 Ra Mắt Bộ Sưu Tập Mới
              </p>
              <p>
                Đừng bỏ lỡ bộ sưu tập **Gundam Infinity Series** vừa cập bến
                Model! Số lượng có hạn.
              </p>
              <p className="text-gray-500 text-xs">Hôm Qua 18:00</p>
            </div>
            {/* Thông Báo 3 */}
            <div>
              <p className="font-bold text-green-600">
                📦Hỗ Trợ Giao Hàng Miễn Phí
              </p>
              <p>
                Chương trình hỗ trợ giao hàng miễn phí cho đơn hàng trên{" "}
                <b>500k</b>. Áp dụng toàn quốc đến hết tháng 12 này!
              </p>
              <p className="text-gray-500 text-xs">2 Ngày Trước</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardMain;

const DoanhThu = React.memo(() => {
  const [year, setYear] = useState(2024);
  const [flag, setFlag] = useState(0);
  useEffect(() => {
    api
      .get("/reportorder?year=" + year)
      .then((v) => v.data)
      .then((v) => {
        v.forEach((v, index) => {
          data.soDon[index] = v[1];
          data.tongTien[index] = v[2];
          data.tongSanPham[index] = v[3];
          data.taiKhoan[index] = v[4];
          data.donTrungBinh[index] = v[5];
          data.vouchershop[index] = v[6];
        });
        setFlag(flag + 1);
      });
  }, [year]);
  const [data, setData] = useState({
    soDon: Array(12).fill(0),
    tongTien: Array(12).fill(0),
    tongSanPham: Array(12).fill(0),
    taiKhoan: Array(12).fill(0),
    donTrungBinh: Array(12).fill(0),
    vouchershop: Array(12).fill(0),
  });
  const xLabels = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  const currentYear = new Date().getFullYear();

  // Tạo một mảng các năm từ 2020 đến currentYear
  const years = Array.from(
    { length: currentYear - 2020 + 1 },
    (_, index) => 2020 + index
  );
  return (
    <>
      {/* Phần hiểu quả hoạt động */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* Tiêu đề và liên kết */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Doanh thu của shop</h2>
          {/*
           */}
          <div className="flex">
            <span>Chọn năm</span>
            <select onChange={(e) => setYear(e.target.value)}>
              {years.map((v) => {
                return <option value={v}>{v}</option>;
              })}
            </select>
          </div>
        </div>
        <BarChart
          width={600}
          height={300}
          series={[
            { data: data.soDon, label: "Số đơn", id: "Thành công" },
            { data: data.tongTien, label: "Tổng tiền", id: "Thành công1" },
            {
              data: data.tongSanPham,
              label: "Số lượng sản phẩm",
              id: "Thành công2",
            },
            {
              data: data.taiKhoan,
              label: "Số người đã mua",
              id: "Thành công3",
            },
            {
              data: data.donTrungBinh,
              label: "Giá trị đơn trung bình",
              id: "Thành công4",
            },
            {
              data: data.vouchershop,
              label: "Tiền trừ voucher shop",
              id: "Thất bại5",
            },
          ]}
          xAxis={[{ data: xLabels, scaleType: "band" }]}
        />
      </div>
    </>
  );
});

const ThongKeSanPham = React.memo(() => {
  const [year, setYear] = useState(2024);
  const [flag, setFlag] = useState(0);
  useEffect(() => {
    api
      .get("/reportorder?year=" + year)
      .then((v) => v.data)
      .then((v) => {
        v.forEach((v, index) => {
          data.soDon[index] = v[1];
          data.tongTien[index] = v[2];
          data.tongSanPham[index] = v[3];
          data.taiKhoan[index] = v[4];
          data.donTrungBinh[index] = v[5];
          data.vouchershop[index] = v[6];
        });
        setFlag(flag + 1);
      });
  }, [year]);
  const [data, setData] = useState({
    soDon: Array(12).fill(0),
    tongTien: Array(12).fill(0),
    tongSanPham: Array(12).fill(0),
    taiKhoan: Array(12).fill(0),
    donTrungBinh: Array(12).fill(0),
    vouchershop: Array(12).fill(0),
  });
  const xLabels = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - 2020 + 1 },
    (_, index) => 2020 + index
  );
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Doanh thu của cửa hàng</h2>
          {/*
           */}
          <div className="flex">
            <span>Chọn năm</span>
            <select onChange={(e) => setYear(e.target.value)}>
              {years.map((v) => {
                return <option value={v}>{v}</option>;
              })}
            </select>
          </div>
        </div>
        <BarChart
          className=""
          width={600}
          height={300}
          series={[
            { data: data.soDon, label: "Số đơn", id: "Thành công" },
            { data: data.tongTien, label: "Tổng tiền", id: "Thành công1" },
            {
              data: data.tongSanPham,
              label: "Số lượng sản phẩm",
              id: "Thành công2",
            },
            {
              data: data.taiKhoan,
              label: "Số người đã mua",
              id: "Thành công3",
            },
            {
              data: data.donTrungBinh,
              label: "Giá trị đơn trung bình",
              id: "Thành công4",
            },
            {
              data: data.vouchershop,
              label: "Tiền trừ voucher shop",
              id: "Thất bại5",
            },
          ]}
          xAxis={[{ data: xLabels, scaleType: "band" }]}
        />
      </div>
    </>
  );
});
