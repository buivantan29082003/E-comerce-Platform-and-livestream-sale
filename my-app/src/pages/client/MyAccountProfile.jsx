import React, { useEffect, useState } from "react";
import userData from "../../data/json/userProfile.json";

const MyAccountProfile = () => {
  const [profile, setProfile] = useState(null);
  const [avatar, setAvatar] = useState(null);

  // Tạo các danh sách cho ngày, tháng, năm
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => 1900 + i);

  useEffect(() => {
    // Nạp dữ liệu từ file JSON
    setProfile(userData);
    setAvatar(userData.avatar); // Đặt ảnh đại diện từ JSON
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Đọc file và chuyển đổi thành URL để hiển thị
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Cập nhật avatar với ảnh đã chọn
      };
      reader.readAsDataURL(file);
    }
  };

  if (!profile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="col-lg-10">
      <div className="card-profile">
        <div className="head-profile">
          <span className="fw-6 fs-18">Hồ Sơ Của Tôi</span>
          <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        </div>
        <div className="body-profile mt-4">
          <form>
            <div className="row">
              {/* Left Column */}
              <div className="col-md-8 body-profile-left">
                <div className="mb-3 row align-items-center">
                  <label htmlFor="username" className="col-sm-3 col-form-label">
                    Tên đăng nhập
                  </label>
                  <div className="col-sm-9">
                    <span id="Name" className="fw-6">
                      {profile.username}
                    </span>
                  </div>
                </div>
                <div className="mb-3 row align-items-center">
                  <label htmlFor="fullName" className="col-sm-3 col-form-label">
                    Tên
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control-plaintext"
                      id="fullName"
                      defaultValue={profile.fullName}
                      readOnly
                    />
                  </div>
                </div>
                <div className="mb-3 row align-items-center">
                  <label htmlFor="email" className="col-sm-3 col-form-label">
                    Email
                  </label>
                  <div className="col-sm-9">
                    <span id="email">{profile.email}</span>
                    <a href="#" className="text-primary ms-3">
                      Thay đổi
                    </a>
                  </div>
                </div>
                <div className="mb-3 row align-items-center">
                  <label htmlFor="phone" className="col-sm-3 col-form-label">
                    Số điện thoại
                  </label>
                  <div className="col-sm-9">
                    <span id="phone">{profile.phone}</span>
                    <a href="#" className="text-primary ms-3">
                      Thay đổi
                    </a>
                  </div>
                </div>
                <div className="mb-3 row align-items-center">
                  <label htmlFor="gender" className="col-sm-3 col-form-label">
                    Giới tính
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="Nam"
                      checked={profile.gender === "Nam"}
                      onChange={() => setProfile({ ...profile, gender: "Nam" })}
                    />{" "}
                    Nam
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="Nữ"
                      checked={profile.gender === "Nữ"}
                      onChange={() => setProfile({ ...profile, gender: "Nữ" })}
                    />{" "}
                    Nữ
                    <input
                      type="radio"
                      id="other"
                      name="gender"
                      value="Khác"
                      checked={profile.gender === "Khác"}
                      onChange={() =>
                        setProfile({ ...profile, gender: "Khác" })
                      }
                    />{" "}
                    Khác
                  </div>
                </div>

                <div className="mb-3 row align-items-center">
                  <label htmlFor="birthday" className="col-sm-3 col-form-label">
                    Ngày sinh
                  </label>
                  <div className="col-sm-9">
                    <select
                      id="day"
                      className="form-select d-inline w-auto"
                      defaultValue={profile.birthday.day}
                    >
                      {days.map((day) => (
                        <option key={day} value={day}>
                          {day}
                        </option>
                      ))}
                    </select>
                    <select
                      id="month"
                      className="form-select d-inline w-auto"
                      defaultValue={profile.birthday.month}
                    >
                      {months.map((month) => (
                        <option key={month} value={month}>
                          Tháng {month}
                        </option>
                      ))}
                    </select>
                    <select
                      id="year"
                      className="form-select d-inline w-auto"
                      defaultValue={profile.birthday.year}
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Lưu
                </button>
              </div>

              {/* Right Column */}
              <div className="col-md-4 d-flex flex-column align-items-center">
                <img
                  src={avatar}
                  alt="Avatar"
                  className="rounded-circle mb-3"
                  style={{ width: 150 }}
                />
                <div className="text-center">
                  <input
                    type="file"
                    accept=".jpeg,.jpg,.png"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="avatarInput"
                  />
                  <label
                    htmlFor="avatarInput"
                    className="btn btn-outline-secondary"
                  >
                    Chọn Ảnh
                  </label>
                  <p className="mt-2 text-muted">
                    Dung lượng file tối đa 1MB
                    <br />
                    Định dạng: .JPEG, .PNG
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyAccountProfile;
