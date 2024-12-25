import React, { useState, useEffect } from "react";
import Swiper from "../../assets/client/js/swiper-bundle.min.js";
import "../../assets/client/css/bootstrap.min.css";
import "../../assets/client/css/bootstrap-select.min.css";
import "../../assets/client/css/drift-basic.min.css";
import "../../assets/client/css/photoswipe.css";
import "../../assets/client/css/animate.css";
import productDetail from "../../data/json/productDetails.json";
import shopDetailpd from "../../data/json/shop.json";
import reviewData from "../../data/json/reviews.json";
import shopProduct from "../../data/json/shopProduct.json";
import productsData from "../../data/json/products.json";
const DetailProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1); // Tăng số lượng
  };
  alert("Hello woerld")

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1)); // Giảm số lượng, không cho giảm xuống dưới 1
  };
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [product, setProduct] = useState(productDetail.product);
  const { sale } = productDetail.product; // Lấy thông tin giảm giá từ JSON

  const [selectedAddress, setSelectedAddress] = useState(
    productDetail.product.shipping.deliveryTo[0]
  );
  const deliveryAddresses = productDetail.product.shipping.deliveryTo; // Lấy danh sách địa chỉ giao hàng

  // Hàm để cập nhật địa chỉ khi người dùng chọn từ dropdown
  const handleAddressChange = (address) => {
    setSelectedAddress(address);
  };

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const variants = productDetail.product.variants;

  const handleVariantChange = (variantName) => {
    setSelectedVariant(variantName);
  };

  const handleOptionChange = (optionId) => {
    setSelectedOption(optionId);
  };

  const [shopdt, setShop] = useState(shopDetailpd.shop);
  const [reviews, setReviews] = useState([]);
  const [filters, setFilters] = useState([]);
  const [pagination, setPagination] = useState({});

  const [shopProducts, setShopProducts] = useState(shopProduct);
  const [products, setProducts] = useState(productsData);
  useEffect(() => {
    setReviews(reviewData.reviews);
    setFilters(reviewData.filters);
    setPagination(reviewData.pagination);
    const swiper = new Swiper(".tf-product-media-main", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    setSwiperInstance(swiper);

    const productSwiper = new Swiper(".tf-sw-product-sell ", {
      slidesPerView: 4, // Số slide hiển thị mặc định
      spaceBetween: 30, // Khoảng cách giữa các slide
      breakpoints: {
        1024: {
          slidesPerView: 6, // Khi kích thước màn hình >1024px
        },
        768: {
          slidesPerView: 4, // Khi kích thước màn hình >768px
        },
        480: {
          slidesPerView: 2, // Khi kích thước màn hình nhỏ hơn 480px
        },
      },
      navigation: {
        nextEl: ".nav-next-slider", // Nút chuyển tới slide tiếp theo
        prevEl: ".nav-prev-slider", // Nút quay lại slide trước
      },
    });

    const recentSwiper = new Swiper(".tf-sw-recent", {
      slidesPerView: 4, // Số slide hiển thị mặc định
      spaceBetween: 30, // Khoảng cách giữa các slide
      breakpoints: {
        1024: {
          slidesPerView: 6, // Khi kích thước màn hình >1024px
        },
        768: {
          slidesPerView: 4, // Khi kích thước màn hình >768px
        },
        480: {
          slidesPerView: 2, // Khi kích thước màn hình nhỏ hơn 480px
        },
      },
      navigation: {
        nextEl: ".nav-next-slider", // Nút chuyển tới slide tiếp theo
        prevEl: ".nav-prev-slider", // Nút quay lại slide trước
      },
    });

    return () => {
      if (swiper) swiper.destroy();
      if (productSwiper) productSwiper.destroy();
      if (recentSwiper) recentSwiper.destroy();
    };
  }, []);

  const handleThumbnailClick = (index) => {
    if (swiperInstance) swiperInstance.slideTo(index);
  };

  return (
    <>
      <div class="tf-breadcrumb">
        <div class="container">
          <div class="tf-breadcrumb-wrap d-flex justify-content-between flex-wrap align-items-center">
            <d iv class="tf-breadcrumb-list">
              <a href="index.html" class="text">
                Model World
              </a>
              <i class="icon icon-arrow-right"></i>
              <a href="#" class="text">
                Gundam
              </a>
              <i class="icon icon-arrow-right"></i>
              <span class="text">Mô hình lắp ráp mô hình Gundam HG1</span>
            </d>
            <div class="tf-breadcrumb-prev-next">
              <a href="#" class="tf-breadcrumb-prev hover-tooltip center">
                <i class="icon icon-arrow-left"></i>
              </a>
              <a href="#" class="tf-breadcrumb-back hover-tooltip center">
                <i class="icon icon-shop"></i>
              </a>
              <a href="#" class="tf-breadcrumb-next hover-tooltip center">
                <i class="icon icon-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <section className="flat-spacing-4 pt_0">
        <div className="tf-main-product section-image-zoom">
          <div className="container bg-white">
            <div className="row">
              <div className="col-md-6">
                <div className="tf-product-media-wrap sticky-top">
                  <div className="thumbs-slider">
                    <div className="swiper tf-product-media-thumbs other-image-zoom">
                      <div className="stagger-wrap">
                        {product.images.map((imgSrc, index) => (
                          <div
                            key={index}
                            className="swiper-slide stagger-item stagger-finished"
                          >
                            <div
                              className="item"
                              onClick={() => handleThumbnailClick(index)}
                            >
                              <img
                                src={imgSrc}
                                alt={`Thumbnail ${index + 1}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className="swiper tf-product-media-main"
                      id="gallery-swiper-started"
                    >
                      <div className="swiper-wrapper">
                        {product.images.map((imgSrc, index) => (
                          <div key={index} className="swiper-slide">
                            <a
                              target="_blank"
                              className="item"
                              data-pswp-width="770px"
                              data-pswp-height="1075px"
                            >
                              <img
                                className="tf-image-zoom lazyload"
                                data-zoom={imgSrc}
                                data-src={imgSrc}
                                src={imgSrc}
                                alt={`Main product ${index + 1}`}
                              />
                            </a>
                          </div>
                        ))}
                      </div>
                      <div className="swiper-button-next button-style-arrow thumbs-next" />
                      <div className="swiper-button-prev button-style-arrow thumbs-prev" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="tf-product-info-wrap position-relative">
                  <div className="tf-zoom-main" />
                  <div className="tf-product-info-list other-image-zoom">
                    <div className="tf-product-info-title">
                      <h5>{product.title}</h5>
                    </div>
                    <div className="tf-product-info-badges">
                      <span>{product.rating.average}</span>
                      <div className="star-outer">
                        <div
                          className="star-inner-blue"
                          style={{ width: `${product.rating.starPercentage}%` }}
                        />
                      </div>
                      <div className="product-status-content">
                        <i className="icon-lightning" />
                        <p className="fw-6">
                          {product.rating.totalReviews} Đánh Giá
                        </p>
                      </div>
                      <div className="product-status-content">
                        <p className="fw-6">{product.sold} Đã bán</p>
                      </div>
                    </div>
                    <div className="tf-product-info-price">
                      <div className="price-on-sale">
                        {product.price.current}
                      </div>
                      <div className="compare-at-price">
                        {product.price.compareAt}
                      </div>
                      <div className="badges-on-sale">
                        <span> {product.price.discount}</span>
                      </div>
                    </div>
                    <div className="tf-product-info-liveview">
                      <div>Mã giảm giá của shop</div>
                      {sale.map((item, index) => (
                        <div key={index} className="icon-sale">
                          <img
                            src={item.image}
                            alt={`Giảm giá ${item.description}`}
                          />
                          <p className="fw-6 text-white text-sale-icon">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="tf-product-info-liveview">
                      <div className>Chính sách trả hàng</div>
                      <p className="fw-6 d-flex">
                        <img
                          src="/assets/client/images/icon/Open Parcel.svg"
                          alt
                        />{" "}
                        Trả hàng trong 15 ngày
                      </p>
                      <p className="d-flex">
                        Đổi hàng miễn phí{" "}
                        <img src="/assets/client/images/icon/Help.svg" alt />
                      </p>
                    </div>
                    <div className>
                      <div className="row">
                        <div className="col-lg-2">
                          <div className>Vận chuyển</div>
                        </div>
                        <div className="col-lg-10">
                          <div className="row">
                            <div className="col-lg-12">
                              <p className="fw-6 d-flex">
                                <img
                                  src="/assets/client/images/icon/Free Shipping.svg"
                                  alt
                                />
                                Miễn phí vận chuyển
                              </p>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-lg-12 d-flex align-items-center">
                              <div className="dropdown">
                                <p
                                  className="dropdown-toggle d-flex"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <img
                                    src="/assets/client/images/icon/In Transit.svg"
                                    alt="Vận chuyển"
                                  />{" "}
                                  Vận chuyển tới:
                                  <span id="selected-address" className="fw-4">
                                    {selectedAddress}
                                  </span>
                                </p>
                                <ul className="dropdown-menu">
                                  {deliveryAddresses.map((address, index) => (
                                    <li key={index}>
                                      <a
                                        className="dropdown-item"
                                        href="#"
                                        onClick={() =>
                                          handleAddressChange(address)
                                        } // Cập nhật địa chỉ khi chọn
                                      >
                                        {address}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tf-product-info-variant-picker">
                      {/* Phân loại */}
                      {variants.map((variant, index) => {
                        if (variant.label === "Phân loại") {
                          return (
                            <div key={index} className="variant-picker-item">
                              <div className="variant-picker-label">
                                Phân loại:
                              </div>
                              <div className="color-picker">
                                {variant.options.map((option, i) => (
                                  <div key={i}>
                                    <input
                                      id={option.name}
                                      type="radio"
                                      name="variant"
                                      onChange={() =>
                                        handleVariantChange(option.name)
                                      }
                                      checked={selectedVariant === option.name}
                                    />
                                    <label
                                      className="color-rectangle"
                                      htmlFor={option.name}
                                    >
                                      <span className="color-image">
                                        <img
                                          src={option.image}
                                          alt={option.name}
                                        />
                                      </span>
                                      <span className="color-name">
                                        {option.name}
                                      </span>
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}

                      {/* Tùy chọn */}
                      {variants.map((variant, index) => {
                        if (variant.label === "Tùy chọn") {
                          return (
                            <div key={index} className="variant-picker-item">
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="variant-picker-label">
                                  Tùy chọn:
                                </div>
                              </div>
                              <div className="variant-picker-values">
                                {variant.options.map((option, i) => (
                                  <div key={i}>
                                    <input
                                      type="radio"
                                      name="option"
                                      id={option.id}
                                      onChange={() =>
                                        handleOptionChange(option.id)
                                      }
                                      checked={selectedOption === option.id}
                                    />
                                    <label
                                      className="style-text"
                                      htmlFor={option.id}
                                      data-value={option.name}
                                    >
                                      <p>{option.name}</p>
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                    <div className="tf-product-info-quantity">
                      <div className="quantity-title fw-6">Số lượng</div>
                      <div className="wg-quantity">
                        <span
                          className="btn-quantity minus-btn"
                          onClick={handleDecreaseQuantity}
                        >
                          -
                        </span>
                        <input
                          type="text"
                          name="number"
                          value={quantity} // Gán giá trị cho input
                          onChange={(e) => setQuantity(Number(e.target.value))} // Cập nhật state khi người dùng nhập vào
                        />
                        <span
                          className="btn-quantity plus-btn"
                          onClick={handleIncreaseQuantity}
                        >
                          +
                        </span>
                      </div>
                    </div>
                    <div className="tf-product-info-buy-button">
                      <form className>
                        <a
                          href="#"
                          className="tf-btn btn-fill justify-content-center fw-6 fs-16 flex-grow-1 animate-hover-btn "
                        >
                          <span>Thêm vào giỏ hàng </span>
                          {/* <span className="tf-qty-price">$8.00</span> */}
                        </a>
                        <a
                          href="javascript:void(0);"
                          className="tf-product-btn-wishlist hover-tooltip box-icon bg_white wishlist btn-icon-action"
                        >
                          <span className="icon icon-heart" />
                          <span className="tooltip">Add to Wishlist</span>
                          <span className="icon icon-delete" />
                        </a>
                        <a
                          href="#compare"
                          data-bs-toggle="offcanvas"
                          aria-controls="offcanvasLeft"
                          className="tf-product-btn-wishlist hover-tooltip box-icon bg_white compare btn-icon-action"
                        >
                          <span className="icon icon-share" />
                          <span className="tooltip">Add to Compare</span>
                          <span className="icon icon-check" />
                        </a>
                        <div className="w-100">
                          <a href="#" className="btns-full">
                            Mua ngay
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="flat-spacing-5 pt_0">
        <div className="container bg-white">
          <div className="brand-row">
            {/* Cột 1 */}
            <div className="brand-column">
              <div className="d-flex">
                <div className="brand-avatar">
                  <img src={shopdt.avatar} alt="Avatar" className="avatar" />
                  <a href="#" className="follow-btn">
                    + Theo Dõi
                  </a>
                </div>
                <div>
                  <p className="brand-name">{shopdt.name}</p>
                  <p className="online-status">{shopdt.onlineStatus}</p>
                  <div className="action-buttons">
                    <a href="#" className="btn chat-btn">
                      Chat Ngay
                    </a>
                    <a href="#" className="btn shop-btn">
                      Xem Shop
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Cột 2 */}
            <div className="brand-column">
              <div className="d-flex justify-content-between p-2">
                <p>Lượt Đánh Giá</p>
                <p className="brand-info">{shopdt.rating}</p>
              </div>
              <div className="d-flex justify-content-between p-2">
                <p>Số Sản Phẩm</p>
                <p className="brand-info">{shopdt.products}</p>
              </div>
            </div>
            {/* Cột 3 */}
            <div className="brand-column">
              <div className="d-flex justify-content-between p-2">
                <p>Tỉ Lệ Phản Hồi</p>
                <p className="brand-info">{shopdt.responseRate}</p>
              </div>
              <div className="d-flex justify-content-between p-2">
                <p>Thời Gian Phản Hồi</p>
                <p className="brand-info">{shopdt.responseTime}</p>
              </div>
            </div>
            {/* Cột 4 */}
            <div className="brand-column">
              <div className="d-flex justify-content-between p-2">
                <p>Tham Gia Vào</p>
                <p className="brand-info">{shopdt.joined}</p>
              </div>
              <div className="d-flex justify-content-between p-2">
                <p>Số Người Theo Dõi</p>
                <p className="brand-info">{shopdt.followers}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flat-spacing-10">
        <div className="container bg-white">
          <div className="row productDT-Voucher-Shop">
            <div className="col-9">
              <div className="d-flex flex-column gap-20">
                <div>
                  <div className="lg_fs_18 fw-6 line py_15">
                    CHI TIẾT SẢN PHẨM
                  </div>
                  <div className="py_20 lg_py_30">
                    <div className="tf-breadcrumb-wrap d-flex flex-wrap align-items-center">
                      Danh mục
                      {product.breadcrumb.map((item, index) => (
                        <React.Fragment key={index}>
                          <div className="tf-breadcrumb-list ps-5">
                            <a href={item.link} className="text">
                              {item.label}
                            </a>
                            {index < product.breadcrumb.length - 1 && (
                              <i className="icon icon-arrow-right" />
                            )}
                          </div>
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="tf-breadcrumb-wrap d-flex flex-wrap align-items-center">
                      <div>Số Lượng Hàng Khuyến Mãi</div>
                      <div className="tf-breadcrumb-list ps-5">
                        <p>{product.stockDetails.promotionalStock}</p>
                      </div>
                    </div>
                    <div className="tf-breadcrumb-wrap d-flex flex-wrap align-items-center">
                      <div>Số Sản Phẩm Còn Lại</div>
                      <div className="tf-breadcrumb-list ps-5">
                        <p>{product.stockDetails.remainingStock}</p>
                      </div>
                    </div>
                    <div className="tf-breadcrumb-wrap d-flex flex-wrap align-items-center">
                      <div>Gửi từ</div>
                      <div className="tf-breadcrumb-list ps-5">
                        <p>{product.stockDetails.shippingLocation}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="lg_fs_18 fw-6 line py_15">MÔ TẢ SẢN PHẨM</div>
                  <div className="py_20 lg_py_30">
                    <div className="tf-page-privacy-policy">
                      <div className="title">
                        {product.productDescription.title}
                      </div>
                      {product.productDescription.details.map((text, index) => (
                        <p key={index}>{text}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-3">
              <div className="voucher-of-shop">
                <p>Mã giảm giá của Shop</p>
                <div className="voucher-container">
                  {product.vouchers.map((voucher, index) => (
                    <div key={index} className="row voucher-in-productDT">
                      <div className="col-8 content-voucher">
                        <p>Giảm {voucher.discount}</p>
                        <p>Đơn tối thiểu</p>
                        <p>{voucher.minOrder}</p>
                        <p className="pt-3">HSD: {voucher.expiryDate}</p>
                      </div>
                      <div className="col-4 d-flex align-items-center btn-voucher">
                        <a href className="btn-blue-white">
                          Lấy
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container review-section">
          <div className="row">
            <div className="col-12">
              <h4>Đánh Giá Sản Phẩm</h4>
              <div className="d-flex align-items-center">
                <span className="review-rating">{reviewData.rating}</span>
                <div className="review-stars ms-2">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={
                        index < Math.floor(reviewData.rating)
                          ? "filled"
                          : "empty"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="ms-2">
                  ({reviewData.totalReviews} đánh giá)
                </span>
              </div>

              {/* Filter Buttons */}
              <div className="filter-btns my-3">
                {filters.map((filter, index) => (
                  <button key={index} className="btn btn-outline-primary">
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>

              {/* Reviews */}
              {reviews.map((review, index) => (
                <div key={index} className="review-card">
                  <div className="d-flex">
                    <div className="review-user">
                      <img src={review.avatar} alt="User Image" />
                    </div>
                    <div className="ms-3">
                      <strong>{review.username}</strong>

                      {/* Hiển thị sao từ dữ liệu JSON */}
                      <div className="review-stars">
                        {Array.from({ length: 5 }, (_, index) => (
                          <span
                            key={index}
                            className={
                              index < Math.floor(review.rating)
                                ? "filled"
                                : "empty"
                            }
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      <p>
                        {review.date} | Phân loại hàng: {review.category}
                      </p>
                      <p>Chất lượng sản phẩm: {review.productQuality}</p>
                      <p>Đúng với mô tả: {review.descriptionAccuracy}</p>
                      <div className="review-images d-flex">
                        {review.images.map((image, idx) => (
                          <img
                            key={idx}
                            src={image}
                            alt={`Product Image ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Phản hồi của người bán */}
                  <p className="Shop-Feedback">
                    <strong>Phản Hồi Của Người Bán</strong>:{" "}
                    {review.shopFeedback}
                  </p>
                </div>
              ))}

              {/* Pagination */}
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  {pagination.currentPage > 1 && (
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Trước
                      </a>
                    </li>
                  )}
                  {[...Array(pagination.totalPages).keys()].map((page) => (
                    <li
                      key={page}
                      className={`page-item ${
                        pagination.currentPage === page + 1 ? "active" : ""
                      }`}
                    >
                      <a className="page-link" href="#">
                        {page + 1}
                      </a>
                    </li>
                  ))}
                  {pagination.currentPage < pagination.totalPages && (
                    <li className="page-item">
                      <a className="page-link" href="#">
                        Tiếp
                      </a>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section className="flat-spacing-1 pt_0">
        <div className="container">
          <div className="flat-title">
            <span className="title">CÁC SẢN PHẨM KHÁC CỦA SHOP</span>
          </div>
          <div className="hover-sw-nav hover-sw-2">
            <div
              className="swiper tf-sw-product-sell wrap-sw-over"
              data-preview={6}
              data-tablet={6}
              data-mobile={4}
              data-space-lg={30}
              data-space-md={15}
              data-pagination={2}
              data-pagination-md={6}
              data-pagination-lg={6}
            >
              <div className="swiper-wrapper">
                {shopProducts.map((product) => (
                  <div className="swiper-slide" key={product.id} lazy="true">
                    <div className="card-product">
                      <div className="card-product-wrapper">
                        <div className="card-item">
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="nav-sw nav-next-slider nav-next-product box-icon w_46 round">
              <span className="icon icon-arrow-left" />
            </div>
            <div className="nav-sw nav-prev-slider nav-prev-product box-icon w_46 round">
              <span className="icon icon-arrow-right" />
            </div>
            <div className="sw-dots style-2 sw-pagination-product justify-content-center" />
          </div>
        </div>
      </section>

      <section className="flat-spacing-4 pt_0">
        <div className="container">
          <div className="flat-title">
            <span className="title">CÓ THỂ BẠN CŨNG THÍCH</span>
          </div>
          <div className="hover-sw-nav hover-sw-2">
            <div
              className="swiper tf-sw-recent wrap-sw-over"
              data-preview={6}
              data-tablet={6}
              data-mobile={4}
              data-space-lg={30}
              data-space-md={30}
              data-space={15}
              data-pagination={1}
              data-pagination-md={1}
              data-pagination-lg={1}
            >
              <div className="swiper-wrapper">
                {/* Lặp qua các sản phẩm để tạo các slide */}
                {products.map((product) => (
                  <div className="swiper-slide" key={product.id} lazy="true">
                    <div className="card-product">
                      <div className="card-product-wrapper">
                        <div className="card-item">
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="nav-sw nav-next-slider nav-next-recent box-icon w_46 round">
              <span className="icon icon-arrow-left" />
            </div>
            <div className="nav-sw nav-prev-slider nav-prev-recent box-icon w_46 round">
              <span className="icon icon-arrow-right" />
            </div>
            <div className="sw-dots style-2 sw-pagination-recent justify-content-center" />
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailProduct;
