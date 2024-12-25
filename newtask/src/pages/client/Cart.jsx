import React, { useState } from 'react';
import { FaTrash, FaMinus, FaPlus, FaCommentDots, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { GiVikingLonghouse } from 'react-icons/gi';
import { BiSolidDiscount } from 'react-icons/bi';

function Cart() {
    const navigate = useNavigate();

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="container w-full sm:w-4/5 mx-auto px-4 py-8 bg-white rounded-lg m-4">
            <h1 className="text-3xl font-bold mb-6">Giỏ Hàng</h1>
            <hr />
            <div className="m-2.5  rounded-lg p-3">
                <label className="flex flex-wrap items-center space-x-2 text-sm sm:text-base w-full">
                    <input type="checkbox" name="" id="" className='form-checkbox h-5 w-5 text-blue-500'/>
                    <span className="hidden lg:inline font-bold text-center ml-4">

                         Tất c sản phẩm</span>
                    <span className="hidden lg:inline w-2/6  text-end">Đơn giá</span>
                    <span className="hidden lg:inline w-1/4 text-end">Số lượng</span>
                    <span className="hidden lg:inline w-1/4 text-center">Thành tiền</span>
                </label>
            </div>
            {/* Cửa hàng 1 */}
            <div className='shadow p-1 rounded'>
                <div className="flex items-center justify-between bg-white px-4 mt-8 flex-wrap ">
                    <div className="flex items-center w-full md:w-auto">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500" />
                        <GiVikingLonghouse className="size-8 ml-4 mr-2" />
                        <h2 className="text-lg sm:text-xl font-semibold">Cửa Hàng Đồ Chơi ABC</h2>
                    </div>
                    <button className="text-xs p-2 rounded-full hover:bg-blue-100 text-blue-500 flex items-center space-x-2 transition-transform duration-300 hover:scale-105 mt-4 md:mt-0 md:ml-auto">
                        <FaCommentDots />
                        <span>Chat với shop</span>
                    </button>
                </div>
                <hr />

                {/* SP 1 */}
                <div className="flex flex-wrap items-center justify-between p-2 bg-white border rounded-lg shadow-md mb-1">
                    <div className="flex items-center w-full md:w-1/3 space-x-4">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500" />
                        <img
                            src="https://product.hstatic.net/200000504579/product/7de4dd2d8f31f9b2e86de68bb0f6399b_8b0233047bef4ce7b14233ed57e53b0b_grande.jpg"
                            alt="Mô Hình Robot Siêu nhân biến hình"
                            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                        />
                        <div className="flex flex-col">
                            <span
                                className="text-lg font-semibold overflow-hidden text-ellipsis"
                                style={{
                                    maxWidth: '400px',
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                    whiteSpace: 'normal',
                                }}
                            >
                                Mô Hình Robot Siêu nhân biến hình với sản phẩm đặc biệt
                            </span>
                            <span className="text-sm text-gray-500 flex items-center">
                                Phân loại hàng: GTO, Mô hình
                                <FaChevronDown className="ml-1" />
                            </span>
                        </div>
                    </div>
                    <div className="w-full md:w-1/5 flex flex-col items-start md:items-center md:justify-center text-center">
                        <div className="flex items-center justify-center space-x-1">
                            <span className="text-lg font-semibold text-blue-700">120,000 đ</span>
                        </div>
                    </div>
                    <div className="w-full md:w-1/5 flex items-center justify-center md:justify-center">
                        <div className="flex items-center border border-gray-200 rounded-lg shadow-sm overflow-hidden my-2 md:my-0 mx-2">
                            <button className="w-8 h-8 flex items-center justify-center bg-gray-100 transition-all duration-300 ease-in-out hover:bg-red-200 hover:text-red-600 active:scale-90">
                                <FaMinus size={14} />
                            </button>
                            <span className="w-10 h-8 flex items-center justify-center text-lg font-semibold bg-white border-x border-gray-200">
                                1
                            </span>
                            <button className="w-8 h-8 flex items-center justify-center bg-gray-100 transition-all duration-300 ease-in-out hover:bg-green-200 hover:text-green-600 active:scale-90">
                                <FaPlus size={14} />
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-1/5 text-center mt-2 md:mt-0">
                        <span className="text-lg font-semibold text-blue-700">120,000 đ</span>
                        <button className="text-red-500 mr-8 md:mr-0 ml-28">
                            <FaTrash />
                        </button>
                    </div>
                </div>

                {/* SP 2 */}
                <div className="flex flex-wrap items-center justify-between p-2 bg-white border rounded-lg shadow-md mb-1">
                    <div className="flex items-center w-full md:w-1/3 space-x-4">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500" />
                        <img
                            src="https://salt.tikicdn.com/cache/280x280/ts/product/f6/54/b8/9008dd290cd88a8b13e4778220c1693e.jpg"
                            alt="Lego City"
                            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                        />
                        <div className="flex flex-col">
                            <span className="text-base md:text-lg font-semibold truncate w-32 md:w-52">Lego City</span>
                            <span className="text-sm text-gray-500 flex items-center">
                                Phân loại hàng: Xây dựng, Lego
                                <FaChevronDown className="ml-1" />
                            </span>
                        </div>
                    </div>
                    <div className="w-full md:w-1/5 flex flex-col items-start md:items-center md:justify-center text-center">
                        <span className="text-lg font-semibold text-gray-800">300,000 đ</span>
                    </div>
                    <div className="w-full md:w-1/5 flex items-center justify-center md:justify-center">
                        <div className="flex items-center border border-gray-200 rounded-lg shadow-sm overflow-hidden my-2 md:my-0 mx-2">
                            <button className="w-8 h-8 flex items-center justify-center bg-gray-100 transition-all duration-300 ease-in-out hover:bg-red-200 hover:text-red-600 active:scale-90">
                                <FaMinus size={14} />
                            </button>
                            <span className="w-10 h-8 flex items-center justify-center text-lg font-semibold bg-white border-x border-gray-200">
                                2
                            </span>
                            <button className="w-8 h-8 flex items-center justify-center bg-gray-100 transition-all duration-300 ease-in-out hover:bg-green-200 hover:text-green-600 active:scale-90">
                                <FaPlus size={14} />
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-1/5 text-center mt-2 md:mt-0">
                        <span className="text-lg font-semibold text-blue-700">600,000 đ</span>
                        <button className="text-red-500 mr-8 md:mr-0 ml-28">
                            <FaTrash />
                        </button>
                    </div>
                    <div className="flex m-2">
                        <div className="flex items-center space-x-2 mr-1">
                            <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center">
                                <BiSolidDiscount />
                            </div>
                            <span className="text-lg font-semibold text-gray-700">Sản phẩm được giảm 10k từ voucher</span>
                        </div>
                        <button className="text-blue-500 font-medium hover:underline">Xem thêm voucher</button>
                    </div>
                </div>
            </div>
            {/* Cửa hàng 2  */}
            <div className='shadow p-1 rounded'>
                <div className="flex items-center justify-between bg-white px-4 mt-8 flex-wrap">
                    <div className="flex items-center w-full md:w-auto">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500" />
                        <GiVikingLonghouse className="size-8 ml-4 mr-2" />
                        <h2 className="text-lg sm:text-xl font-semibold">Cửa Hàng Đồ Chơi ABC</h2>
                    </div>
                    <button className="text-xs p-2 rounded-full hover:bg-blue-100 text-blue-500 flex items-center space-x-2 transition-transform duration-300 hover:scale-105 mt-4 md:mt-0 md:ml-auto">
                        <FaCommentDots />
                        <span>Chat với shop</span>
                    </button>
                </div>
                <hr />

                {/* SP 1 */}
                <div className="flex flex-wrap items-center justify-between p-2 bg-white border rounded-lg shadow-md mb-1">
                    <div className="flex items-center w-full md:w-1/3 space-x-4">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500" />
                        <img
                            src="https://product.hstatic.net/200000504579/product/7de4dd2d8f31f9b2e86de68bb0f6399b_8b0233047bef4ce7b14233ed57e53b0b_grande.jpg"
                            alt="Mô Hình Robot Siêu nhân biến hình"
                            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                        />
                        <div className="flex flex-col">
                            <span className="text-base md:text-lg font-semibold truncate w-32 md:w-52">
                                Mô Hình Robot Siêu nhân biến hình
                            </span>
                            <span className="text-sm text-gray-500 flex items-center">
                                Phân loại hàng: GTO, Mô hình
                                <FaChevronDown className="ml-1" />
                            </span>
                        </div>
                    </div>
                    <div className="w-full md:w-1/5 flex flex-col items-start md:items-center md:justify-center text-center">
                        <div className="flex items-center justify-center space-x-1">
                            <span className="text-lg font-semibold text-gray-800">300,000 đ</span>
                        </div>
                    </div>
                    <div className="w-full md:w-1/5 flex items-center justify-center md:justify-center">
                        <div className="flex items-center border border-gray-200 rounded-lg shadow-sm overflow-hidden my-2 md:my-0 mx-2">
                            <button className="w-8 h-8 flex items-center justify-center bg-gray-100 transition-all duration-300 ease-in-out hover:bg-red-200 hover:text-red-600 active:scale-90">
                                <FaMinus size={14} />
                            </button>
                            <span className="w-10 h-8 flex items-center justify-center text-lg font-semibold bg-white border-x border-gray-200">
                                1
                            </span>
                            <button className="w-8 h-8 flex items-center justify-center bg-gray-100 transition-all duration-300 ease-in-out hover:bg-green-200 hover:text-green-600 active:scale-90">
                                <FaPlus size={14} />
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-1/5 text-center mt-2 md:mt-0">
                        <span className="text-lg font-semibold text-blue-700">120,000 đ</span>
                        <button className="text-red-500 mr-8 md:mr-0 ml-28">
                            <FaTrash />
                        </button>
                    </div>
                </div>

                {/* SP 2 */}
                <div className="flex flex-wrap items-center justify-between p-2 bg-white border rounded-lg shadow-md mb-1">
                    <div className="flex items-center w-full md:w-1/3 space-x-4">
                        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500" />
                        <img
                            src="https://salt.tikicdn.com/cache/280x280/ts/product/f6/54/b8/9008dd290cd88a8b13e4778220c1693e.jpg"
                            alt="Lego City"
                            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg"
                        />
                        <div className="flex flex-col">
                            <span className="text-base md:text-lg font-semibold truncate w-32 md:w-52">Lego City</span>
                            <span className="text-sm text-gray-500 flex items-center">
                                Phân loại hàng: Xây dựng, Lego
                                <FaChevronDown className="ml-1" />
                            </span>
                        </div>
                    </div>
                    <div className="w-full md:w-1/5 flex flex-col items-start md:items-center md:justify-center text-center">
                        <span className="text-lg font-semibold text-gray-800">300,000 đ</span>
                    </div>
                    <div className="w-full md:w-1/5 flex items-center justify-center md:justify-center">
                        <div className="flex items-center border border-gray-200 rounded-lg shadow-sm overflow-hidden my-2 md:my-0 mx-2">
                            <button className="w-8 h-8 flex items-center justify-center bg-gray-100 transition-all duration-300 ease-in-out hover:bg-red-200 hover:text-red-600 active:scale-90">
                                <FaMinus size={14} />
                            </button>
                            <span className="w-10 h-8 flex items-center justify-center text-lg font-semibold bg-white border-x border-gray-200">
                                2
                            </span>
                            <button className="w-8 h-8 flex items-center justify-center bg-gray-100 transition-all duration-300 ease-in-out hover:bg-green-200 hover:text-green-600 active:scale-90">
                                <FaPlus size={14} />
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-1/5 text-center mt-2 md:mt-0">
                        <span className="text-lg font-semibold text-blue-700">600,000 đ</span>
                        <button className="text-red-500 mr-8 md:mr-0 ml-28">
                            <FaTrash />
                        </button>
                    </div>
                    <div className="flex m-2">
                        <div className="flex items-center space-x-2 mr-1">
                            <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center">
                                <BiSolidDiscount />
                            </div>
                            <span className="text-lg font-semibold text-gray-700">Sản phẩm được giảm 10k từ voucher</span>
                        </div>
                        <button className="text-blue-500 font-medium hover:underline">Xem thêm voucher</button>
                    </div>
                </div>
            </div>
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
                {/* Voucher */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center">
                            <BiSolidDiscount />
                        </div>
                        <span className="text-lg font-semibold text-gray-700">Model World Voucher</span>
                    </div>
                    <button className="text-blue-500 font-medium hover:underline">Sử dụng voucher</button>
                </div>
                <hr className="my-4" />

                <div className="flex flex-col space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                        <span className="text-base font-semibold text-gray-700">Tiền sản phẩm: </span>
                        <span className="text-base text-gray-800">1.000.000 đ</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-base font-semibold text-gray-700">Giảm giá:</span>
                        <span className="text-base text-gray-800">10.000 đ</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                        <span className="text-lg font-semibold text-gray-700">Tổng tiền:</span>
                        <span className="text-xl font-bold text-blue-700"> 900.000 đ</span>
                    </div>
                </div>
                <hr className="my-4" />

                {/*   */}
                <div className="flex justify-end">
                    <button
                        onClick={handleCheckout}
                        className=" px-10 max-w-md bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 focus:ring-4 focus:ring-blue-300 shadow-lg text-lg font-semibold"
                    >
                        Mua ngay
                    </button>
                </div>
            </div>

            {/* Có Thể Bạn Cũng Thích */}
            <div className="mt-12 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Có Thể Bạn Cũng Thích</h2>
                <div className="flex justify-center">
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img
                                src="https://product.hstatic.net/200000504579/product/7de4dd2d8f31f9b2e86de68bb0f6399b_8b0233047bef4ce7b14233ed57e53b0b_grande.jpg"
                                alt=""
                                className="w-full h-80 object-cover mb-4 rounded-lg"
                            />
                            <h3 className="text-lg font-semibold truncate mb-2">Mô Hình Robot Siêu nhân biến hình</h3>
                            <div className="flex items-center justify-between">300.000đ</div>
                            <p className="text-sm text-gray-500 mt-2">Đã bán 134</p>
                        </div>
                        <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img
                                src="https://product.hstatic.net/200000504579/product/7de4dd2d8f31f9b2e86de68bb0f6399b_8b0233047bef4ce7b14233ed57e53b0b_grande.jpg"
                                alt=""
                                className="w-full h-80 object-cover mb-4 rounded-lg"
                            />
                            <h3 className="text-lg font-semibold truncate mb-2">Mô Hình Robot Siêu nhân biến hình</h3>
                            <div className="flex items-center justify-between">300.000đ</div>
                            <p className="text-sm text-gray-500 mt-2">Đã bán 134</p>
                        </div>
                        <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img
                                src="https://product.hstatic.net/200000504579/product/7de4dd2d8f31f9b2e86de68bb0f6399b_8b0233047bef4ce7b14233ed57e53b0b_grande.jpg"
                                alt=""
                                className="w-full h-80 object-cover mb-4 rounded-lg"
                            />
                            <h3 className="text-lg font-semibold truncate mb-2">Mô Hình Robot Siêu nhân biến hình</h3>
                            <div className="flex items-center justify-between">300.000đ</div>
                            <p className="text-sm text-gray-500 mt-2">Đã bán 134</p>
                        </div>
                        <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img
                                src="https://product.hstatic.net/200000504579/product/7de4dd2d8f31f9b2e86de68bb0f6399b_8b0233047bef4ce7b14233ed57e53b0b_grande.jpg"
                                alt=""
                                className="w-full h-80 object-cover mb-4 rounded-lg"
                            />
                            <h3 className="text-lg font-semibold truncate mb-2">Mô Hình Robot Siêu nhân biến hình</h3>
                            <div className="flex items-center justify-between">300.000đ</div>
                            <p className="text-sm text-gray-500 mt-2">Đã bán 134</p>
                        </div>
                        <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img
                                src="https://product.hstatic.net/200000504579/product/7de4dd2d8f31f9b2e86de68bb0f6399b_8b0233047bef4ce7b14233ed57e53b0b_grande.jpg"
                                alt=""
                                className="w-full h-80 object-cover mb-4 rounded-lg"
                            />
                            <h3 className="text-lg font-semibold truncate mb-2">Mô Hình Robot Siêu nhân biến hình</h3>
                            <div className="flex items-center justify-between">300.000đ</div>
                            <p className="text-sm text-gray-500 mt-2">Đã bán 134</p>
                        </div>
                        <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img
                                src="https://product.hstatic.net/200000504579/product/7de4dd2d8f31f9b2e86de68bb0f6399b_8b0233047bef4ce7b14233ed57e53b0b_grande.jpg"
                                alt=""
                                className="w-full h-80 object-cover mb-4 rounded-lg"
                            />
                            <h3 className="text-lg font-semibold truncate mb-2">Mô Hình Robot Siêu nhân biến hình</h3>
                            <div className="flex items-center justify-between">300.000đ</div>
                            <p className="text-sm text-gray-500 mt-2">Đã bán 134</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-8">
                    <button className="text-blue-500 font-medium hover:underline">Xem Thêm</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
