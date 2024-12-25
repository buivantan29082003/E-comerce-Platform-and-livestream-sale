import { useContext, useEffect, useState } from "react";
import api from "../../../config/APISeller";
import toast from "react-hot-toast";
import { AppContext } from "../../../App";

const UpdateAddressShop = () => {
  const { setFloadingPage } = useContext(AppContext);
  const submit = () => {
    if (address.wardCode == -1) {
      alert("Vui lòng chọn đầy đủ địa chỉ");
    } else {
      toast.promise(
        api
          .post("/shop/updateaddress", address, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((v) => v.data)
          .then((v) => {
            if (v.status != 200) {
              throw new Error(v.message);
            }
          }),
        {
          loading: "Đang cập nhật địa chỉ....",
          success: "Cập nhật địa chỉ thành công...",
          error: (error) => error.message,
        }
      );
    }
  };
  const [address, setAddress] = useState({
    proviceId: -1,
    wardCode: "",
    districtId: -1,
    ghiChu: "Nguyễn Vấ",
    toanBoDiaChi: "",
    chiTietDiaChi: "",
  });

  const [thanhPho, setThanhPho] = useState([]);
  const [wardCode, ssetWardCode] = useState([]);
  const [district, setDistrict] = useState([]);
  const getThanhPho = () => {
    const token = "1c0642bd-4891-11ef-af01-5a4abb38d4d4";
    const shopId = "5146217";
    fetch(
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Token: token,
          ShopId: shopId,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setThanhPho(data.data);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  };

  const getDiaChiShop = () => {
    api
      .get("/shop/getaddress")
      .then((v) => v.data)
      .then((v) => {
        setAddress(v);
        getThanhPho();
        getDistrictId(v.proviceId);
        getWardCode(v.districtId);
      })
      .catch((error) => {
        alert("Lấy địa chỉ thất bại");
      });
  };

  const getDistrictId = (id) => {
    const token = "1c0642bd-4891-11ef-af01-5a4abb38d4d4";
    const shopId = "5146217";
    fetch(
      "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: token,
          ShopId: shopId,
        },
        body: JSON.stringify({
          province_id: id,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setDistrict(data.data);
        address.districtId = data.data[0].DistrictID;
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  };

  const getWardCode = (id) => {
    const token = "1c0642bd-4891-11ef-af01-5a4abb38d4d4";
    const shopId = "5146217";
    fetch("https://online-gateway.ghn.vn/shiip/public-api/master-data/ward", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Token: token,
        ShopId: shopId,
      },
      body: JSON.stringify({
        district_id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        ssetWardCode(data.data);
        address.wardCode = data.data[0].WardCode;
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  };

  useEffect(() => {
    setFloadingPage();
    getDiaChiShop();
  }, []);

  return (
    <div
      style={{ borderRadius: "7px" }}
      className="shadow-md mt-2 container mx-3 p-6  bg-white"
    >
      <p className="font-semibold text-blue-600 text-lg mb-2">Thông tin shop</p>
      <hr />
      {/* */}
      <div className="flex flex-wrap gap-4 mt-2">
        {/*   */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Thành phố
          </label>
          <select
            onChange={(e) => {
              address.wardCode = -1;
              address.toanBoDiaChi =
                thanhPho[e.target.value].ProvinceName + "-";
              address.proviceId = thanhPho[e.target.value].ProvinceID;
              getDistrictId(address.proviceId);
            }}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          >
            {thanhPho.map((v, k) => (
              <option selected={address.provinceId === v.ProvinceID} value={k}>
                {v.ProvinceName}
              </option>
            ))}
          </select>
        </div>

        {/*  */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Huyện
          </label>
          <select
            onChange={(e) => {
              address.districtId = district[e.target.value].DistrictID;
              address.toanBoDiaChi =
                address.toanBoDiaChi.substring(
                  0,
                  address.toanBoDiaChi.indexOf("-")
                ) +
                "-" +
                district[e.target.value].DistrictName +
                "-";
              getWardCode(address.districtId);
            }}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          >
            {address.districtId != -1 &&
              district.map((v, k) => (
                <option
                  selected={address.districtId === v.DistrictID}
                  value={k}
                >
                  {v.DistrictName}
                </option>
              ))}
          </select>
        </div>

        {/*   */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Thị xã
          </label>
          <select
            onChange={(e) => {
              address.toanBoDiaChi =
                address.toanBoDiaChi.substring(
                  0,
                  address.toanBoDiaChi.lastIndexOf("-")
                ) +
                "-" +
                wardCode[e.target.value].WardName;
              setAddress((prevAddress) => ({
                ...prevAddress,
                wardCode: wardCode[e.target.value].WardCode,
              }));
            }}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          >
            {address.wardCode != -1 &&
              wardCode.map((v, k) => (
                <option selected={address.wardCode === v.WardCode} value={k}>
                  {v.WardName}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/*  */}
      <div className="mt-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Toàn bộ địa chỉ
        </label>
        <input
          disabled
          value={address.toanBoDiaChi}
          type="text"
          placeholder="Địa chỉ tổng hợp"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />
      </div>

      {/*     */}
      <div className="mt-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Địa chỉ chi tiết
        </label>
        <textarea
          value={address.chiTietDiaChi}
          onChange={(e) => {
            setAddress((prevState) => ({
              ...prevState,
              chiTietDiaChi: e.target.value,
            }));
          }}
          placeholder="Nhập địa chỉ chi tiết"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />
      </div>

      {/*    */}
      <div className="mt-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Số điện thoại
        </label>
        <input
          value={address.soDienThoai}
          onChange={(e) => {
            setAddress((prevState) => ({
              ...prevState,
              soDienThoai: e.target.value,
            }));
          }}
          type="text"
          placeholder="Nhập số điện thoại"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />
      </div>

      {/*   */}
      <div className="mt-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Ghi chú
        </label>
        <textarea
          value={address.ghiChu}
          onChange={(e) => {
            setAddress((prevState) => ({
              ...prevState,
              ghiChu: e.target.value,
            }));
          }}
          placeholder="Nhập ghi chú"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />
      </div>

      {/*   */}
      <div className="mt-6">
        <button
          onClick={() => {
            submit();
          }}
          className="w-full lg:w-auto bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Cập nhật shop
        </button>
      </div>
    </div>
  );
};
export default UpdateAddressShop;
