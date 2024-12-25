import React, { useEffect } from 'react';
import '../../../src/index.css';
import $ from 'jquery';
import Header from '../../components/client/Header';
import Footer from '../../components/client/Footer';
window.jQuery = $;

const HomePages = () => {
    useEffect(() => {
        // OwlCarousel initialization for category carousel
        $('.category-carousel').owlCarousel({
            loop: true,
            margin: 26,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 3,
                },
                576: {
                    items: 3,
                },
                768: {
                    items: 4,
                },
                992: {
                    items: 5,
                },
                1200: {
                    items: 7,
                },
                1440: {
                    items: 9,
                },
            },
        });

        // OwlCarousel initialization for sale carousel
        $('.sale-carousel').owlCarousel({
            loop: true,
            margin: 26,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 2,
                },
                576: {
                    items: 2,
                },
                768: {
                    items: 3,
                },
                992: {
                    items: 4,
                },
                1200: {
                    items: 5,
                },
                1440: {
                    items: 6,
                },
            },
        });

        // OwlCarousel initialization for slide carousel
        $('.slide-carousel').owlCarousel({
            loop: false,
            margin: 26,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                },
                576: {
                    items: 1,
                },
                768: {
                    items: 1,
                },
                992: {
                    items: 1,
                },
                1200: {
                    items: 1,
                },
                1440: {
                    items: 1,
                },
            },
        });

        // Set average rating for star
        const averageRating = 4.2; // Rating trung bình
        const maxRating = 5;
        const starInner = document.querySelector('.star-inner');
        if (starInner) {
            starInner.style.width = `${(averageRating / maxRating) * 100}%`;
        }

        // Countdown function
        function startCountdown(duration, display) {
            let timer = duration,
                hours,
                minutes,
                seconds;
            setInterval(function () {
                hours = parseInt(timer / 3600, 10);
                minutes = parseInt((timer % 3600) / 60, 10);
                seconds = parseInt(timer % 60, 10);

                hours = hours < 10 ? '0' + hours : hours;
                minutes = minutes < 10 ? '0' + minutes : minutes;
                seconds = seconds < 10 ? '0' + seconds : seconds;

                display[0].textContent = hours;
                display[1].textContent = minutes;
                display[2].textContent = seconds;

                if (--timer < 0) {
                    timer = duration;
                }
            }, 1000);
        }

        // Set initial countdown time (in seconds)
        let countdownHours = 27 * 3600 + 16 * 60 + 58;
        let display = document.querySelectorAll('.countdown-time');
        startCountdown(countdownHours, display);
    }, []); // Chạy once khi component mount

    return (
        <div>
            <Header/>
            {/* BannerHome */}
            <section className="banner-home">
                <div className="container">
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-7 cot-trai">
                            <div className="slide-carousel owl-carousel owl-theme">
                                <div className="slide-item">
                                    <div className="slide-item__content">
                                        <div className="slide-left">
                                            <img src="/assets/client/images/banner1.png" alt="Banner 1" className="slide-img" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-5 space-y-2 cot-phai">
                            <img src="/assets/client/images/banner2.png" alt="Other" />
                            <img src="/assets/client/images/banner3.png" alt="Other" />
                        </div>
                    </div>
                </div>
            </section>
            {/* End BannerHome */}

            {/* SubBanner */}
            <section className="sec-banner">
                <div className="container subBanner">
                    <div className="grid grid-cols-12 subBanner-item">
                        <div className="col-span-3">
                            <div className="subBanner-item-top">
                                <img src="/assets/client/icon/Voucher.svg" alt="" />
                                <h1>Vouchers</h1>
                            </div>
                            <div className="subBanner-item-bottom">
                                <p>Vouchers</p>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="subBanner-item-top">
                                <img src="/assets/client/icon/Tym.svg" alt="" />
                                <h1>Top yêu Thích</h1>
                            </div>
                            <div className="subBanner-item-bottom">
                                <p>Top Yêu Thích</p>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="subBanner-item-top">
                                <img src="/assets/client/icon/Live.svg" alt="" />
                                <h1>LiveStream</h1>
                            </div>
                            <div className="subBanner-item-bottom">
                                <p>LiveStream</p>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="subBanner-item-top">
                                <img src="/assets/client/icon/Sale.svg" alt="" />
                                <h1>FlashSale</h1>
                            </div>
                            <div className="subBanner-item-bottom">
                                <p>FlashSale</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End SubBanner */}

            {/* List Category */}
            <section className="list-category">
                <div className="container sub-cate">
                    <div className="heading">
                        <h2>Danh mục</h2>
                    </div>
                    <div className="category-carousel owl-carousel owl-theme">
                        {/* Repeat category items as needed */}
                        {['Alime', 'Mavel', 'Car', 'Plane', 'Game'].map((category, index) => (
                            <div className="category-item" key={index}>
                                <div className="category-item__content">
                                    <div className="category-left">
                                        <img src={`/assets/client/images/image-${index}.png`} alt="" />
                                        <p>{category}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* End List Category */}

            {/* Start Sale */}
            <section className="list-sale">
                <div className="container sub-sale">
                    <div className="heading list-sale__text">
                        <div className="start">
                            <h2 className="flash-sale-text">Flash Sale</h2>
                            <h2 className="on-sale-text">On Sale Now</h2>
                            <h2 className="ending-in-text">Ending in:</h2>
                            <div className="countdown">
                                <span className="countdown-time">27</span>
                                <span>:</span>
                                <span className="countdown-time">16</span>
                                <span>:</span>
                                <span className="countdown-time">58</span>
                            </div>
                        </div>
                        <div className="end">
                            <a href="">SHOP ALL PRODUCTS</a>
                        </div>
                    </div>
                    <div className="sale-carousel owl-carousel owl-theme ">
                        {/* Repeat product items as needed */}
                        {Array(4)
                            .fill(null)
                            .map((_, index) => (
                                <div className="card-item" key={index}>
                                    <img src="/assets/client/images/Produc-1.png" alt="" />
                                    <div className="product-content">
                                        <p>Mô hình Roronoa Zoro....</p>
                                        <span>475,000đ</span>
                                        <label>
                                            <p>528,000đ</p>
                                            <p>-10%</p>
                                        </label>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
            {/* End Sale */}

            {/* Start Product */}
            <section className="home-product">
                <div className="container sub-product">
                    <div className="heading-product">
                        <h2>Sản Phẩm Dành Cho Bạn</h2>
                    </div>
                    <div className="product">
                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                            {/* Repeat product items as needed */}
                            {Array(6)
                                .fill(null)
                                .map((_, index) => (
                                    <div className="product-item" key={index}>
                                        <div class="card-product">
                                            <img src="/assets/client/images/Produc-1.png" alt="" />
                                            <div class="product-content">
                                                <p>Mô hình Roronoa Zoro....</p>
                                                <span>475,000đ</span>
                                                <label>
                                                    <p>528,000đ</p>
                                                    <p>-10%</p>
                                                </label>
                                                <label class="footer-card-product">
                                                    <div class="star-rating">
                                                        <div class="star-outer">
                                                            <div class="star-inner"></div>
                                                        </div>
                                                    </div>
                                                    <p>đã bán: 7,2k</p>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div class="product-buttom">
                        <a href="" class="buttom">
                            Xem Thêm
                        </a>
                    </div>
                </div>
            </section>
            {/* End Product */}
            <Footer/>
        </div>
    );
};

export default HomePages;
