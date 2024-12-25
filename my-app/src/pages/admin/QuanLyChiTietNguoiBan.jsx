import { useState } from 'react';
import { MdStore } from 'react-icons/md';
import { HiOutlineLocationMarker, HiOutlineMail } from 'react-icons/hi';
import { AiOutlinePhone } from 'react-icons/ai';
import { FaMapMarkerAlt, FaListOl,FaBoxOpen,FaShoppingCart, FaCalendarAlt, FaMoneyBillWave, FaCreditCard, FaInfoCircle, FaIndustry, FaFileContract, FaBuilding, FaPassport,FaSearch, FaBox, FaStar } from 'react-icons/fa';

function QuanLyChiTietNguoiBan() {
    const [searchTerm, setSearchTerm] = useState('');

// call API
    /*
*  const [ordersDetail, setOrdersDetail] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect((id) => {
        const fetchOrdersDetail = async () => {
            try {
                const response = await fetch('http://localhost:8080/admin-api/quanLyNguoiban/:{id}');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setSellers(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchOrdersDetail();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
* */

    //Data dạng Json
    const chiTietNguoiBanAPI = {
        "shopDetails": {
            "tenShop": "Cửa Hàng Siêu Xe 2002",
            "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRafDa8WYXyis1Y1JwtK26IqpJ7zRK92BOOgA&s",
            "moTa": "Cửa hàng chuyên bán các sản phẩm mô hình siêu xe,Cửa hàng chuyên bán các sản phẩm mô hình siêu xe.",
            "Account_id": 1,
            "DiaChiShop": "Ô Môn, Cần Thơ",
            "SoDienThoai": "0989 861 548",
            "MaSo": "ABC123",
            "HoVaTen": "Nguyễn Hữu Phúc",
            "HinhChupThe": "https://via.placeholder.com/100",
            "TenCongTy": "Công Ty TNHH Cửa Hàng Siêu Xe 2002",
            "DiaChiDK": "Số 1, Đường 3/2, Quận Ninh Kèu, Cần Thơ",
            "EmailNhanHD": "phucnh@fpt.edu.com",
            "MaSoThue": "0123456789",
            "GiayPhepKinhDoanh": "GP12345",
            "LoaiKinhDoanh": "Mô hình"
        },
        "products": [
            {
                "id": 1,
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuaH5ukSix_P7hVjDiEupPA9JR-6sY_Hlmpg&s",
                "luotBan": 111,
                "ten": "Mô Hình Lamborghini Aventador Mô Hình Lamborghini Aventador Mô Hình Lamborghini Aventador",
                "gia": "1,200,000 VND",
                "moTa": "Mô hình chi tiết với tỷ lệ 1:18",
                "soLuong": 20
            },
            {
                "id": 2,
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuaH5ukSix_P7hVjDiEupPA9JR-6sY_Hlmpg&s",
                "luotBan": 31,
                "ten": "Mô Hình Ferrari F8",
                "gia": "1,500,000 VND",
                "moTa": "Thiết kế tỉ mỉ, hoàn hảo cho bộ sưu tập",
                "soLuong": 15
            },
            {
                "id": 3,
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuaH5ukSix_P7hVjDiEupPA9JR-6sY_Hlmpg&s",
                "luotBan": 23,
                "ten": "Mô Hình Porsche 911",
                "gia": "1,300,000 VND",
                "moTa": "Phiên bản giới hạn, chất lượng cao",
                "soLuong": 10
            },
            {
                "id": 4,
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuaH5ukSix_P7hVjDiEupPA9JR-6sY_Hlmpg&s",
                "luotBan": 11,
                "ten": "Mô Hình Porsche 911",
                "gia": "1,300,000 VND",
                "moTa": "Phiên bản giới hạn, chất lượng cao",
                "soLuong": 10
            },
            {
                "id": 5,
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuaH5ukSix_P7hVjDiEupPA9JR-6sY_Hlmpg&s",
                "luotBan": 1,
                "ten": "Mô Hình Porsche 911",
                "gia": "1,300,000 VND",
                "moTa": "Phiên bản giới hạn, chất lượng cao",
                "soLuong": 10
            }
        ],
        "orders": [
            {
                "id": 1,
                "khachHang": "Nguyễn Hữu Phúc",
                "tenSanPham": "Mô Hình Porsche 911 Mô Hình Porsche 911 Mô Hình Porsche 911",
                "phuongThucThanhToan": "Chuyển khoản",
                "ngayDat": "2023-10-01",
                "tongTien": "1,200,000 VND",
                "trangThai": "Đã giao/Hoàn thành",
                "soLuong": 1
            },
            {
                "id": 2,
                "khachHang": "Tần Như Như",
                "tenSanPham": "Mô Hình Porsche 911, Hình Porsche 911 Hình Porsche 911 Hình Porsche 911",
                "phuongThucThanhToan": "Chuyển khoản",
                "ngayDat": "2023-10-15",
                "tongTien": "1,500,000 VND",
                "trangThai": "Đang xử lý",
                "soLuong": 1
            },
            {
                "id": 3,
                "khachHang": "Phạm Minh Tân",
                "tenSanPham": "Mô Hình Porsche 911",
                "phuongThucThanhToan": "Chuyển khoản",
                "ngayDat": "2023-10-20",
                "tongTien": "1,300,000 VND",
                "trangThai": "Chờ xác nhận",
                "soLuong": 1
            },
            {
                "id": 4,
                "khachHang": "Phạm Minh Tân",
                "tenSanPham": "Mô Hình Porsche 911",
                "phuongThucThanhToan": "Chuyển khoản",
                "ngayDat": "2023-10-20",
                "tongTien": "1,300,000 VND",
                "trangThai": "Chờ xác nhận",
                "soLuong": 1
            },
            ]}






    // const nguoiBan = {
    //     tenShop: "Cửa Hàng Siêu Xe 2002",
    //     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRafDa8WYXyis1Y1JwtK26IqpJ7zRK92BOOgA&s',
    //     moTa: "Cửa hàng chuyên bán các sản phẩm mô hình siêu xe,Cửa hàng chuyên bán các sản phẩm mô hình siêu xe.",
    //     Account_id: 1,
    //     DiaChiShop: "Ô Môn, Cần Thơ",
    //     SoDienThoai: "0989 861 548",
    //     MaSo: "ABC123",
    //     HoVaTen: "Nguyễn Hữu Phúc",
    //     HinhChupThe: "https://via.placeholder.com/100",
    //     TenCongTy: "Công Ty TNHH Cửa Hàng Siêu Xe 2002",
    //     DiaChiDK: "Số 1, Đường 3/2, Quận Ninh Kều, Cần Thơ",
    //     EmailNhanHD: "phucnh@fpt.edu.com",
    //     MaSoThue: "0123456789",
    //     GiayPhepKinhDoanh: "GP12345",
    //     LoaiKinhDoanh: "Mô hình",
    // }
    //
    // const sanPham = [
    //     { id: 1, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuaH5ukSix_P7hVjDiEupPA9JR-6sY_Hlmpg&s', luotBan: 111, ten: "Mô Hình Lamborghini Aventador Mô Hình Lamborghini Aventador Mô Hình Lamborghini Aventador", gia: "1,200,000 VND", moTa: "Mô hình chi tiết với tỷ lệ 1:18", soLuong: 20 },
    //     { id: 2, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuaH5ukSix_P7hVjDiEupPA9JR-6sY_Hlmpg&s', luotBan: 31, ten: "Mô Hình Ferrari F8", gia: "1,500,000 VND", moTa: "Thiết kế tỉ mỉ, hoàn hảo cho bộ sưu tập", soLuong: 15 },
    //     { id: 3, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuaH5ukSix_P7hVjDiEupPA9JR-6sY_Hlmpg&s', luotBan: 23, ten: "Mô Hình Porsche 911", gia: "1,300,000 VND", moTa: "Phiên bản giới hạn, chất lượng cao", soLuong: 10 },
    //     { id: 4, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuaH5ukSix_P7hVjDiEupPA9JR-6sY_Hlmpg&s', luotBan: 11, ten: "Mô Hình Porsche 911", gia: "1,300,000 VND", moTa: "Phiên bản giới hạn, chất lượng cao", soLuong: 10 },
    //     { id: 5, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuaH5ukSix_P7hVjDiEupPA9JR-6sY_Hlmpg&s', luotBan: 1, ten: "Mô Hình Porsche 911", gia: "1,300,000 VND", moTa: "Phiên bản giới hạn, chất lượng cao", soLuong: 10 },
    // ];
    //
    // const donHang = [
    //     { id: 1, khachHang: "Nguyễn Hữu Phúc",tenSanPham:'Mô Hình Porsche 911 Mô Hình Porsche 911 Mô Hình Porsche 911',phuongThucThanhToan:'Chuyển khoản', ngayDat: "2023-10-01", tongTien: "1,200,000 VND", trangThai: "Đã giao/Hoàn thành",soLuong:1 },
    //     { id: 2, khachHang: "Tần Như Như",tenSanPham:'Mô Hình Porsche 911, Hình Porsche 911 Hình Porsche 911 Hình Porsche 911',phuongThucThanhToan:'Chuyển khoản', ngayDat: "2023-10-15", tongTien: "1,500,000 VND", trangThai: "Đang xử lý",soLuong:1 },
    //     { id: 3, khachHang: "Phạm Minh Tân",tenSanPham:'Mô Hình Porsche 911',phuongThucThanhToan:'Chuyển khoản', ngayDat: "2023-10-20", tongTien: "1,300,000 VND", trangThai: "Chờ xác nhận" ,soLuong:1 },
    //     { id: 4, khachHang: "Phạm Minh Tân",tenSanPham:'Mô Hình Porsche 911',phuongThucThanhToan:'Chuyển khoản', ngayDat: "2023-10-20", tongTien: "1,300,000 VND", trangThai: "Chờ xác nhận" ,soLuong:1 },
    //     { id: 5, khachHang: "Phạm Minh Tân",tenSanPham:'Mô Hình Porsche 911',phuongThucThanhToan:'Chuyển khoản', ngayDat: "2023-10-20", tongTien: "1,300,000 VND", trangThai: "Chờ xác nhận" ,soLuong:1 },
    //     { id: 6, khachHang: "Phạm Minh Tân",tenSanPham:'Mô Hình Porsche 911',phuongThucThanhToan:'Chuyển khoản', ngayDat: "2023-10-20", tongTien: "1,300,000 VND", trangThai: "Chờ xác nhận" ,soLuong:1 },
    // ];


    const filterOrder = chiTietNguoiBanAPI.orders.filter((donHang) => {
        return (
            (donHang.tenSanPham && donHang.tenSanPham.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (donHang.id && donHang.id.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });


    const [isChecked, setIsChecked] = useState(false);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className=" bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 w-full ">
            <div className=" mx-auto bg-white shadow-xl  p-8">
                <div className="grid grid-cols-12 gap-4  ">
                    {/* Thông tin shop - chiếm 3 phần */}
                    <div
                        className="col-span-12 grid lg:col-span-3 p-4 sm:p-6 border-b lg:border-r lg:border-b-0 border-gray-100">
                        <label
                            className="relative inline-flex items-center cursor-pointer mb-4 sm:mb-0 sm:bottom-10 sm:right-8">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleToggle}
                                className="sr-only peer"
                            />
                            <div
                                className={`w-12 h-6 rounded-full transition-colors duration-500 ease-in-out ${
                                    isChecked ? 'bg-green-600 hover:bg-green-700' : 'bg-red-300 hover:bg-red-400'
                                } peer-focus:outline-none peer-focus:ring-transparent relative`}
                            >
                                <div
                                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-all duration-300 transform ${
                                        isChecked ? 'translate-x-6 shadow-lg bg-indigo-500' : 'shadow-md'
                                    }`}
                                ></div>
                            </div>
                            <span
                                className={`ml-2 sm:ml-4 text-sm sm:text-base font-semibold transition-colors duration-300 ${
                                    isChecked ? 'text-green-600' : 'text-red-600'
                                }`}
                            >
            {isChecked ? 'Đang hoạt động' : 'Ngưng hoạt động'}
        </span>
                        </label>

                        <img src={chiTietNguoiBanAPI.shopDetails.image} alt="Logo"
                             className="w-16 h-16 sm:w-24 sm:h-24 rounded-full shadow-lg mx-auto mb-4" />
                        <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-blue-800 text-center">{chiTietNguoiBanAPI.shopDetails.tenShop}</h2>
                        {/*<p*/}
                        {/*    className="text-gray-300 overflow-hidden max-h-8 mt-2 mb-4 text-sm sm:text-base"*/}
                        {/*    style={{*/}
                        {/*        display: 'block',*/}
                        {/*        whiteSpace: 'normal',*/}
                        {/*        lineHeight: '1.5em',*/}
                        {/*    }}*/}
                        {/*    title={nguoiBan.moTa}*/}
                        {/*>*/}
                        {/*    {nguoiBan.moTa}*/}
                        {/*</p>*/}

                        <div
                            className="flex flex-col sm:flex-wrap sm:flex-row justify-between items-start text-gray-600 gap-2">
                            <p className="flex items-center w-full sm:w-auto text-sm sm:text-base">
                                <MdStore className="text-blue-600 mr-1" /> {chiTietNguoiBanAPI.shopDetails.HoVaTen}
                            </p>
                            <p className="flex items-center w-full sm:w-auto text-sm sm:text-base">
                                <HiOutlineLocationMarker className="text-blue-600 mr-1" /> {chiTietNguoiBanAPI.shopDetails.DiaChiShop}
                            </p>
                            <p className="flex items-center w-full sm:w-auto text-sm sm:text-base">
                                <HiOutlineMail className="text-blue-600 mr-1" /> {chiTietNguoiBanAPI.shopDetails.EmailNhanHD}
                            </p>
                            <p className="flex items-center w-full sm:w-auto text-sm sm:text-base">
                                <AiOutlinePhone className="text-blue-600 mr-1" /> {chiTietNguoiBanAPI.shopDetails.SoDienThoai}
                            </p>
                        </div>
                    </div>

                    {/* Hóa đơn  */}
                    <div className="col-span-12 md:col-span-9">
                        <div
                            className="flex flex-col lg:flex-row justify-between items-center mb-4 space-y-4 lg:space-y-0">
                            <h3 className="text-2xl font-medium text-blue-700 text-center lg:text-left">Đơn hàng của cửa
                                hàng</h3>

                            {/* Thanh tìm kiếm */}
                            <div className="flex w-full lg:w-auto">
                                <input
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    type="text"
                                    placeholder="Tìm kiếm đơn hàng..."
                                    className="w-full p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-200"
                                />
                                <button
                                    className="p-2.5 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition duration-200 ease-in-out">
                                    <FaSearch className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div
                            className="grid gap-4 grid-cols-1 sm:grid-cols-2   md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                            {filterOrder.map((dh) => (
                                <div
                                    key={dh.id}
                                    className=" bg-white border-dashed border-1 border-gray-300 rounded-lg shadow-sm hover:shadow-md p-6">
                                    {/* Tiêu đề Hóa đơn */}
                                    <div className="text-center mb-2">
                                        <p className="text-sm text-gray-500">Mã hóa đơn: #{dh.id}</p>
                                    </div>

                                    {/* Thông tin khách hàng và hóa đơn */}
                                    <div className="border-t border-dashed border-gray-300 py-4 space-y-3">
                                        <div className="flex justify-between items-center">
                                            <FaShoppingCart className="w-5 h-5 mr-1" />
                                            <span className="text-gray-700">Khách hàng:</span>
                                            <span className="ml-auto font-semibold text-gray-900">{dh.khachHang}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <FaBoxOpen className="w-5 h-5 mr-1" />
                                            <span className="text-gray-700">Sản phẩm:</span>
                                            <span
                                                className="ml-auto font-semibold text-gray-900 truncate"
                                                style={{
                                                    display: 'inline-block',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    maxWidth: '200px',
                                                }}
                                                title={dh.tenSanPham}
                                            >
                            {dh.tenSanPham}
                        </span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <FaListOl className="w-5 h-5 mr-1" />
                                            <span className="text-gray-700">Số lượng:</span>
                                            <span className="ml-auto font-semibold text-gray-900">{dh.soLuong}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <FaCalendarAlt className="w-5 h-5 mr-1" />
                                            <span className="text-gray-700">Ngày đặt:</span>
                                            <span className="ml-auto font-semibold text-gray-900">{dh.ngayDat}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <FaCreditCard className="w-5 h-5 mr-1" />
                                            <span className="text-gray-700">Phương thức thanh toán:</span>
                                            <span
                                                className="ml-auto font-semibold text-gray-900">{dh.phuongThucThanhToan}</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <FaMoneyBillWave className="w-5 h-5 mr-1" />
                                            <span className="text-gray-700">Tổng tiền:</span>
                                            <span className="ml-auto text-xl font-bold">{dh.tongTien}</span>
                                        </div>
                                    </div>

                                    {/* Trạng thái */}
                                    <div className="mt-6 text-center">
                                        <p
                                            className={`inline-block font-semibold px-4 py-1 rounded-full text-sm ${
                                                dh.trangThai === 'Đã giao/Hoàn thành'
                                                    ? 'bg-green-200 text-green-800'
                                                    : dh.trangThai === 'Đang xử lý'
                                                        ? 'bg-yellow-200 text-yellow-800'
                                                        : 'bg-red-200 text-red-800'
                                            }`}
                                        >
                                            {dh.trangThai}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <hr />

                <div
                    className="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-8 bg-white rounded-lg shadow-lg">
                    {/* Doanh thu */}
                    <div className="text-center">
                        <div className="flex flex-col items-center gap-3">
                            <div
                                className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 shadow-inner">
                                <FaMoneyBillWave className="text-blue-600 w-7 h-7" />
                            </div>
                            <h2 className="text-3xl font-bold text-blue-700">369 triệu</h2>
                            <p className="text-gray-600 text-sm font-medium">Doanh thu</p>
                        </div>
                    </div>

                    {/* Đơn hàng */}
                    <div className="text-center">
                        <div className="flex flex-col items-center gap-3">
                            <div
                                className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 shadow-inner">
                                <FaShoppingCart className="text-blue-600 w-7 h-7" />
                            </div>
                            <h2 className="text-3xl font-bold text-blue-700">1500</h2>
                            <p className="text-gray-600 text-sm font-medium">Đơn hàng</p>
                        </div>
                    </div>

                    {/* Sản phẩm */}
                    <div className="text-center">
                        <div className="flex flex-col items-center gap-3">
                            <div
                                className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 shadow-inner">
                                <FaBox className="text-blue-600 w-7 h-7" />
                            </div>
                            <h2 className="text-3xl font-bold text-blue-700">500</h2>
                            <p className="text-gray-600 text-sm font-medium">Sản phẩm</p>
                        </div>
                    </div>

                    {/* Thứ hạng */}
                    <div className="text-center">
                        <div className="flex flex-col items-center gap-3">
                            <div
                                className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 shadow-inner">
                                <FaStar className="text-blue-600 w-7 h-7" />
                            </div>
                            <h2 className="text-3xl font-bold text-blue-700">27</h2>
                            <p className="text-gray-600 text-sm font-medium">Thứ hạng</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                    {/* Thông tin công ty */}
                    <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 w-full">
                        <h3 className="text-2xl font-semibold text-blue-700 mb-6">Thông tin công ty</h3>
                        <div className="mt-4 space-y-6">
                            <p className="flex items-center text-gray-800">
                                <FaBuilding className="text-blue-600 mr-3 w-6 h-6" />
                                <span className="font-semibold">Tên công ty:</span>
                                <span className="ml-2">{chiTietNguoiBanAPI.shopDetails.TenCongTy}</span>
                            </p>

                            <p className="flex items-center text-gray-800">
                                <FaMapMarkerAlt className="text-blue-600 mr-3 w-6 h-6" />
                                <span className="font-semibold">Địa chỉ đăng ký:</span>
                                <span className="ml-2">{chiTietNguoiBanAPI.shopDetails.DiaChiDK}</span>
                            </p>

                            <p className="flex items-center text-gray-800">
                                <FaFileContract className="text-blue-600 mr-3 w-6 h-6" />
                                <span className="font-semibold">Giấy phép kinh doanh:</span>
                                <span className="ml-2">{chiTietNguoiBanAPI.shopDetails.GiayPhepKinhDoanh}</span>
                            </p>

                            <p className="flex items-center text-gray-800">
                                <FaIndustry className="text-blue-600 mr-3 w-6 h-6" />
                                <span className="font-semibold">Loại kinh doanh:</span>
                                <span className="ml-2">{chiTietNguoiBanAPI.shopDetails.LoaiKinhDoanh}</span>
                            </p>

                            <p className="flex items-center text-gray-800">
                                <FaPassport className="text-blue-600 mr-3 w-6 h-6" />
                                <span className="font-semibold">Mã số thuế:</span>
                                <span className="ml-2">{chiTietNguoiBanAPI.shopDetails.MaSoThue}</span>
                            </p>
                        </div>
                    </div>

                    {/* Biểu đồ kinh doanh */}
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 w-full">
                        <h3 className="text-2xl font-semibold text-blue-700 mb-4">Biểu đồ kinh doanh</h3>
                        <div
                            className="border bg-gray-50 p-12 text-center text-gray-500 rounded-lg h-64 flex items-center justify-center">
                            Biểu đồ cột thể hiện doanh thu qua các tháng
                        </div>
                    </div>
                </div>
                <hr />
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold text-center mb-6 text-blue-700">Sản phẩm của cửa hàng</h3>
                    <ul className=" grid items-center  grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {chiTietNguoiBanAPI.products.map(sp => (
                            <li
                                key={sp.id}
                                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-200"
                            >
                                <div className="flex justify-center mb-4">
                                    <img
                                        src={sp.image}
                                        alt={sp.ten}
                                        className="w-full h-80 object-cover rounded-md transition transform hover:scale-105"
                                    />
                                </div>
                                <h4
                                    className="mt-2 font-bold text-gray-800 text-lg"
                                    style={{
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        whiteSpace: 'normal',
                                        textOverflow: 'ellipsis',
                                        maxWidth: '300px', // Chiều rộng tối đa
                                        maxHeight: '3em', // Giới hạn chiều cao cho hai hàng
                                        lineHeight: '1.5em', // Khoảng cách giữa các dòng
                                        WebkitLineClamp: 2, // Giới hạn 2 dòng
                                        WebkitBoxOrient: 'vertical',
                                    }}
                                    title={sp.ten}
                                >
                                    {sp.ten}
                                </h4>
                                <p className="text-sm text-gray-500 mt-1">{sp.moTa}</p>
                                <p className="font-semibold text-blue-700 text-lg mt-2">{sp.gia}</p>
                                <p className="text-gray-600 mt-1">
                                    Lượt bán: <span className="font-semibold">{sp.luotBan}</span>
                                </p>
                            </li>

                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default QuanLyChiTietNguoiBan;
