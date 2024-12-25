import React, { useEffect, useState } from "react";
// import "../../../src/style.css";
import Swiper from "../../assets/client/js/swiper-bundle.min.js"; // Import Swiper
import "../../assets/client/css/swiper-bundle.min.css"; // Import CSS cho Swiper
import "../../assets/client/css/animate.css";
// import products from "../../data/json/products.json";
// import categories from "../../data/json/category.json";
// import saleProducts from "../../data/json/saleProducts.json"; // Giả sử file JSON ở cùng thư mục
import "../../assets/client/fonts/font-icons.css";
import "../../assets/client/fonts/fonts.css";
import { Link } from "react-router-dom"; // Thêm import này
import $ from "jquery";
import axios from "axios";
window.jQuery = $;

const HomePage = () => {
  // Tạo state để lưu trữ danh sách sản phẩm
  const [products, setProducts] = useState([]); // Quản lý sản phẩm
  const [error, setError] = useState(null); // Quản lý lỗi
  const [page, setPage] = useState(0); // Quản lý trang hiện tại
  const [loading, setLoading] = useState(false); // Quản lý trạng thái loading
  const isLogin = true; // Kiểm tra trạng thái đăng nhập
  const userId = 1; // ID người dùng (ví dụ)
  const encodedUserId = encodeURIComponent(userId);

  // URL API dựa trên trạng thái đăng nhập
  let url = "http://localhost:8080/home/getProductOnHome"; // API cho người chưa đăng nhập

  if (isLogin) {
    url = `http://localhost:8080/home/getProducLoginIn?userId=${encodedUserId}`; // API cho người đã đăng nhập
  }

  // Hàm gọi API
  const getProduct = async () => {
    setLoading(true); // Bắt đầu loading
    try {
      const response = await axios.get(`${url}&page=${page}`); // Gọi API và thêm tham số trang
      const data = response.data.data; // Dữ liệu trả về từ API

      // Chuyển đổi dữ liệu API thành mảng các đối tượng sản phẩm
      const mappedProducts = data.map((item) => ({
        id: item[0],
        CuaHang_id: item[1],
        TenSanPham: item[2],
        TheLoai_id: item[3],
        SoLuong: item[4],
        MoTa: item[5],
        HinhAnh: item[6],
        TrangThai: item[7],
        Video: item[8],
        ThuongHieu_id: item[9],
        LuotBan: item[10],
        GiaBan: item[11],
      }));

      // Cập nhật danh sách sản phẩm
      setProducts((prevProducts) => [...prevProducts, ...mappedProducts]);
      setPage((prevPage) => prevPage + 1); // Tăng trang khi load thêm
    } catch (error) {
      setError("Không thể tải thông tin sản phẩm");
      console.error("Lỗi khi gọi API:", error);
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };

  const handleLoadMore = () => {
    getProduct(); // Gọi hàm khi nhấn nút "Load more"
  };

  // Gọi API khi component tải
  useEffect(() => {
    getProduct();
  }, []); // Chạy khi component lần đầu render

  // Duyệt qua sản phẩm khi products được cập nhật
  useEffect(() => {
    if (products.length > 0) {
      console.log("Dữ liệu sản phẩm đã cập nhật: ", products);
      products.forEach((product) => {
        console.log("Thông tin sản phẩm: ", product);
      });
    }
  }, [products]); // Chạy khi products thay đổi

  useEffect(() => {
    // Hàm khởi tạo cho các carousel
    const initCarousels = () => {
      // OwlCarousel initialization for category carousel
      $(".category-carousel").owlCarousel({
        loop: true,
        margin: 26,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
          0: { items: 4 },
          576: { items: 5 },
          768: { items: 7 },
          992: { items: 7 },
          1200: { items: 7 },
          1440: { items: 9 },
        },
      });

      // OwlCarousel initialization for sale carousel
      $(".sale-carousel").owlCarousel({
        loop: true,
        margin: 26,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
          0: { items: 2 },
          576: { items: 3 },
          768: { items: 4 },
          992: { items: 4 },
          1200: { items: 5 },
          1440: { items: 6 },
        },
      });

      // OwlCarousel initialization for slide carousel
      $(".slide-carousel").owlCarousel({
        loop: false,
        margin: 26,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
          0: { items: 1 },
          576: { items: 1 },
          768: { items: 1 },
          992: { items: 1 },
          1200: { items: 1 },
          1440: { items: 1 },
        },
      });
    };

    // Gọi hàm khởi tạo sau khi DOM đã sẵn sàng
    const timeoutId = setTimeout(() => {
      initCarousels();
      const swiper = new Swiper(".tf-sw-slideshow", {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        autoplay: false, // Manual control only
        speed: 1000,
        pagination: {
          el: ".sw-pagination-slider",
          clickable: true, // Allows clicking on dots
        },
        lazy: true,
        on: {
          slideChange: function () {
            const activeIndex = this.realIndex; // Use 'this' to refer to the current Swiper instance
            console.log("Slide changed to: ", activeIndex);
          },
        },
      });
    }, 0);

    // Set average rating for star
    const averageRating = 4.2; // Rating trung bình
    const maxRating = 5;
    const starInner = document.querySelector(".star-inner");
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

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

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
    let display = document.querySelectorAll(".countdown-time");
    startCountdown(countdownHours, display);

    // Cleanup function to avoid memory leaks
    return () => clearTimeout(timeoutId);
  }, []); // Chạy once khi component mount

  return (
    <>
      <div className="container">
        <div className="row mt-3">
          <div className="col-lg-7">
            <div className="tf-slideshow slider-radius slider-effect-fade position-relative">
              <div className="swiper tf-sw-slideshow">
                <div className="swiper-wrapper">
                  <div className="swiper-slide" lazy="true">
                    <div className="wrap-slider">
                      <img
                        className="lazyload"
                        data-src="/assets/client/images/Banner_Slide_1.png"
                        src="/assets/client/images/Banner_Slide_1.png"
                        alt="hp-slideshow-01"
                      />
                    </div>
                  </div>
                  <div className="swiper-slide" lazy="true">
                    <div className="wrap-slider row-end">
                      <img
                        className="lazyload"
                        data-src="/assets/client/images/Banner_Slide_2.png"
                        src="/assets/client/images/Banner_Slide_2.png"
                        alt="hp-slideshow-02"
                      />
                    </div>
                  </div>
                  <div className="swiper-slide" lazy="true">
                    <div className="wrap-slider">
                      <img
                        className="lazyload"
                        data-src="/assets/client/images/Banner_Slide_3.png"
                        src="/assets/client/images/Banner_Slide_3.png"
                        alt="hp-slideshow-03"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="wrap-pagination">
                <div className="container">
                  <div className="sw-dots line-white-pagination sw-pagination-slider justify-content-center"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 cot-phai">
            <img
              src="/assets/client/images/Banner2.png"
              alt="Other"
              className=" "
            />
            <img
              src="/assets/client/images/banner3.png"
              alt="Other"
              className
            />
          </div>
        </div>
      </div>

      <section className="sec-banner">
        <div className="container subBanner">
          <div className="grid grid-cols-12 subBanner-item">
            <div className="col-span-3">
              <div className="subBanner-item-top">
                <img src="/assets/client/images/icon/Voucher.svg" alt />
                <h1>Vouchers</h1>
              </div>
              <div className="subBanner-item-bottom">
                <p>Vouchers</p>
              </div>
            </div>
            <div className="col-span-3">
              <div className="subBanner-item-top">
                <img src="/assets/client/images/icon/Tym.svg" alt />
                <h1>Top yêu Thích</h1>
              </div>
              <div className="subBanner-item-bottom">
                <p>Top Yêu Thích</p>
              </div>
            </div>
            <div className="col-span-3">
              <div className="subBanner-item-top">
                <img src="/assets/client/images/icon/Live.svg" alt />
                <h1>LiveStream</h1>
              </div>
              <div className="subBanner-item-bottom">
                <p>LiveStream</p>
              </div>
            </div>
            <div className="col-span-3">
              <div className="subBanner-item-top">
                <img src="/assets/client/images/icon/Sale.svg" alt />
                <h1>FlashSale</h1>
              </div>
              <div className="subBanner-item-bottom">
                <p>FlashSale</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="list-category">
        <div className="container">
          <div className="headpd">
            <h2>Danh mục</h2>
          </div>
          <div className="category-carousel owl-carousel owl-theme">
            {/* {categories.map((category) => (
              <div className="category-item" key={category.id}>
                <div className="category-item__content">
                  <div className="category-left">
                    <img src={category.image} alt={category.name} />
                    <p>{category.name}</p>
                  </div>
                </div>
              </div>
            ))} */}  >>>>
          </div>
        </div>
      </section>

      <section className="list-sale">
        <div className="container">
          <div className="headpd list-sale__text">
            <div className="start">
              <span className="flash-sale-text ">Flash Sale</span>
              <span className="on-sale-text">On Sale Now</span>
              <span className="ending-in-text">Ending in:</span>
              <div className="countdown">
                <span className="countdown-time">27</span>
                <span>:</span>
                <span className="countdown-time">16</span>
                <span>:</span>
                <span className="countdown-time">58</span>
              </div>
            </div>
            <div className="endpd">
              <a href="#">SHOP ALL PRODUCTS</a>
            </div>
          </div>

          <div className="sale-carousel owl-carousel owl-theme">
            {/* {saleProducts.map((product) => (
              <div className="card-item" key={product.id}>
                <img src={product.image} alt={product.name} />
                <div className="product-content">
                  <p>{product.name}</p>
                  <span>{product.price}</span>
                  <label>
                    <p>{product.oldPrice}</p>
                    <p>{product.discount}</p>
                  </label>
                </div>
              </div>
            ))} */}  >>>>
          </div>
        </div>
      </section>

      <section className="flat-spacing-5 pt_0 flat-seller">
        <div className="container mt-5">
          <div className="heading-product">
            <h2>Sản Phẩm Dành Cho Bạn</h2>
          </div>
          <div
            className="grid-layout loadmore-item wow fadeInUp mt-4"
            data-wow-delay="0s"
            data-grid="grid-6"
          >
            {products.map((product) => (
              <div className="card-product" key={product.id}>
                <div className="card-product-wrapper">
                  {/* Thay đổi từ <a> thành <Link> */}
                  <Link to={`/product/${product.id}`} className="product-img">
                    <img
                      className="lazyload img-product"
                      data-src={product.HinhAnh}
                      src={product.HinhAnh}
                      alt={product.TenSanPham}
                    />
                    <img
                      className="lazyload img-hover"
                      data-src={product.hoverImage}
                      src={product.hoverImage}
                      alt={product.name}
                    />
                  </Link>
                  <div className="list-product-btn">
                    <a
                      href="#quick_add"
                      data-bs-toggle="modal"
                      className="box-icon bg_white quick-add tf-btn-loading"
                    >
                      <span className="icon icon-bag"></span>
                      <span className="tooltip">Quick Add</span>
                    </a>
                    <a
                      href="#"
                      className="box-icon bg_white wishlist btn-icon-action"
                    >
                      <span className="icon icon-heart"></span>
                      <span className="tooltip">Add to Wishlist</span>
                      <span className="icon icon-delete"></span>
                    </a>
                    <a
                      href="#compare"
                      data-bs-toggle="offcanvas"
                      aria-controls="offcanvasLeft"
                      className="box-icon bg_white compare btn-icon-action"
                    >
                      <span className="icon icon-compare"></span>
                      <span className="tooltip">Add to Compare</span>
                      <span className="icon icon-check"></span>
                    </a>
                    <a
                      href="#quick_view"
                      data-bs-toggle="modal"
                      className="box-icon bg_white quickview tf-btn-loading"
                    >
                      <span className="icon icon-view"></span>
                      <span className="tooltip">Quick View</span>
                    </a>
                  </div>
                </div>
                <div className="card-product-info">
                  <div className="product-content">
                    <p>{product.TenSanPham}</p>
                    <span>{product.GiaBan}</span>
                    <label>
                      {/* <p>{product.oldPrice}</p>
                      <p>{product.discount}</p> */}
                    </label>
                    <label className="footer-card-product">
                      <div className="star-rating">
                        {/* <div className="star-outer">
                          <div
                            className="star-inner"
                            style={{ width: `${product.rating}%` }}
                          ></div>
                        </div> */}
                      </div>
                      <p>đã bán: {product.LuotBan}</p>
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center product-buttom p-5 tf-pagination-wrap view-more-button text-center">
            <button
              onClick={handleLoadMore}
              className="buttom tf-btn-loading tf-loading-default style-2 btn-loadmore"
              disabled={loading} // Vô hiệu hóa nút khi đang tải
            >
              <span className="text">
                {loading ? "Loading..." : "Load more"}
              </span>
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
