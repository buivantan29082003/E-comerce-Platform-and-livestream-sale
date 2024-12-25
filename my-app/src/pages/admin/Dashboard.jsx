import React,{useState} from 'react';
import { FaWallet, FaUsers, FaChartLine, FaBoxOpen, FaCartArrowDown, FaChartPie, FaBriefcase } from 'react-icons/fa';

// const [overview, setOverview] = useState(null);
// const [loading, setLoading] = useState(true);
// useEffect(() => {
//     // Replace with your actual API endpoint
//     fetch('http://localhost:8080/admin-api/tongquan')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             setOverview(data.overview);
//             setLoading(false);
//         })
//         .catch(error => {
//             console.error("Error fetching data:", error);
//             setLoading(false);
//         });
// }, []);
//
// if (loading) {
//     return <div>Loading...</div>;
// }
//
// if (!overview) {
//     return <div>Error loading data.</div>;
// }

const tongQuanAPI = {
    overview: {

        stats: [
            {
                title: "Tổng Doanh Thu",
                icon: "FaWallet",
                amount: "53.000.000 VND",
                description: "Tổng doanh thu từ tất cả các hoạt động mua bán"
            },
            {
                title: "Lợi Nhuận",
                icon: "FaChartLine",
                amount: "18.000.000 VND",
                description: "Lợi nhuận đạt được, chiếm 4% mỗi đơn hàng thành công"
            },
            {
                title: "Tổng Đơn Hàng",
                icon: "FaBoxOpen",
                amount: "10.000",
                description: "Tổng số đơn hàng đã xử lý và hoàn thành"
            },
            {
                title: "Sản Phẩm Đang Bán",
                icon: "FaCartArrowDown",
                amount: "300 loại",
                description: "Số lượng các sản phẩm hiện có trên sàn"
            }
        ],
        details: [
            {
                title: "Khách hàng",
                icon: "FaUsers",
                amount: "2.300",
                description: "Số lượng khách hàng trung bình"
            },
            {
                title: "Doanh nghiệp đăng ký",
                icon: "FaBriefcase",
                amount: "40",
                description: "Tăng trưởng nhanh hơn để thu hút đầu tư"
            },
            {
                title: "Thống kê hoạt động",
                icon: "FaChartLine",
                amount: "1.500",
                description: "Lượt truy cập hệ thống"
            }
        ],
        charts: [
            {
                title: "Phương thức thanh toán",
                description: "Biểu đồ tròn",
                type: "pie"
            },
            {
                title: "Số lượng truy cập qua các tháng",
                description: "Biểu đồ cột thể hiện lượng truy cập của trang",
                type: "bar"
            }
        ],
        topProduct:[
            {
                title: "Sản phẩm bán chạy",
                table: [
                    {
                        sanPham: "Mô hình xe (Loại A)",
                        luotBan: 21,
                        cuaHang: "Cửa hàng A"
                    },
                    {
                        sanPham: "Mô hình xe (Loại A)",
                        luotBan: 21,
                        cuaHang: "Cửa hàng A"
                    },
                    {
                        sanPham: "Mô hình xe (Loại A)",
                        luotBan: 21,
                        cuaHang: "Cửa hàng A"
                    }
                ]
            }
        ]
    }
};

const iconMapping = {
    FaWallet: <FaWallet className="text-4xl text-blue-600 mr-3" />,
    FaChartLine: <FaChartLine className="text-4xl text-green-600 mr-3" />,
    FaBoxOpen: <FaBoxOpen className="text-4xl text-yellow-600 mr-3" />,
    FaCartArrowDown: <FaCartArrowDown className="text-4xl text-red-600 mr-3" />,
    FaUsers: <FaUsers className="text-4xl text-blue-500 mb-4" />,
    FaBriefcase: <FaBriefcase className="text-4xl text-yellow-600 mb-4" />
};


const Dashboard = () => {
  const { overview } = tongQuanAPI;
  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full">


    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {overview.stats.map((stat, index) => (
            <div key={index} className="bg-white border p-6 rounded-lg shadow-md flex flex-col items-start transition-transform duration-300 hover:shadow-xl hover:scale-105">
                <div className="flex items-center mb-3">
                    {iconMapping[stat.icon]}
                    <span className="text-lg font-medium text-gray-800">{stat.title}</span>
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.amount}</div>
                <span className="text-sm text-gray-500 mt-2">{stat.description}</span>
            </div>
        ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {overview.details.map((detail, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center transition-shadow duration-300 hover:shadow-lg">
                {iconMapping[detail.icon]}
                <span className="text-lg font-medium text-gray-800">{detail.title}</span>
                <div className="text-2xl font-bold text-gray-900 mb-2">{detail.amount}</div>
                <span className="text-sm text-gray-500">{detail.description}</span>
            </div>
        ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
        {overview.charts.map((chart, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">{chart.title}</h3>
                <div className="h-40 flex items-center justify-center text-gray-400 bg-gray-100 rounded-lg">
                    [{chart.description}]
                </div>
            </div>
        ))}

        {overview.topProduct && overview.topProduct[0].table && (
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col mt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">{overview.topProduct[0].title}</h3>
                <div className="max-h-64 overflow-y-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left text-gray-600 font-medium">Sản phẩm</th>
                            <th className="px-4 py-2 text-center text-gray-600 font-medium">Lượt bán</th>
                            <th className="px-4 py-2 text-center text-gray-600 font-medium">Cửa hàng</th>
                        </tr>
                        </thead>
                        <tbody>
                        {overview.topProduct[0].table.map((item, i) => (
                            <tr key={i} className="border-b">
                                <td className="px-4 py-3 flex items-center">
                                    <img src="" alt="Product" className="w-10 h-10 border rounded mr-3" />
                                    {item.sanPham}
                                </td>
                                <td className="px-4 py-3 text-center text-green-600 font-semibold">{item.luotBan}</td>
                                <td className="px-4 py-3 text-center text-gray-500">{item.cuaHang}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
    </div>
</div>
  );
};

export default Dashboard;
