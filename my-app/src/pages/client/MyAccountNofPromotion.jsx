import React, { useState } from "react";
import promotionsData from "../../data/json/promotions.json"; // Import JSON data

const MyAccountNofPromotion = () => {
  const [promotions] = useState(promotionsData.promotions); // Load JSON data into state

  return (
    <>
      <div className="col-lg-10">
        <div className="card-nof">
          <div className="head-profile">
            <span className="fw-5 fs-18 d-flex justify-content-end">
              <a href="#">Đánh dấu đã đọc tất cả</a>
            </span>
          </div>
          <div className="body-profile mt-4">
            {promotions.map((promotion) => (
              <div
                key={promotion.id}
                className={`row card-nof-oder ${
                  promotion.read ? "bg-white" : "bg-light-blue"
                } p-3`}
                style={{
                  backgroundColor: promotion.read ? "#ffffff" : "#e0f4ff",
                }} // Set background color based on read status
              >
                <div className="col-md-2">
                  <img
                    src={promotion.image}
                    alt="Product Image"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-7">
                  <p className="fw-6 fs-16">{promotion.title}</p>
                  <p>{promotion.content}</p>
                  <p>{promotion.time}</p>
                </div>
                <div className="col-md-3 text-center">
                  <a href="#" className="btn btn-light btn-outline-secondary">
                    Xem Chi Tiết
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccountNofPromotion;
