import React, { useEffect, useState } from "react";
import addressesData from "../../data/json/address.json";

const MyAccountAddress = () => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    setAddresses(addressesData);
  }, []);

  const handleSetDefault = (id) => {
    const updatedAddresses = addresses.map((address) => ({
      ...address,
      isDefault: address.id === id,
    }));
    setAddresses(updatedAddresses);
  };

  return (
    <div className="col-lg-10">
      <div className="card-address ">
        <div className="head-address d-flex justify-content-between align-items-center">
          <span className="fw-6 fs-18">Địa chỉ của tôi</span>
          <a href="#" className="add-address-btn">
            +Thêm địa chỉ mới
          </a>
        </div>
        <div className="body-profile">
          <p className="fs-16 fw-4 pb-3 pt-3">Địa chỉ</p>
          {addresses.map((address) => (
            <div className="row address-list" key={address.id}>
              <div className="col-md-8">
                <div className="row align-items-center">
                  <label htmlFor={`address-${address.id}`} className="col-sm-3">
                    {address.name}
                  </label>
                  <div className="col-sm-9">
                    <span id={`phone-${address.id}`} className="fw-6">
                      {address.phone}
                    </span>
                  </div>
                </div>
                <p className="text-black-50">{address.addressLine1}</p>
                <p className="text-black-50">{address.addressLine2}</p>
                {address.isDefault && (
                  <span className="btn-macDinh text-primary">Mặc định</span>
                )}
              </div>
              <div className="col-md-4 text-center body-profile-right">
                <p className="text-primary">Cập nhật</p>
                <a
                  href="#"
                  onClick={() => handleSetDefault(address.id)}
                  className={`${
                    address.isDefault
                      ? "btn-thietLapMacDinh"
                      : "btn-khongPhaiMacDinh"
                  }`}
                >
                  Thiết lập mặc định
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAccountAddress;
