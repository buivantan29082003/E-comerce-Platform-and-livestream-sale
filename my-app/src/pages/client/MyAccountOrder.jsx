import React, { useEffect, useState } from "react";
import ordersData from "../../data/json/order.json";

const MyAccountOrder = () => {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState(0); // Trạng thái cho tab hiện tại

  useEffect(() => {
    setOrders(ordersData); // Đổ dữ liệu từ JSON vào state
  }, []);

  // Hàm để lọc đơn hàng theo trạng thái
  const filterOrders = (status) => {
    return orders.filter((order) => order.status === status);
  };

  return (
    <div className="col-lg-10"> 
      <ul className="nav nav-tabs bg-white" id="myTab" role="tablist">
        {[
          "Tất cả",
          "Chờ thanh toán",
          "Vận chuyển",
          "Chờ giao hàng",
          "Hoàn thành",
          "Đã hủy",
          "Trả hàng/ Hoàn tiền",
        ].map((tab, index) => (
          <li className="nav-item" role="presentation" key={index}>
            <button
              className={`nav-link ${activeTab === index ? "active" : ""}`} // Thay đổi lớp CSS dựa trên trạng thái
              onClick={() => setActiveTab(index)} // Cập nhật trạng thái tab
              type="button"
              role="tab"
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
      <div className="tf-search-sticky pt-3">
        <form className="tf-mini-search-frm">
          <fieldset className="text">
            <input
              type="text"
              placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên sản phẩm"
              name="text"
              required
            />
          </fieldset>
          <button type="submit">
            <i className="icon-search"></i>
          </button>
        </form>
      </div>
      <div className="tab-content" id="myTabContent">
        <div
          className={`tab-pane fade ${activeTab === 0 ? "show active" : ""}`}
          id="tab0"
          role="tabpanel"
        >
          <div className="my-account-content account-order">
            <div className="wrap-account-order">
              <table>
                <tbody>
                  {orders.map((order, index) => (
                    <tr className="tf-order-item" key={index}>
                      <div className="card-oder">
                        <div className="head-card d-flex justify-content-between">
                          <div className="head-left">
                            <p>
                              <img
                                src="/assets/client/images/icon/Store1.svg"
                                alt=""
                              />{" "}
                              {order.shop}
                            </p>
                            <a
                              href={order.links?.chat}
                              className="chat-btn d-flex align-items-center"
                            >
                              <img
                                src="/assets/client/images/icon/chatwhite.svg"
                                alt=""
                              />{" "}
                              Chat
                            </a>
                            <a
                              href={order.links?.view_shop}
                              className="shop-btn d-flex align-items-center"
                            >
                              <img
                                src="/assets/client/images/icon/Store2.svg"
                                alt=""
                              />{" "}
                              Xem Shop
                            </a>
                          </div>
                          <div className="head-right">
                            <p className="text-status">
                              <img
                                src="/assets/client/images/icon/Ship-green.svg"
                                alt=""
                              />{" "}
                              {order.status}{" "}
                              <img
                                src="/assets/client/images/icon/chamhoi.svg"
                                alt=""
                              />
                            </p>
                            <p className="text-status-user">
                              {order.status_user}
                            </p>
                          </div>
                        </div>
                        <div className="body-card">
                          <div className="row">
                            <div className="col-lg-2">
                              {order.product?.image ? (
                                <img
                                  src={order.product.image}
                                  alt={order.product.name}
                                />
                              ) : (
                                <img
                                  src="/assets/client/images/default-image.png"
                                  alt="Default"
                                />
                              )}
                            </div>
                            <div className="col-lg-7">
                              <p className="fw-6 fs-18">
                                {order.product?.name}
                              </p>
                              <p className="text-black-50">
                                Phân loại: {order.product?.category}
                              </p>
                              <p>X{order.product?.quantity}</p>
                              <a href="/" className="green-btn">
                                {order.links?.return_policy}
                              </a>
                            </div>
                            <div className="col-lg-3 d-flex pt-4">
                              <p className="text-decoration-line-through pe-3">
                                {order.product?.original_price}
                              </p>
                              <p className="text-color-blue">
                                {order.product?.discounted_price}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="foot-card">
                          <p>
                            Vui lòng chỉ nhấn "Đã nhận được hàng" khi đơn hàng
                            đã được giao đến bạn và sản phẩm nhận được không có
                            vấn đề nào.
                          </p>
                          <a href="/" className="blue-btn">
                            Đã Nhận Hàng
                          </a>
                          <a href="/" className="white-btn">
                            Yêu Cầu Trả Hàng/ Hoàn Tiền
                          </a>
                          <a href="/" className="white-btn">
                            Liên Hệ Người Bán
                          </a>
                        </div>
                      </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Nội dung cho các tab khác */}
        {[
          "Đang chờ thanh toán",
          "Đang vận chuyển",
          "Chờ giao hàng",
          "Hoàn thành",
          "Đã hủy",
          "Trả hàng/ Hoàn tiền",
        ].map((status, index) => (
          <div
            className={`tab-pane fade ${
              activeTab === index + 1 ? "show active" : ""
            }`}
            id={`tab${index + 1}`}
            role="tabpanel"
            key={index}
          >
            <div className="my-account-content account-order">
              <div className="wrap-account-order">
                <table>
                  <tbody>
                    {filterOrders(status).map((order, idx) => (
                      <tr className="tf-order-item" key={idx}>
                        <div className="card-oder">
                          {/* Tương tự như phần nội dung của đơn hàng ở trên */}
                          <div className="head-card d-flex justify-content-between">
                            <div className="head-left">
                              <p>
                                <img
                                  src="/assets/client/images/icon/Store1.svg"
                                  alt=""
                                />{" "}
                                {order.shop}
                              </p>
                              <a
                                href={order.links?.chat}
                                className="chat-btn d-flex align-items-center"
                              >
                                <img
                                  src="/assets/client/images/icon/chatwhite.svg"
                                  alt=""
                                />{" "}
                                Chat
                              </a>
                              <a
                                href={order.links?.view_shop}
                                className="shop-btn d-flex align-items-center"
                              >
                                <img
                                  src="/assets/client/images/icon/Store2.svg"
                                  alt=""
                                />{" "}
                                Xem Shop
                              </a>
                            </div>
                            <div className="head-right">
                              <p className="text-status">
                                <img
                                  src="/assets/client/images/icon/Ship-green.svg"
                                  alt=""
                                />{" "}
                                {order.status}{" "}
                                <img
                                  src="/assets/client/images/icon/chamhoi.svg"
                                  alt=""
                                />
                              </p>
                              <p className="text-status-user">
                                {order.status_user}
                              </p>
                            </div>
                          </div>
                          <div className="body-card">
                            <div className="row">
                              <div className="col-lg-2">
                                {order.product?.image ? (
                                  <img
                                    src={order.product.image}
                                    alt={order.product.name}
                                  />
                                ) : (
                                  <img
                                    src="/assets/client/images/default-image.png"
                                    alt="Default"
                                  />
                                )}
                              </div>
                              <div className="col-lg-7">
                                <p className="fw-6 fs-18">
                                  {order.product?.name}
                                </p>
                                <p className="text-black-50">
                                  Phân loại: {order.product?.category}
                                </p>
                                <p>X{order.product?.quantity}</p>
                                <a href="/" className="green-btn">
                                  {order.links?.return_policy}
                                </a>
                              </div>
                              <div className="col-lg-3 d-flex pt-4">
                                <p className="text-decoration-line-through pe-3">
                                  {order.product?.original_price}
                                </p>
                                <p className="text-color-blue">
                                  {order.product?.discounted_price}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="foot-card">
                            <p>
                              Vui lòng chỉ nhấn "Đã nhận được hàng" khi đơn hàng
                              đã được giao đến bạn và sản phẩm nhận được không
                              có vấn đề nào.
                            </p>
                            <a href="/" className="blue-btn">
                              Đã Nhận Hàng
                            </a>
                            <a href="/" className="white-btn">
                              Yêu Cầu Trả Hàng/ Hoàn Tiền
                            </a>
                            <a href="/" className="white-btn">
                              Liên Hệ Người Bán
                            </a>
                          </div>
                        </div>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAccountOrder;
