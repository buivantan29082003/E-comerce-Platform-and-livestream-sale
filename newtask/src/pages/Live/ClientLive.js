import { Badge } from '@mui/material';
import React from 'react';
import { BiCart, BiHeartCircle, BiLike, BiUser } from 'react-icons/bi';

const ClientLive = () => {
    return (
        <>
            <div className="bg-black w-full">
                {/* Header section */}
                <div className="relative bg-black flex flex-col md:flex-row w-full pl-6 pr-6">
                    {/* Left Section */}
                    <div className="bg-black-500 relative lg:mt-3 w-full md:w-full p-4" style={{ height: '480px' }}>
                        <div className="flex items-center bg-gray-900 text-white p-3 rounded-lg w-full space-x-4">
                            {/* Avatar */}
                            <img src="https://via.placeholder.com/40" alt="avatar" className="w-10 h-10 rounded-full" />

                            {/* User info and details */}
                            <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                    <span className="text-base font-semibold mr-4">
                                        HAMMI |{' '}
                                        <span className="material-icons">
                                            <BiUser size={13} className="d-inline" />
                                        </span>
                                        <span>
                                            {' '}
                                            281 <BiHeartCircle color="red" size={30} className="d-inline-block ml-3" />{' '}
                                        </span>
                                    </span>
                                </div>
                                <div className="text-xs text-gray-400 flex items-center space-x-1">
                                    <span>SALE UP TOO 70% 🔥🔥🔥</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center space-x-4 text-gray-400 text-sm">
                                <div className="flex items-center space-x-1">
                                    <span className="material-icons">
                                        {' '}
                                        <BiLike />{' '}
                                    </span>
                                    <span>43.3K</span>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex items-center space-x-2">
                                <Badge
                                    badgeContent={4}
                                    color="warning"
                                    sx={{
                                        '& .MuiBadge-dot': {
                                            backgroundColor: 'white', // Màu nền của số
                                        },
                                        '& .MuiBadge-dot span': {
                                            color: 'red', // Màu chữ của số
                                        },
                                    }}
                                >
                                    <BiCart color="yellow" size={20} />
                                </Badge>
                            </div>
                        </div>

                        {/* Responsive video iframe */}
                        <div
                            className="iframe-container mt-8"
                            style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}
                        >
                            <iframe frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} width="914" height="514" src="https://www.youtube.com/embed/yrviw5RysnE" title="SHOPEE 9.9 SIÊU NHẠC HỘI - SIÊU NHÓM BÍ ẨN | Đắm chìm cùng các tiết mục từ SOOBIN, Rhymastic,..." frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                             referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div
                        className="ml-7 mr-7 mt-8 rounded-lg bg-gray-950 text-white w-full md:w-4/12 p-4 md:relative absolute left-0 bottom-0 sm:h-1/2 md:h-full bg-opacity-0 md:bg-opacity-100"
                        style={{ height: '630px' }}
                        >
                        <div className="relative h-full flex flex-col-reverse overflow-y-auto pb-4">
                            {/* Input for comments */}
                            <div className="p-2">
                                <div className="w-full max-w-sm min-w-[200px]">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            className="w-full pl-3 pr-10 py-2 bg-transparent placeholder:text-slate-400 text-slate-600 text-sm border border-slate-200 rounded-md transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                                            placeholder="Type here..."
                                        />
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="absolute w-5 h-5 top-2.5 right-2.5 text-slate-600"
                                        >
                                            <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Comments */}
                            <div className="flex bg-black-500 flex-col-reverse space-y-2 space-y-reverse p-2">
                                <Comment avatar="https://via.placeholder.com/40" username="byna" message="Hay z bây" />
                                <Comment
                                    avatar="https://via.placeholder.com/40"
                                    username="byna"
                                    message=">Chào mừng bạn đến với TikTok LIVE! ❤️ Chúc bạn vui vẻ khi tương tác với mọi người trong thời gian thực..."
                                />
                                <Comment
                                    avatar="https://via.placeholder.com/40"
                                    username="byna"
                                    message=">đỉnh ❤️ Chúc bạn vui vẻ khi tương tác với mọi người trong thời gian thực..."
                                />
                            </div>
                            
                        </div>
                        <div className="flex items-center bg-gray-900 text-white p-3 rounded-lg w-full space-x-4">
                            <EmojiSection/>
                        </div>
                        
                    </div>
                </div>

                <br />
                <br />
                <br />
                {/* Recommended Videos Section */}
                <h2 className="text-2xl bg-black font-semibold text-white px-6 p-12 pt-14 m-0" style={{ borderTop: '1px dashed white' }}>
                    Video LIVE được đề xuất
                </h2>
                <div className="grid grid-cols-1 bg-black sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
                    <VideoCard title="cày game tí rồi ngủ Zzz.." viewer="Chuối" />
                    <VideoCard title="cày game tí rồi ngủ Zzz.." viewer="Chuối" />
                    <VideoCard title="cày game tí rồi ngủ Zzz.." viewer="Chuối" />
                    <VideoCard title="cày game tí rồi ngủ Zzz.." viewer="Chuối" />
                </div>
            </div>
        </>
    );
};

// Comment Component
const Comment = ({ avatar, username, message }) => (
    <div className="flex items-center space-x-3 p-1 text-white rounded-lg max-w-sm align-items-start">
        <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />
        <div>
            <p className="text-sm font-semibold text-gray-300">{username}</p>
            <p className="text-xs font-medium text-white">{message}</p>
        </div>
    </div>
);

// Video Card Component
const VideoCard = ({ title, viewer }) => (
    <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg group">
        <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8T0am5e-ARwfHNoUXfTamob0KQvo3t5mvgw&s"
            alt="Live thumbnail"
            className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">0 người xem</div>
        <div className="absolute top-2 right-2 bg-pink-500 text-white text-sm px-2 py-1 rounded">LIVE</div>
        <div className="p-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-400 text-sm">{viewer}</p>
        </div>
    </div>
);
const EmojiSection = React.memo(() => {
    return (
        <div className="flex items-center bg-gray-900 text-white p-3 rounded-lg w-full space-x-4">
            {/* EMOJI cố định jko đổi  */}
            <img src="https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/resource/9578adce6e3da2d211583212bdfd1b0e.png~tplv-obj.webp" className="w-[30px]" />
            <img src="https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/eba3a9bb85c33e017f3648eaf88d7189~tplv-obj.webp" className="w-[30px]" />
            <img src="https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/485175fda92f4d2f862e915cbcf8f5c4~tplv-obj.webp" className="w-[30px]" />
            <img src="https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/4e7ad6bdf0a1d860c538f38026d4e812~tplv-obj.webp" className="w-[30px]" />
            <img src="https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/7244832db46b7ea5d7d6e280719ddea2~tplv-obj.webp" className="w-[30px]" />
            <img src="https://p16-webcast.tiktokcdn.com/img/maliva/webcast-va/a4c4dc437fd3a6632aba149769491f49.png~tplv-obj.webp" className="w-[30px]" />
        </div>
    );
});
export default ClientLive;
