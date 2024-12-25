import React, { useState } from 'react';

const SellerRegister = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const nextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-lg md:max-w-2xl lg:max-w-4xl p-4 md:p-10">
                <h2 className="text-xl md:text-2xl font-bold text-center text-blue-700 mb-4">Đăng ký trở thành nhà bán hàng</h2>
                <div className="border p-4 md:p-6 lg:p-10 shadow">
                    {/* Thanh bước tiến trình */}
                    <div className="flex flex-col md:flex-row items-center px-4 md:px-8 pb-6 border-b">
                        {['Thông tin cửa hàng', 'Thông tin mã thuế', 'Thông tin định danh', 'Hoàn tất'].map((step, index) => (
                            <div key={index} className="flex flex-col md:flex-row items-center md:space-x-2">
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-8 h-8 border-2 rounded-sm ${
                                            currentStep === index + 1
                                                ? 'border-blue-500 bg-blue-500 text-white'
                                                : 'border-gray-300 bg-white text-gray-500'
                                        } flex items-center justify-center`}
                                    >
                                        {index + 1}
                                    </div>
                                    <div
                                        className={`${
                                            currentStep === index + 1 ? 'text-blue-500 font-semibold' : 'text-gray-500'
                                        } mt-2 text-sm md:text-base`}
                                    >
                                        {step}
                                    </div>
                                </div>
                                {index !== 3 && (
                                    <div
                                        className={`hidden md:block w-24 h-1 ${
                                            currentStep > index + 1 ? 'bg-blue-500' : 'bg-gray-300'
                                        } mx-3`}
                                    ></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Form 1 */}
                    {currentStep === 1 && (
                        <form className="space-y-4 py-6 px-2 md:px-6 lg:px-10 border-b">
                            <div className="flex items-center justify-between">
                                <label className="block text-gray-700 font-semibold w-1/4">Tên shop</label>
                                <input
                                    type="text"
                                    className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    placeholder="Nhập tên shop"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="block text-gray-700 font-semibold w-1/4">Địa chỉ</label>
                                <div className="w-3/4 ml-2 flex items-center">
                                    <span>Số 41, Thới phong A, Thới An, Ô Môn, Cần Thơ</span>
                                    <button className="ml-auto text-sm text-blue-600 font-bold">Chỉnh sửa địa chỉ</button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="block text-gray-700 font-semibold w-1/4">Tên công ty (nếu có)</label>
                                <input
                                    type="text"
                                    className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    placeholder="Nhập tên công ty"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="block text-gray-700 font-semibold w-1/4">Email</label>
                                <input
                                    type="email"
                                    className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    placeholder="Nhập email"
                                />
                            </div>

                            <div className="flex items-center justify-between pb-4">
                                <label className="block text-gray-700 font-semibold w-1/4">Số điện thoại</label>
                                <input
                                    type="tel"
                                    className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    placeholder="Nhập số điện thoại"
                                />
                            </div>
                        </form>
                    )}

                    {/* Form 2 */}
                    {currentStep === 2 && (
                        <form className="space-y-4 py-6 px-2 md:px-6 lg:px-10 border-b">
                            <div className="flex items-center justify-between">
                                <label className="block text-gray-700 font-semibold w-1/4">Địa đăng ký kinh doanh</label>
                                <input
                                    type="text"
                                    className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    placeholder="Nhập địa chỉ đăng ký kinh doanh"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="block text-gray-700 font-semibold w-1/4">Loại hình kinh doanh</label>
                                <div className="w-3/4 flex space-x-6">
                                    <label className="flex items-center space-x-2">
                                        <input type="radio" name="businessType" value="personal" className="text-blue-600" />
                                        <span>Cá nhân</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="radio" name="businessType" value="household" className="text-blue-600" />
                                        <span>Hộ kinh doanh</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="radio" name="businessType" value="company" className="text-blue-600" />
                                        <span>Công ty</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center justify-between">
                                    <label className="block text-gray-700 font-semibold w-1/4">Mã số thuế</label>
                                    <input
                                        type="text"
                                        className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        placeholder="Nhập mã số thuế"
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-1 ml-1/4">
                                    Người Bán phải cung cấp thông tin Mã số thuế cho sàn Thương mại điện tử.
                                </p>
                            </div>
                        </form>
                    )}

                    {/* Form 3 */}
                    {currentStep === 3 && (
                        <form className="space-y-4 py-6 px-2 md:px-6 lg:px-10 border-b">
                            <div className="flex items-center justify-between">
                                <label className="block text-gray-700 font-semibold w-1/4">Hình thức định danh</label>
                                <div className="w-3/4 flex space-x-6">
                                    <label className="flex items-center space-x-2">
                                        <input type="radio" name="idType" value="cccd" defaultChecked className="text-blue-600" />
                                        <span>Căn cước công dân</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input type="radio" name="idType" value="passport" className="text-blue-600" />
                                        <span>Hộ chiếu</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="block text-gray-700 font-semibold w-1/4">Số căn cước công dân</label>
                                <input
                                    type="text"
                                    className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                    placeholder="Nhập số CCCD"
                                />
                            </div>

                            <div className="flex flex-col">
                                <div className="flex items-center justify-between">
                                    <label className="block text-gray-700 font-semibold w-1/4">Họ và tên</label>
                                    <input
                                        type="text"
                                        className="w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                        placeholder="Nhập họ và tên"
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-1 ml-1/4">Theo CMND/CCCD/Hộ Chiếu</p>
                            </div>

                            <div className="flex space-x-6 mt-3">
                                <div className="flex flex-col items-center w-1/3">
                                    <label className="text-gray-700 font-semibold mb-2 text-center">Hình chụp của thẻ CCCD/Hộ chiếu</label>
                                    <div className="relative w-24 h-24 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
                                        <span className="text-gray-400 text-2xl">+</span>
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                    </div>
                                </div>

                                <div className="flex flex-col items-center w-1/3">
                                    <label className="text-gray-700 font-semibold mb-2 text-center">Ảnh cầm CCCD/Hộ chiếu</label>
                                    <div className="relative w-24 h-24 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
                                        <span className="text-gray-400 text-2xl">+</span>
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                    </div>
                                </div>

                                <div className="flex flex-col items-center w-1/3">
                                    <label className="text-gray-700 font-semibold mb-2 text-center">Giấy phép kinh doanh</label>
                                    <div className="relative w-24 h-24 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
                                        <span className="text-gray-400 text-2xl">+</span>
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}

                    {/* Form 4 */}
                    {currentStep === 4 && (
                        <div className="flex items-center justify-center my-5 bg-gray-100">
                            <form className="bg-white border border-gray-300 rounded-lg shadow-lg p-8 text-center max-w-md">
                                <div className="text-green-500 text-6xl mb-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-16 w-16 mx-auto"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12l2 2 4-4m7 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Yêu cầu đăng ký bán hàng đã thành công!</h2>
                                <p className="text-gray-600 mb-6">
                                    Chúng tôi rất vui được hỗ trợ bạn. Đội ngũ của chúng tôi sẽ xem xét yêu cầu của bạn và sẽ liên hệ với
                                    bạn trong thời gian sớm nhất. Vui lòng kiểm tra email của bạn để biết thêm thông tin chi tiết.
                                </p>
                            </form>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row justify-between mt-6">
                        {currentStep > 1 && (
                            <button
                                onClick={prevStep}
                                className="bg-gray-300 text-gray-700 text-sm py-1 px-3 md:px-6 rounded-lg shadow-md hover:bg-gray-400 hover:text-white transition duration-300 ease-in-out"
                            >
                                Trở về
                            </button>
                        )}
                        <button
                            onClick={nextStep}
                            className={`mt-4 md:mt-0 ${currentStep > 1 ? 'ml-0 md:ml-auto' : 'ml-auto'}
                    bg-blue-600 text-white font-semibold text-sm py-2 px-4 md:px-6 rounded-lg shadow-md hover:bg-blue-500 hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105`}
                        >
                            {currentStep === 4 ? 'Hoàn tất' : 'Tiếp theo'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerRegister;
