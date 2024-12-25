import React, { useState } from "react";
import notificationsData from "../../data/json/notifications.json"; // Import JSON data

const MyAccountNofOder = () => {
  const [notifications] = useState(notificationsData.notifications); // Load JSON data into state

  return (
    <div className="col-lg-10">
      <div className="card-profile">
        <div className="head-profile">
          <span className="fw-5 fs-18 d-flex justify-content-end">
            <a href="#">Đánh dấu đã đọc tất cả</a>
          </span>
        </div>
        <div className="body-profile mt-4">
          {notifications.map((notification) => (
            <div key={notification.id}>
              <div
                className={`row card-nof-oder ${
                  notification.read ? "bg-white" : "bg-light-blue"
                } p-3`}
                style={{
                  backgroundColor: notification.read ? "#ffffff" : "#e0f4ff",
                }}
              >
                <div className="col-md-2">
                  <img
                    src={notification.image}
                    alt="Product"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-7">
                  <p className="fw-6 fs-16">{notification.title}</p>
                  <p>{notification.content}</p>
                  <p>
                    {notification.time}
                    <a
                      className="btn-dropdown"
                      onClick={() =>
                        (document.getElementById(
                          `list-con-${notification.id}`
                        ).style.display = "block")
                      }
                    >
                      {" "}
                      v{" "}
                    </a>
                  </p>
                </div>
                <div className="col-md-3 text-center">
                  <a href="#" className="btn btn-light btn-outline-secondary">
                    {notification.title.includes(
                      "Nhắc nhở: Bạn đã nhận được hàng chưa?"
                    )
                      ? "Xem Chi Tiết Đơn Hàng"
                      : "Đánh giá sản phẩm"}{" "}
                  </a>
                </div>
              </div>

              {/* Sub list of each notification */}
              <div
                id={`list-con-${notification.id}`}
                className="list-con mt-3"
                style={{ display: "none" }}
              >
                {notification.details.map((detail, index) => (
                  <div key={index} className="list-status-nof-oder p-3">
                    <p className="fw-6">{detail.title}</p>
                    <p>{detail.content}</p>
                    <p className="text-muted">{detail.time}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAccountNofOder;
