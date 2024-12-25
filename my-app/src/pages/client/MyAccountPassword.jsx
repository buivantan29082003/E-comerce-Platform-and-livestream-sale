import React from "react";

const MyAccountPassword = () => {
  return (
    <>
      <div className="col-lg-10">
        <div className="card-profile">
          <div className="head-profile">
            <span className="fw-6 fs-18">Hồ Sơ Của Tôi</span>
            <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          </div>
          <div className="body-profile mt-4">
            <div className="row">
              {/* Left Column */}
              <div className="col-md-12">
                <form className="p-5">
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="new-password"
                      className="col-sm-3 col-form-label"
                    >
                      Mật khẩu mới
                    </label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input
                          type="password"
                          id="new-password"
                          className="form-control"
                          placeholder="Nhập mật khẩu"
                        />
                        <button
                          className="show-hide-password"
                          type="button"
                          id="toggle-password"
                        >
                          <i className="bi bi-eye" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 row align-items-center">
                    <label
                      htmlFor="confirm-password"
                      className="col-sm-3 col-form-label"
                    >
                      Xác nhận mật khẩu
                    </label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input
                          type="password"
                          id="new-password"
                          className="form-control"
                          placeholder="Nhập lại mật khẩu"
                        />
                        <button
                          className="show-hide-password"
                          type="button"
                          id="toggle-password"
                        >
                          <i className="bi bi-eye" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Xác nhận
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccountPassword;
