import { Link, Outlet } from 'react-router-dom';
import Header from './Header';
import { useEffect, useState } from 'react';
import { RiBillLine } from 'react-icons/ri';
import { AiOutlineProduct } from 'react-icons/ai';
import { SiMakerbot } from 'react-icons/si';
import { DiDatabase } from 'react-icons/di';
import React from 'react';
import { FcRatings } from 'react-icons/fc';
// import toast, { Toaster } from 'react-hot-toast';

const MainSeller = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [expandedItem, setExpandedItem] = useState(null);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleAccordion = (index) => {
        setExpandedItem(expandedItem === index ? null : index);
    };

    const [tabs, setTab] = useState(
        [
            {
                tabName:"Hóa đơn",
                icon:<RiBillLine color="blue" className="mr-2"/>,
                subTab:[{tabName:"Hóa đơn",link:"/seller/order"},{tabName:"Tổng quan",link:"/seller/dashboard"}]
            },
            {
                tabName:"Sản phẩm",
                icon:<AiOutlineProduct color="blue" className="mr-2"/>,
                subTab:[{tabName:"Tất cả",link:"/seller/product"},{tabName:"Thêm sản phẩm",link:"/seller/newproduct"}]
            },
            
            {
                tabName:"Voucher",
                icon:<DiDatabase color="blue" className="mr-2"/>,
                subTab:[{tabName:"Tất cả",link:"/seller/voucher/0"},{tabName:"Thêm voucher",link:"/seller/newvoucher"}]
            },
            {
                tabName:"Live của shop",
                icon:<SiMakerbot color="blue" className="mr-2"/>,
                subTab:[{tabName:"Tất cả",link:"/seller/live"},{tabName:"Tạo live",link:"/seller/newlive"}]
            },
            {
                tabName:"Chat",
                icon:<SiMakerbot color="blue" className="mr-2"/>,
                subTab:[{tabName:"Chat",link:"/seller/chat"}]
            },
            {
                tabName:"Khuyến mãi",
                icon:<SiMakerbot color="blue" className="mr-2"/>,
                subTab:[{tabName:"Tất cả",link:"/seller/khuyenmai"},{tabName:"Thêm khuyến mãi",link:"/seller/newkhuyenmai"}]
            },
            {
                tabName:"Đánh giá của shop",
                icon:<FcRatings color="blue" className="mr-2"/>,
                subTab:[{tabName:"Xem đánh giá",link:"/seller/review"}]
            },
            {
                tabName:"Shop của bạn",
                icon:<FcRatings color="blue" className="mr-2"/>,
                subTab:[{tabName:"Cập nhật thông tin shop",link:"/seller/shopinfo"},{tabName:"Cập nhật địa chỉ",link:"/seller/updateadress"}]
            },

        ]
    );
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setIsOpen(false);
            } else {
                setIsOpen(true);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="w-full" >
            <Header />
            
            <div className="flex  bg-gray-100">
                {/* Sidebar */}
                <div
                    style={{ borderRadius: '0 25px 0 0', height: '680px' }}
                    className={`bg-white p-3  border-r-2 border-gray-300 relative transition-all duration-500 ${
                        isOpen ? 'w-4/12 sm:w-4/12 lg:w-1/6' : 'w-1/12 sm:w-3/12 lg:w-1/12'
                    }`}
                >
                    {/* {isOpen ? (
                        <>
                            <img
                                style={{ width: '30px', display: 'inline-block', marginRight: '2px' }}
                                src="https://cf.shopee.vn/file/6b1ffcde1ff12621088110f419a5283a"
                                alt="Sidebar Icon"
                            />
                            LOGO
                        </>
                    ) : null} */}

                    <div
                        onClick={toggleSidebar}
                        style={{ backgroundColor: 'white', zIndex: '999' }}
                        className="text-white rounded-full absolute top-5 -right-4 cursor-pointer"
                    >
                        <span
                            onClick={toggleSidebar}
                            style={{ width: '10px', height: '10px', fontSize: '5px' }}
                            className="text-center relative inline-flex items-center px-3 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50"
                        >
                            <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                            <span className="absolute right-0 text-center flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </span>
                        </span>
                    </div>

                    {/* Accordion Section */}
                    <div className="mt-6 space-y-4" style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        {tabs.map((v,index)=><div className="accordion-item hover:bg-gray-50 text-black rounded-md transition ease-in-out duration-150 hover:bg-indigo-50 hover:scale-105 transform">
                            <button className="w-full flex justify-between items-center p-3" onClick={() => toggleAccordion(index)}>
                                <div className="flex items-center text-center">
                                    {v.icon}
                                    {isOpen && <span className="text-sm font-semibold text-black-600">{v.tabName}</span>}
                                </div>
                                {isOpen && (
                                    <svg
                                        color="gray"
                                        className={`w-5 h-5 transition-transform duration-300 ${expandedItem === index ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                )}
                            </button>
                            <div
                                className={`mt-2 overflow-hidden transition-max-height duration-500 ${
                                    expandedItem === index ? 'max-h-40' : 'max-h-0'
                                }`}
                            >
                                {isOpen && (
                                    <>
                                        {v.subTab.map((vv)=><Link to={vv.link} style={{ textDecoration: 'none' }}>
                                            <span className="block px-4 py-2 text-xs">{vv.tabName} </span>
                                        </Link>)}
                                    </>
                                )}
                            </div>
                        </div>)}
                        
                    </div>
                </div>

                {/* Main content */}
                <div
                    style={{ height: '640px',scrollbarWidth:"thin" }}
                    className={`md:overflow-scroll ml-0 flex-grow h-full transition-all duration-500 ${
                        isOpen ? 'w-8/12 sm:w-8/12 lg:w-5/6' : 'w-11/12 sm:w-9/12 lg:w-11/12'
                    }`}
                    >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
export default MainSeller;

