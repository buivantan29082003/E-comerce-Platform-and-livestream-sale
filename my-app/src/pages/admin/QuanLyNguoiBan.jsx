import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const QuanLyNguoiBan = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const sellerApi = {
    sellers: [
      {
        id: 1,
        shopName: "Shop B Shop BShop BShop BShop BShop B",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRafDa8WYXyis1Y1JwtK26IqpJ7zRK92BOOgA&s",
        address: "Cần Thơ",
        phone: "0989 861 548",
        revenue: "0",
        invoices: 150,
        status: "Inactive",
        joinDay: "11-11-2023",
      },
      {
        id: 2,
        shopName: "Shop A",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRafDa8WYXyis1Y1JwtK26IqpJ7zRK92BOOgA&s",
        address: "Cần Thơ",
        phone: "0989 861 548",
        revenue: "500000",
        invoices: 200,
        status: "Active",
        joinDay: "11-11-2023",
      },
      {
        id: 3,
        shopName: "Shop C",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRafDa8WYXyis1Y1JwtK26IqpJ7zRK92BOOgA&s",
        address: "Cần Thơ",
        phone: "0989 861 548",
        revenue: "3000",
        invoices: 200,
        status: "Active",
        joinDay: "11-11-2023",
      },
      {
        id: 4,
        shopName: "Shop D",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRafDa8WYXyis1Y1JwtK26IqpJ7zRK92BOOgA&s",
        address: "Cần Thơ",
        phone: "0989 861 548",
        revenue: "4000",
        invoices: 180,
        status: "Inactive",
        joinDay: "11-11-2023",
      },
      {
        id: 5,
        shopName: "Shop D",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRafDa8WYXyis1Y1JwtK26IqpJ7zRK92BOOgA&s",
        address: "Cần Thơ",
        phone: "0989 861 548",
        revenue: "4000",
        invoices: 180,
        status: "Inactive",
        joinDay: "11-11-2023",
      },
      {
        id: 6,
        shopName: "Shop D",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRafDa8WYXyis1Y1JwtK26IqpJ7zRK92BOOgA&s",
        address: "Cần ThƠ",
        phone: "0989 861 548",
        revenue: "4000",
        invoices: 180,
        status: "Inactive",
        joinDay: "11-11-2023",
      },
    ],
  };

  const TruyCapChiTietNguoiBan = (id) => {
    navigate(`/admin/sellersdetail/${id}`);
  };

  const filteredSellers = sellerApi.sellers.filter((seller) => {
    const matchesFilter =
      filter === "all" || seller.status.toLowerCase() === filter;
    const matchesSearch = seller.shopName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full">
      <div className="shadow-lg p-10 bg-white">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Quản lý người bán{" "}
            <span className="text-gray-600 text-sm">
              {filteredSellers.length} nhà bán hàng
            </span>
          </h2>
          <div className="flex gap-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
            >
              <option value="all">Tất cả cửa hàng</option>
              <option value="active">Cửa hàng còn hoạt động</option>
              <option value="inactive">Cửa hàng ngưng hoạt động</option>
            </select>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm tên cửa hàng..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto rounded-lg max-h-[600px]">
          {filteredSellers.map((seller) => (
            <div
              key={seller.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center text-center"
            >
              <img
                className="w-24 h-24 rounded-full"
                src={seller.image}
                alt={seller.shopName}
              />
              <h3
                className="text-2xl font-semibold text-gray-800 mt-2 line-clamp-1"
                title={seller.shopName}
              >
                {seller.shopName}
              </h3>
              <p className="w-full border-b py-2">
                {seller.phone} / {seller.address}
              </p>
              <div className="grid grid-cols-3 gap-2 py-2">
                <div>
                  <p className="text-gray-800 font-medium">{seller.revenue}</p>
                  <p className="text-xs text-gray-400">Doanh thu</p>
                </div>
                <div className="border-x">
                  <p className="text-gray-800 font-medium">{seller.invoices}</p>
                  <p className="text-xs text-gray-400">Hóa đơn</p>
                </div>
                <div>
                  <p className="text-gray-800 font-medium">{seller.joinDay}</p>
                  <p className="text-xs text-gray-400">Ngày tham gia</p>
                </div>
              </div>
              <div className="text-center mb-2">
                {seller.status === "Active" ? (
                  <span className="text-green-700 flex items-center justify-center bg-green-100 px-4 py-2 rounded-full text-sm font-medium">
                    <FaCheckCircle className="mr-2" /> Hoạt động
                  </span>
                ) : (
                  <span className="text-red-700 flex items-center justify-center bg-red-100 px-4 py-2 rounded-full text-sm font-medium">
                    <FaTimesCircle className="mr-2" /> Ngưng hoạt động
                  </span>
                )}
              </div>
              <button
                onClick={() => TruyCapChiTietNguoiBan(seller.id)}
                className="text-sm text-blue-600 hover:underline"
              >
                Xem cửa hàng
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuanLyNguoiBan;
