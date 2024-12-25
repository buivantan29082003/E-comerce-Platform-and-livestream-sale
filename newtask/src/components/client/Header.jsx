import React from 'react';

const Header = () => {
    return (
        <div>
            {/* Desktop Navigation */}
            <header className="nav-pc">
                <div className="container">
                    <nav className="bg-white">
                        <div className="bg-white py-2">
                            <div className="flex justify-between items-center">
                                <div className="flex space-x-6">
                                    <a href="#" className="text-sm text-gray-600">
                                        {' '}
                                        Kênh Người Bán{' '}
                                    </a>
                                    <a href="#" className="text-sm text-gray-600 flex items-center">
                                        Kết Nối
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                                            alt="icon"
                                            className="ml-2 w-4 h-4"
                                        />
                                    </a>
                                </div>

                                <div className="flex space-x-6 items-center">
                                    <a href="#" className="text-sm text-gray-600 flex items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 mr-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 16h-1v-4h-1m4 4h-1v-4h-1m4 4h-1v-4h-1m4 4h-1v-4h-1m4 4h-1v-4h-1M7 16h1v-4H7m4 4h1v-4h-1M3 10h1v4H3m4-4h1v4H7m4-4h1v4h1m4-4h1v4h1m4-4h1v4h1"
                                            />
                                        </svg>
                                        Thông Báo
                                    </a>
                                    <a href="#" className="text-sm text-gray-600">
                                        {' '}
                                        Hỗ Trợ{' '}
                                    </a>
                                    <a href="#" className="text-sm text-gray-600">
                                        {' '}
                                        Tiếng Việt{' '}
                                    </a>
                                    <a href="#" className="text-sm text-gray-600 flex items-center">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                            alt="profile"
                                            className="w-8 h-8 rounded-full"
                                        />
                                        <span className="ml-2">Tài Khoản</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="row header-container flex justify-between items-center py-4">
                            <div className="col-md-3">
                                <h1 className="logo text-2xl font-bold">MODEL WORLD</h1>
                            </div>

                            <div className="col-md-7 flex justify-center p-4">
                                <form action="" className="relative search-container">
                                    <input type="search" className="block find text-gray-900" placeholder="Search in ModelWorld" />
                                    <button type="submit" className="search-button">
                                        <svg
                                            className="w-4 h-4"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                            />
                                        </svg>
                                        <span className="sr-only">Search</span>
                                    </button>
                                </form>
                            </div>

                            <div className="col-md-2 p-2">
                                <a href="#" className="cart text-purple-600">
                                    <img src="/assets/client/icon/grocery-store.png" alt="cart" /> {/* Đường dẫn tương đối */}
                                </a>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Mobile Navigation */}
            <header className="nav-mobile">
                <div className="container">
                    <nav className="bg-white py-2">
                        <div className="flex justify-between items-center">
                            <div className="menu-button">
                                <button id="menuToggle" className="text-gray-600">
                                    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt="menu" className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="logo text-2xl font-bold text-center">MODEL WORLD</div>

                            <div className="flex items-center space-x-4">
                                <a href="#" className="text-gray-600 flex items-center">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                                        alt="profile"
                                        className="w-8 h-8 rounded-full"
                                    />
                                </a>
                                <a href="#" className="cart text-purple-600">
                                    <img src="../../assets/images/Cate-1.png" alt="cart" className="w-6 h-6" /> {/* Đường dẫn tương đối */}
                                </a>
                            </div>
                        </div>

                        <div id="mobileMenu" className="mobile-menu hidden">
                            <ul className="space-y-2">
                                <li>
                                    <a href="#" className="block text-gray-600">
                                        Kênh Người Bán
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="block text-gray-600">
                                        Kết Nối
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="block text-gray-600">
                                        Thông Báo
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="block text-gray-600">
                                        Hỗ Trợ
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="block text-gray-600">
                                        Tiếng Việt
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default Header;
