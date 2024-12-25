// import { useNavigate } from 'react-router-dom';
// import { FaMapLocation } from 'react-icons/fa6';
// import { FaChevronDown, FaCommentDots } from 'react-icons/fa';
// import { GiVikingLonghouse } from 'react-icons/gi';
// import { BiSolidDiscount } from 'react-icons/bi';
// import { MdOutlineSpeakerNotes } from 'react-icons/md';

// function Checkout() {
//     const navigate = useNavigate();

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         navigate('/thank-you');
//     };

//     return (
//         <div className="container mx-auto px-4 py-8 bg-white rounded-lg m-4 shadow">
//             <h1 className="text-2xl font-bold mb-6 border-b pb-2">Thanh Toán</h1>
//             <form onSubmit={handleSubmit}>
//                 {/* Shipping Address Section */}
//                 <div className="container mx-auto mb-6">
//                     <div className="bg-white px-4 pt-2 pb-4 rounded shadow">
//                         <h3 className="text-lg font-semibold mb-2 text-blue-600 flex items-center">
//                             <FaMapLocation size="24" className="mr-3" />
//                             Địa chỉ nhận hàng
//                         </h3>
//                         <div className="border-t pt-2 flex flex-wrap items-center">
//                             <p className="text-sm font-bold text-gray-900 mx-3">Phúc Hữu - 0989861548</p>
//                             <p className="text-sm text-gray-600">Thới Phong A, Thới An, Ô Môn, Cần Thơ </p>
//                             <p className="no-underline px-2 mx-2 py-1 text-blue-500 border border-blue-700 rounded-md text-xs">Mặc định</p>
//                             <a href="#" className="ml-auto no-underline text-blue-500 hover:text-blue-700">
//                                 Đổi địa chỉ
//                             </a>
//                         </div>
//                     </div>
//                 </div>

//                 {/* */}
//                 <div className="mb-6">
//                     <div className="m-2.5 border rounded-lg p-3 shadow">
//                         <label className="flex flex-wrap items-center space-x-2 text-sm sm:text-base w-full">
//                             <span className="hidden lg:inline font-bold text-center ml-4">Sản phẩm</span>
//                             <span className="hidden lg:inline lg:w-2/4 text-end">Đơn giá</span>
//                             <span className="hidden lg:inline lg:w-1/6 text-end">Số lượng</span>
//                             <span className="hidden lg:inline lg:w-2/12 text-end">Thành tiền</span>
//                         </label>
//                     </div>

//                     {/* Store 1 */}
//                     <div className="mb-6 m-2.5 border rounded-lg p-3 shadow">
//                         <div className="flex items-center justify-between bg-white flex-wrap pb-3">
//                             <div className="flex items-center">
//                                 <GiVikingLonghouse className="size-8 ml-4 mr-2" />
//                                 <h2 className="text-lg sm:text-xl font-semibold">Cửa Hàng Đồ Chơi ABC</h2>
//                             </div>
//                             <button className="text-xs p-2 rounded-full hover:bg-blue-100 text-blue-500 flex items-center space-x-2 transition-transform duration-300 hover:scale-105">
//                                 <FaCommentDots />
//                                 <span>Chat với shop</span>
//                             </button>
//                         </div>
//                         <hr />
//                         {/* Product 1 */}
//                         <div className="flex flex-wrap items-center justify-between p-2 bg-white border rounded-lg shadow-md mb-2">
//                             <div className="flex items-center space-x-4 w-full">
//                                 <img
//                                     src="https://product.hstatic.net/200000504579/product/7de4dd2d8f31f9b2e86de68bb0f6399b_8b0233047bef4ce7b14233ed57e53b0b_grande.jpg"
//                                     alt="Chi Dện Bộ LED Unit Gold Dơn MG 1/100 Unicorn Banshee Phenex"
//                                     className="w-16 h-16 sm:w-32 sm:h-32 object-cover rounded-lg"
//                                 />
//                                 <div className="flex flex-col w-full sm:w-4/12">
//                                     <p
//                                         className="text-sm sm:text-lg font-semibold overflow-hidden text-ellipsis mb-1"
//                                         style={{
//                                             maxWidth: '350px',
//                                             display: '-webkit-box',
//                                             WebkitBoxOrient: 'vertical',
//                                             WebkitLineClamp: 2,
//                                             whiteSpace: 'normal',
//                                         }}
//                                     >
//                                         Chi Dện Bộ LED Unit Gold Dơn MG 1/100 Unicorn Banshee Phenex
//                                     </p>
//                                     <span className="text-xs sm:text-sm text-gray-500 flex items-center">
//                                         Phân loại hàng: GTO, Mô hình
//                                         <FaChevronDown className="ml-1" />
//                                     </span>
//                                 </div>
//                                 <div className="w-full fl sm:w-2/12 text-center flex items-center justify-center space-x-2">
//                                     <span className="text-xs sm:text-sm text-gray-400 line-through">150.000 đ</span>
//                                     <span className="text-sm sm:text-lg font-semibold text-red-500">120.000 đ</span>
//                                 </div>

