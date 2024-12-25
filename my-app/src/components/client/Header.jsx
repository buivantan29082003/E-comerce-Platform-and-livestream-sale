import React from "react";

const Header = () => {
  return (
    <div>
      {/* Desktop Navigation */}
      <header id="header" className="header-default">
        <div className="container">
          {/* preload */}
          <div className="preload preload-container">
            <div className="preload-logo">
              <div className="spinner" />
            </div>
          </div>
          {/* /preload */}
          <div id="wrapper">
            {/* top bar */}
            <div className="tf-top-bar ">
              <div className="container-full px_15 lg-px_40">
                <div className="tf-top-bar_wrap grid-2 gap-30 align-items-center">
                  <div className="tf-top-bar_left">
                    <div className="d-flex gap-30 text_dark fw-5">
                      <span>Kênh Người bán</span>
                      <span>Kết Nối</span>
                    </div>
                  </div>
                  <div className="top-bar-language tf-cur justify-content-end">
                    <div className="d-flex gap-30 text_dark fw-5">
                      <span>Thông Báo</span>
                      <span>Hỗ Trợ</span>
                      <span>Tiếng Việt</span>
                      <span>
                        <a href="/client/my-account-order">Tài Khoản</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /top bar */}
            {/* header */}
            <div className="container-full px_15 lg-px_40">
              <div className="row wrapper-header align-items-center">
                <div className="col-2 col-md-2 tf-lg-hidden mobile-menu">
                  <a
                    href="#mobileMenu"
                    data-bs-toggle="offcanvas"
                    aria-controls="offcanvasLeft"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={16}
                      viewBox="0 0 24 16"
                      fill="none"
                    >
                      <path
                        d="M2.00056 2.28571H16.8577C17.1608 2.28571 17.4515 2.16531 17.6658 1.95098C17.8802 1.73665 18.0006 1.44596 18.0006 1.14286C18.0006 0.839753 17.8802 0.549063 17.6658 0.334735C17.4515 0.120408 17.1608 0 16.8577 0H2.00056C1.69745 0 1.40676 0.120408 1.19244 0.334735C0.978109 0.549063 0.857702 0.839753 0.857702 1.14286C0.857702 1.44596 0.978109 1.73665 1.19244 1.95098C1.40676 2.16531 1.69745 2.28571 2.00056 2.28571ZM0.857702 8C0.857702 7.6969 0.978109 7.40621 1.19244 7.19188C1.40676 6.97755 1.69745 6.85714 2.00056 6.85714H22.572C22.8751 6.85714 23.1658 6.97755 23.3801 7.19188C23.5944 7.40621 23.7148 7.6969 23.7148 8C23.7148 8.30311 23.5944 8.59379 23.3801 8.80812C23.1658 9.02245 22.8751 9.14286 22.572 9.14286H2.00056C1.69745 9.14286 1.40676 9.02245 1.19244 8.80812C0.978109 8.59379 0.857702 8.30311 0.857702 8ZM0.857702 14.8571C0.857702 14.554 0.978109 14.2633 1.19244 14.049C1.40676 13.8347 1.69745 13.7143 2.00056 13.7143H12.2863C12.5894 13.7143 12.8801 13.8347 13.0944 14.049C13.3087 14.2633 13.4291 14.554 13.4291 14.8571C13.4291 15.1602 13.3087 15.4509 13.0944 15.6653C12.8801 15.8796 12.5894 16 12.2863 16H2.00056C1.69745 16 1.40676 15.8796 1.19244 15.6653C0.978109 15.4509 0.857702 15.1602 0.857702 14.8571Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                </div>
                <div className="col-6 col-md-4 col-6 Logo-ModelWorld">
                  <a href="/" className="logo">
                    {" "}
                    MODEL WORLD{" "}
                  </a>
                </div>
                <div className="col-3 col-md-6 tf-md-hidden Find-ModelWorld">
                  <nav className="box-navigation text-center">
                    <form action className="relative search-container d-flex">
                      <input
                        type="search"
                        className="block find text-gray-900"
                        placeholder="Search in ModelWorld"
                      />
                      <button type="submit" className="search-button p-3">
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
                            strokeWidth={2}
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                        <span className="sr-only">Search</span>
                      </button>
                    </form>
                  </nav>
                </div>
                <div className="col-2 col-md-2 Cart-ModelWorld">
                  <ul className="nav-icon d-flex justify-content-center align-items-center gap-20">
                    <li className="nav-cart">
                      <a
                        href="#shoppingCart"
                        data-bs-toggle="modal"
                        className="nav-icon-item "
                      >
                        <img
                          src="/assets/client/images/icon/grocery-store.png"
                          alt
                          className
                        />
                        <span className="count-box">0</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div className="offcanvas offcanvas-start canvas-mb" id="mobileMenu">
        <span
          className="icon-close icon-close-popup"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
        <div className="mb-canvas-content">
          <div className="mb-body">
            <ul className="nav-ul-mb" id="wrapper-menu-navigation">
              <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-one"
                  className="collapsed mb-menu-link current"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-one"
                >
                  <span>Home</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-one" className="collapse">
                  <ul className="sub-nav-menu">
                    <li>
                      <a href="index.html" className="sub-nav-link">
                        Home Fashion 01
                      </a>
                    </li>
                    <li>
                      <a href="home-02.html" className="sub-nav-link">
                        Home Fashion 02
                      </a>
                    </li>
                    <li>
                      <a href="home-03.html" className="sub-nav-link">
                        Home Fashion 03
                      </a>
                    </li>
                    <li>
                      <a href="home-04.html" className="sub-nav-link">
                        Home Fashion 04
                      </a>
                    </li>
                    <li>
                      <a href="home-05.html" className="sub-nav-link">
                        Home Fashion 05
                      </a>
                    </li>
                    <li>
                      <a href="home-06.html" className="sub-nav-link">
                        Home Fashion 06
                      </a>
                    </li>
                    <li>
                      <a href="home-07.html" className="sub-nav-link">
                        Home Fashion 07
                      </a>
                    </li>
                    <li>
                      <a href="home-08.html" className="sub-nav-link">
                        Home Fashion 08
                      </a>
                    </li>
                    <li>
                      <a href="home-giftcard.html" className="sub-nav-link">
                        Home Gift Card
                      </a>
                    </li>
                    <li>
                      <a href="home-headphone.html" className="sub-nav-link">
                        Home Headphone
                      </a>
                    </li>
                    <li>
                      <a href="home-multi-brand.html" className="sub-nav-link">
                        Home Multi Brand
                      </a>
                    </li>
                    <li>
                      <a href="home-skincare.html" className="sub-nav-link">
                        Home skincare
                      </a>
                    </li>
                    <li>
                      <a href="home-headphone.html" className="sub-nav-link">
                        Home Headphone
                      </a>
                    </li>
                    <li>
                      <a href="home-giftcard.html" className="sub-nav-link">
                        Home Gift Card
                      </a>
                    </li>
                    <li>
                      <a href="home-furniture.html" className="sub-nav-link">
                        Home Furniture
                      </a>
                    </li>
                    <li>
                      <a href="home-furniture-02.html" className="sub-nav-link">
                        Home Furniture 2
                      </a>
                    </li>
                    <li>
                      <a href="home-skateboard.html" className="sub-nav-link">
                        Home Skateboard
                      </a>
                    </li>
                    <li>
                      <a href="home-stroller.html" className="sub-nav-link">
                        Home Stroller
                      </a>
                    </li>
                    <li>
                      <a href="home-decor.html" className="sub-nav-link">
                        Home Decor
                      </a>
                    </li>
                    <li>
                      <a href="home-electronic.html" className="sub-nav-link">
                        Home Electronic
                      </a>
                    </li>
                    <li>
                      <a href="home-setup-gear.html" className="sub-nav-link">
                        Home Setup Gear
                      </a>
                    </li>
                    <li>
                      <a
                        href="home-dog-accessories.html"
                        className="sub-nav-link"
                      >
                        Home Dog Accessories
                      </a>
                    </li>
                    <li>
                      <a href="home-kitchen-wear.html" className="sub-nav-link">
                        Home Kitchen Wear
                      </a>
                    </li>
                    <li>
                      <a href="home-phonecase.html" className="sub-nav-link">
                        Home Phonecase
                      </a>
                    </li>
                    <li>
                      <a
                        href="home-paddle-boards.html"
                        className="sub-nav-link"
                      >
                        Home Paddle Boards
                      </a>
                    </li>
                    <li>
                      <a href="home-glasses.html" className="sub-nav-link">
                        Home Glasses
                      </a>
                    </li>
                    <li>
                      <a href="home-pod-store.html" className="sub-nav-link">
                        Home POD Store
                      </a>
                    </li>
                    <li>
                      <a href="home-activewear.html" className="sub-nav-link">
                        Home Activewear
                      </a>
                    </li>
                    <li>
                      <a href="home-handbag.html" className="sub-nav-link">
                        Home Handbag
                      </a>
                    </li>
                    <li>
                      <a href="home-tee.html" className="sub-nav-link">
                        Home Tee
                      </a>
                    </li>
                    <li>
                      <a href="home-sock.html" className="sub-nav-link">
                        Home Sock
                      </a>
                    </li>
                    <li>
                      <a href="home-jewerly.html" className="sub-nav-link">
                        Home Jewelry
                      </a>
                    </li>
                    <li>
                      <a href="home-sneaker.html" className="sub-nav-link">
                        Home Sneaker
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-two"
                  className="collapsed mb-menu-link current"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-two"
                >
                  <span>Shop</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-two" className="collapse">
                  <ul className="sub-nav-menu" id="sub-menu-navigation">
                    <li>
                      <a
                        href="#sub-shop-one"
                        className="sub-nav-link collapsed"
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-shop-one"
                      >
                        <span>Shop layouts</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="sub-shop-one" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
                          <li>
                            <a
                              href="shop-default.html"
                              className="sub-nav-link"
                            >
                              Default
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-left-sidebar.html"
                              className="sub-nav-link"
                            >
                              Left sidebar
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-right-sidebar.html"
                              className="sub-nav-link"
                            >
                              Right sidebar
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-fullwidth.html"
                              className="sub-nav-link"
                            >
                              Fullwidth
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-collection-sub.html"
                              className="sub-nav-link"
                            >
                              Sub collection
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-collection-list.html"
                              className="sub-nav-link"
                            >
                              Collections list
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a
                        href="#sub-shop-two"
                        className="sub-nav-link collapsed"
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-shop-two"
                      >
                        <span>Features</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="sub-shop-two" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
                          <li>
                            <a href="shop-link.html" className="sub-nav-link">
                              Pagination links
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-loadmore.html"
                              className="sub-nav-link"
                            >
                              Pagination loadmore
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-infinite-scrolling.html"
                              className="sub-nav-link"
                            >
                              Pagination infinite scrolling
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-filter-sidebar.html"
                              className="sub-nav-link"
                            >
                              Filter sidebar
                            </a>
                          </li>
                          <li>
                            <a
                              href="shop-filter-hidden.html"
                              className="sub-nav-link"
                            >
                              Filter hidden
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a
                        href="#sub-shop-three"
                        className="sub-nav-link collapsed"
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-shop-three"
                      >
                        <span>Product styles</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="sub-shop-three" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
                          <li>
                            <a
                              href="product-style-list.html"
                              className="sub-nav-link"
                            >
                              Product style list
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-style-01.html"
                              className="sub-nav-link"
                            >
                              Product style 01
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-style-02.html"
                              className="sub-nav-link"
                            >
                              Product style 02
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-style-03.html"
                              className="sub-nav-link"
                            >
                              Product style 03
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-style-04.html"
                              className="sub-nav-link"
                            >
                              Product style 04
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-style-05.html"
                              className="sub-nav-link"
                            >
                              Product style 05
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-style-06.html"
                              className="sub-nav-link"
                            >
                              Product style 06
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-style-07.html"
                              className="sub-nav-link"
                            >
                              Product style 07
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-three"
                  className="collapsed mb-menu-link current"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-three"
                >
                  <span>Products</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-three" className="collapse">
                  <ul className="sub-nav-menu" id="sub-menu-navigation">
                    <li>
                      <a
                        href="#sub-product-one"
                        className="sub-nav-link collapsed"
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-product-one"
                      >
                        <span>Product layouts</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="sub-product-one" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
                          <li>
                            <a
                              href="product-detail.html"
                              className="sub-nav-link"
                            >
                              Product default
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-grid-1.html"
                              className="sub-nav-link"
                            >
                              Product grid 1
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-grid-2.html"
                              className="sub-nav-link"
                            >
                              Product grid 2
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-stacked.html"
                              className="sub-nav-link"
                            >
                              Product stacked
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-right-thumbnails.html"
                              className="sub-nav-link"
                            >
                              Product right thumbnails
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-bottom-thumbnails.html"
                              className="sub-nav-link"
                            >
                              Product bottom thumbnails
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-drawer-sidebar.html"
                              className="sub-nav-link"
                            >
                              Product drawer sidebar
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-description-accordion.html"
                              className="sub-nav-link"
                            >
                              Product description accordion
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-description-list.html"
                              className="sub-nav-link"
                            >
                              Product description list
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-description-vertical.html"
                              className="sub-nav-link"
                            >
                              Product description vertical
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a
                        href="#sub-product-two"
                        className="sub-nav-link collapsed"
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-product-two"
                      >
                        <span>Product details</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="sub-product-two" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
                          <li>
                            <a
                              href="product-inner-zoom.html"
                              className="sub-nav-link"
                            >
                              Product inner zoom
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-zoom-magnifier.html"
                              className="sub-nav-link"
                            >
                              Product zoom magnifier
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-no-zoom.html"
                              className="sub-nav-link"
                            >
                              Product no zoom
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-photoswipe-popup.html"
                              className="sub-nav-link"
                            >
                              Product photoswipe popup
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-zoom-popup.html"
                              className="sub-nav-link"
                            >
                              Product external zoom and photoswipe popup
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-video.html"
                              className="sub-nav-link"
                            >
                              Product video
                            </a>
                          </li>
                          <li>
                            <a href="product-3d.html" className="sub-nav-link">
                              Product 3D, AR models
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-options-customizer.html"
                              className="sub-nav-link"
                            >
                              Product options &amp; customizer
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-advanced-types.html"
                              className="sub-nav-link"
                            >
                              Advanced product types
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-giftcard.html"
                              className="sub-nav-link"
                            >
                              Recipient information form for gift card products
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a
                        href="#sub-product-three"
                        className="sub-nav-link collapsed"
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-product-three"
                      >
                        <span>Product swatchs</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="sub-product-three" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
                          <li>
                            <a
                              href="product-color-swatch.html"
                              className="sub-nav-link"
                            >
                              Product color swatch
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-rectangle.html"
                              className="sub-nav-link"
                            >
                              Product rectangle
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-rectangle-color.html"
                              className="sub-nav-link"
                            >
                              Product rectangle color
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-swatch-image.html"
                              className="sub-nav-link"
                            >
                              Product swatch image
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-swatch-image-rounded.html"
                              className="sub-nav-link"
                            >
                              Product swatch image rounded
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-swatch-dropdown.html"
                              className="sub-nav-link"
                            >
                              Product swatch dropdown
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-swatch-dropdown-color.html"
                              className="sub-nav-link"
                            >
                              Product swatch dropdown color
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li>
                      <a
                        href="#sub-product-four"
                        className="sub-nav-link collapsed"
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="sub-product-four"
                      >
                        <span>Product features</span>
                        <span className="btn-open-sub" />
                      </a>
                      <div id="sub-product-four" className="collapse">
                        <ul className="sub-nav-menu sub-menu-level-2">
                          <li>
                            <a
                              href="product-frequently-bought-together.html"
                              className="sub-nav-link"
                            >
                              Frequently bought together
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-frequently-bought-together-2.html"
                              className="sub-nav-link"
                            >
                              Frequently bought together 2
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-upsell-features.html"
                              className="sub-nav-link"
                            >
                              Product upsell features
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-pre-orders.html"
                              className="sub-nav-link"
                            >
                              Product pre-orders
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-notification.html"
                              className="sub-nav-link"
                            >
                              Back in stock notification
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-pickup.html"
                              className="sub-nav-link"
                            >
                              Product pickup
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-images-grouped.html"
                              className="sub-nav-link"
                            >
                              Variant images grouped
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-complimentary.html"
                              className="sub-nav-link"
                            >
                              Complimentary products
                            </a>
                          </li>
                          <li>
                            <a
                              href="product-quick-order-list.html"
                              className="sub-nav-link line-clamp"
                            >
                              Quick order list
                              <div className="demo-label">
                                <span className="demo-new">New</span>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-four"
                  className="collapsed mb-menu-link current"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-four"
                >
                  <span>Pages</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-four" className="collapse">
                  <ul className="sub-nav-menu" id="sub-menu-navigation">
                    <li>
                      <a href="about-us.html" className="sub-nav-link">
                        About us
                      </a>
                    </li>
                    <li>
                      <a href="brands.html" className="sub-nav-link line-clamp">
                        Brands
                        <div className="demo-label">
                          <span className="demo-new">New</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a href="brands-v2.html" className="sub-nav-link">
                        Brands V2
                      </a>
                    </li>
                    <li>
                      <a href="contact-1.html" className="sub-nav-link">
                        Contact 1
                      </a>
                    </li>
                    <li>
                      <a href="contact-2.html" className="sub-nav-link">
                        Contact 2
                      </a>
                    </li>
                    <li>
                      <a href="faq-1.html" className="sub-nav-link">
                        FAQ 01
                      </a>
                    </li>
                    <li>
                      <a href="faq-2.html" className="sub-nav-link">
                        FAQ 02
                      </a>
                    </li>
                    <li>
                      <a href="our-store.html" className="sub-nav-link">
                        Our store
                      </a>
                    </li>
                    <li>
                      <a href="store-locations.html" className="sub-nav-link">
                        Store locator
                      </a>
                    </li>
                    <li>
                      <a
                        href="timeline.html"
                        className="sub-nav-link line-clamp"
                      >
                        Timeline
                        <div className="demo-label">
                          <span className="demo-new">New</span>
                        </div>
                      </a>
                    </li>
                    <li>
                      <a
                        href="view-cart.html"
                        className="sub-nav-link line-clamp"
                      >
                        View cart
                      </a>
                    </li>
                    <li>
                      <a
                        href="checkout.html"
                        className="sub-nav-link line-clamp"
                      >
                        Check out
                      </a>
                    </li>
                    <li>
                      <a
                        href="payment-confirmation.html"
                        className="sub-nav-link line-clamp"
                      >
                        Payment Confirmation
                      </a>
                    </li>
                    <li>
                      <a
                        href="payment-failure.html"
                        className="sub-nav-link line-clamp"
                      >
                        Payment Failure
                      </a>
                    </li>
                    <li>
                      <a
                        href="my-account.html"
                        className="sub-nav-link line-clamp"
                      >
                        My Account
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <a
                  href="#dropdown-menu-five"
                  className="collapsed mb-menu-link current"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="dropdown-menu-five"
                >
                  <span>Blog</span>
                  <span className="btn-open-sub" />
                </a>
                <div id="dropdown-menu-five" className="collapse">
                  <ul className="sub-nav-menu">
                    <li>
                      <a href="blog-grid.html" className="sub-nav-link">
                        Grid layout
                      </a>
                    </li>
                    <li>
                      <a href="blog-sidebar-left.html" className="sub-nav-link">
                        Left sidebar
                      </a>
                    </li>
                    <li>
                      <a
                        href="blog-sidebar-right.html"
                        className="sub-nav-link"
                      >
                        Right sidebar
                      </a>
                    </li>
                    <li>
                      <a href="blog-list.html" className="sub-nav-link">
                        Blog list
                      </a>
                    </li>
                    <li>
                      <a href="blog-detail.html" className="sub-nav-link">
                        Single Post
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-mb-item">
                <a
                  href="https://themeforest.net/item/ecomus-ultimate-html5-template/53417990?s_rank=3"
                  className="mb-menu-link"
                >
                  Buy now
                </a>
              </li>
            </ul>
            <div className="mb-other-content">
              <div className="d-flex group-icon">
                <a href="wishlist.html" className="site-nav-icon">
                  <i className="icon icon-heart" />
                  Wishlist
                </a>
                <a href="home-search.html" className="site-nav-icon">
                  <i className="icon icon-search" />
                  Search
                </a>
              </div>
              <div className="mb-notice">
                <a href="contact-1.html" className="text-need">
                  Need help ?
                </a>
              </div>
              <ul className="mb-info">
                <li>
                  Address: 1234 Fashion Street, Suite 567, <br />
                  New York, NY 10001
                </li>
                <li>
                  Email: <b>info@fashionshop.com</b>
                </li>
                <li>
                  Phone: <b>(212) 555-1234</b>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-bottom">
            <a href="login.html" className="site-nav-icon">
              <i className="icon icon-account" />
              Login
            </a>
            <div className="bottom-bar-language">
              <div className="tf-currencies">
                <select className="image-select center style-default type-currencies">
                  <option data-thumbnail="images/country/fr.svg">
                    EUR € | France
                  </option>
                  <option data-thumbnail="images/country/de.svg">
                    EUR € | Germany
                  </option>
                  <option selected data-thumbnail="images/country/us.svg">
                    USD $ | United States
                  </option>
                  <option data-thumbnail="images/country/vn.svg">
                    VND ₫ | Vietnam
                  </option>
                </select>
              </div>
              <div className="tf-languages">
                <select className="image-select center style-default type-languages">
                  <option>English</option>
                  <option>العربية</option>
                  <option>简体中文</option>
                  <option>اردو</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /mobile menu */}
    </div>
  );
};

export default Header;