//                                 <div className="w-full sm:w-2/12 text-center">
//                                     <p className="text-sm sm:text-lg">2</p>
//                                 </div>
//                                 <div className="w-full sm:w-2/12 text-center">
//                                     <p className="text-sm sm:text-lg font-semibold">240.000 đ</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* SP 2 */}
//                         <div className="flex flex-wrap items-center justify-between p-2 bg-white border rounded-lg shadow-md mb-2">
//                             <div className="flex items-center space-x-4 w-full">
//                                 <img
//                                     src="https://cf.shopee.vn/file/vn-11134207-7r98o-lnz6hfyoxn1pfd"
//                                     alt="Giá đỡ - Nhiều Màu Mô hình lắp ráp HG 1/144"
//                                     className="w-16 h-16 sm:w-32 sm:h-32 object-cover rounded-lg"
//                                 />
//                                 <div className="flex flex-col w-full sm:w-4/12">
//                                     <p
//                                         className="text-sm sm:text-lg font-semibold overflow-hidden text-ellipsis mb-1"
//                                         style={{
//                                             maxWidth: '350px',
//                                             display: '-webkit-box',
//                                             WebkitBoxOrient: 'vertical',
//                                             WebkitLineClamp: 2,
//                                             whiteSpace: 'normal',
//                                         }}
//                                     >
//                                         Giá đỡ - Nhiều Màu Mô hình lắp ráp HG 1/144
//                                     </p>
//                                     <span className="text-xs sm:text-sm text-gray-500 flex items-center">
//                                         Phân loại hàng: Phụ kiện, Giá đỡ
//                                         <FaChevronDown className="ml-1" />
//                                     </span>
//                                 </div>
//                                 <div className="w-full sm:w-2/12 text-center">
//                                     <div className="flex flex-col items-center justify-center">
//                                         <span className="text-sm sm:text-lg text-gray-700">100.000 đ</span>
//                                     </div>
//                                 </div>
//                                 <div className="w-full sm:w-2/12 text-center">
//                                     <p className="text-sm sm:text-lg">1</p>
//                                 </div>
//                                 <div className="w-full sm:w-2/12 text-center">
//                                     <p className="text-sm sm:text-lg font-semibold">100.000 đ</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="flex flex-wrap items-center m-2">
//                             <div className="flex items-center space-x-2 mr-1">
//                                 <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center">
//                                     <BiSolidDiscount />
//                                 </div>
//                                 <span className="text-sm sm:text-lg font-semibold text-gray-700">Cửa Hàng Đồ Chơi ABC voucher</span>
//                             </div>
//                             <button className="ml-4 text-blue-500 font-medium hover:underline">Chọn voucher</button>
//                         </div>
//                         {/*  */}
//                         <div className="flex flex-wrap items-start">
//                             <div className="flex items-center space-x-2 w-full">
//                                 <MdOutlineSpeakerNotes size="20" />
//                                 <p className="mt-2.5">Lời nhắn</p>
//                                 <textarea
//                                     className="flex-grow border border-gray-300 p-2 rounded resize-none h-12 w-full sm:w-96"
//                                     placeholder="Lưu ý cho người bán..."
//                                 ></textarea>
//                             </div>

//                             <div className="text-right mt-4 ml-auto w-full sm:w-auto">
//                                 <span className="text-sm sm:text-lg font-semibold">Tổng tiền (2 sản phẩm) : </span>
//                                 <span className="text-sm sm:text-lg font-bold text-blue-700">340.000 đ</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* CH 2 */}
//                     <div className="mb-6 m-2.5 border rounded-lg p-3 shadow">
//                         <h2 className="text-lg sm:text-xl font-semibold mb-3">GUNDAMVN101 HOBBY STORE</h2>
//                         {/* SP 1 */}
//                         <div className="flex flex-wrap items-center justify-between p-2 bg-white border rounded-lg shadow-md mb-2">
//                             <div className="flex items-center space-x-4 w-full">
//                                 <img
//                                     src="https://bizweb.dktcdn.net/thumb/1024x1024/100/382/833/products/demo1-a78af570-2f70-4b12-86d0-09cddb94101d.jpg?v=1661425466350"
//                                     alt="Mô hình lắp ráp Sky Defender - Level-Ultimate 1/72"
//                                     className="w-16 h-16 sm:w-32 sm:h-32 object-cover rounded-lg"
//                                 />
//                                 <div className="flex flex-col w-full sm:w-4/12">
//                                     <p
//                                         className="text-sm sm:text-lg font-semibold overflow-hidden text-ellipsis mb-1"
//                                         style={{
//                                             maxWidth: '350px',
//                                             display: '-webkit-box',
//                                             WebkitBoxOrient: 'vertical',
//                                             WebkitLineClamp: 2,
//                                             whiteSpace: 'normal',
//                                         }}
//                                     >
//                                         Mô hình lắp ráp Sky Defender - Level-Ultimate 1/72
//                                     </p>
//                                     <span className="text-xs sm:text-sm text-gray-500 flex items-center">
//                                         Phân loại hàng: Sky Defender, Ultimate
//                                         <FaChevronDown className="ml-1" />
//                                     </span>
//                                 </div>
//                                 <div className="w-full sm:w-2/12 text-center">
//                                     <div className="flex flex-col items-center justify-center">
//                                         <span className="text-lg text-gray-700">300.000 đ</span>
//                                     </div>
//                                 </div>
//                                 <div className="w-full sm:w-2/12 text-center">
//                                     <p className="text-sm sm:text-lg">1</p>
//                                 </div>
//                                 <div className="w-full sm:w-2/12 text-center">
//                                     <p className="text-sm sm:text-lg font-semibold">300.000 đ</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="flex flex-wrap items-center m-2">
//                             <div className="flex items-center space-x-2 mr-1">
//                                 <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center">
//                                     <BiSolidDiscount />
//                                 </div>
//                                 <span className="text-sm sm:text-lg font-semibold text-gray-700">Sản phẩm được giảm 10k từ voucher</span>
//                             </div>
//                             <button className="ml-4 text-blue-500 font-medium hover:underline">Xem thêm voucher</button>
//                         </div>
//                         {/* */}
//                         <div className="flex flex-wrap items-start">
//                             <div className="flex items-center space-x-2 w-full">
//                                 <MdOutlineSpeakerNotes size="20" />
//                                 <p className="mt-2.5">Lời nhắn</p>
//                                 <textarea
//                                     className="flex-grow border border-gray-300 p-2 rounded resize-none h-12 sm:w-96"
//                                     placeholder="Lưu ý cho người bán..."
//                                 ></textarea>
//                             </div>

//                             <div className="text-right mt-4 ml-auto w-full sm:w-auto">
//                                 <span className="text-sm sm:text-lg font-semibold">Tổng tiền (1 sản phẩm): </span>
//                                 <span className="text-sm sm:text-lg font-bold text-blue-700">300.000 đ</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="border border-blue-300 p-6 m-2.5 rounded-lg">
//                     {/* Voucher */}
//                     <div className="flex flex-wrap justify-between items-center mb-4">
//                         <div className="flex items-center ">
//                             <BiSolidDiscount />
//                             <span className="ml-2"> Model World Voucher</span>
//                         </div>
//                         <a href="#" className="text-blue-500 hover:underline no-underline">
//                             Chọn voucher
//                         </a>
//                     </div>

//                     <hr />

//                     {/* Payment */}
//                     <div className="flex flex-wrap justify-between items-center my-4">
//                         <div className="flex items-center">
//                             <span className="text-blue-500 mr-2">💳</span>
//                             <span>Phương thức thanh toán</span>
//                         </div>
//                         <a href="#" className="no-underline text-blue-500 hover:underline">
//                             Thay đổi
//                         </a>
//                     </div>

//                     <hr />

//                     {/*  */}
//                     <div className="my-4">
//                         <div className="flex justify-between mb-2">
//                             <span>Tổng tiền hàng</span>
//                             <span>640,000đ</span>
//                         </div>
//                         <div className="flex justify-between mb-2">
//                             <span>Phí vận chuyển</span>
//                             <span>32,000đ</span>
//                         </div>
//                         <div className="flex justify-between font-bold text-sm sm:text-lg text-blue-600 mt-2">
//                             <span>Tổng thanh toán</span>
//                             <span>672,000đ</span>
//                         </div>
//                     </div>

//                     <hr />

//                     {/*  */}
//                     <p className="text-xs sm:text-sm text-gray-500 mt-4">
//                         Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo
//                         <a href="#" className="text-blue-500 hover:underline">
//                             {' '}
//                             Điều khoản Model World
//                         </a>
//                     </p>

//                     {/*  */}
//                     <div className="mt-6 flex justify-end">
//                         <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600">
//                             Thanh Toán
//                         </button>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default Checkout;
