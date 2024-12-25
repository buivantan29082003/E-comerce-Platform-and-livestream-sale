import { useContext, useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import api from "../../../config/APISeller";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../App";
import toast from "react-hot-toast";
import { RiUpload2Line } from "react-icons/ri";

const UpdateShop = () => {
  const navi = useNavigate();
  const [shop, setShop] = useState({
    shopName: "",
    moTa: "",
  });
  const { setFloadingPage } = useContext(AppContext);
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
        console.log("Danh sách thành phố:", data);
      })
      .catch((error) => {
        console.error("Lỗi:", error);
      });
  };

  const uploadFile = async (e, property) => {
    const file = e.target.files[0]; // Lấy file người dùng chọn
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await fetch(
        "http://localhost:8080/upload-single-files",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        setShop((prevState) => ({
          ...prevState,
          [property]: data.data,
        }));
      } else {
        console.log("Upload failed: ", data);
        alert("Upload failed: " + data.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  const updateShop = () => {
    toast.promise(
      api
        .post("/shop/update", shop, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((v) => v.data)
        .then((v) => {
          if (v.status !== 200) {
            throw new Error(v.message);
          }
        }),
      {
        loading: "Đang cập nhật",
        success: "Cập nhật shop thành công",
        error: (error) => error.message,
      }
    );
  };

  useEffect(() => {
    setFloadingPage();
    api
      .get("/shop/shopinfo")
      .then((v) => v.data)
      .then((v) => {
        if (v.status === 200) {
          setShop(v.data);
        } else {
          navi("/seller/");
        }
      })
      .catch((error) => {
        alert("Có lỗi xảy ra vui lòng thử lại sao");
      });
    getThanhPho();
  }, []);

  return (
    <div
      style={{ borderRadius: "8px" }}
      className="shadow-md mt-3 container mx-auto p-6 bg-white"
    >
      <p className="font-semibold text-lg text-blue-600 mb-2">Thông tin shop</p>
      <hr />
      {/*  */}
      <div className="my-2">
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-12 lg:col-span-2 text-sm font-semibold lg:text-right">
            Tên shop
          </label>
          <div className="col-span-12 lg:col-span-10">
            <input
              value={shop.shopName}
              onChange={(e) => {
                setShop((prevState) => ({
                  ...prevState,
                  shopName: e.target.value,
                }));
              }}
              type="text"
              placeholder="Nhập tên shop"
              className="w-full lg:w-3/4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
            <p className="text-xs mt-2 text-red-500">
              {shop.shopName.length < 10 || shop.shopName.length > 50
                ? "Độ dài tên không hợp lệ (10-50 ký tự)"
                : ""}
            </p>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="mb-2">
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-12 lg:col-span-2 text-sm font-semibold lg:text-right">
            Tên công ty (Nếu có)
          </label>
          <div className="col-span-12 lg:col-span-10">
            <input
              value={shop.tenCongTy}
              onChange={(e) => {
                setShop((prevState) => ({
                  ...prevState,
                  tenCongTy: e.target.value,
                }));
              }}
              type="text"
              placeholder="Nhập tên công ty"
              className="w-full lg:w-3/4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>
        </div>
      </div>

      {/*  */}
      <div className="mb-2">
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-12 lg:col-span-2 text-sm font-semibold lg:text-right">
            Mô tả
          </label>
          <div className="col-span-12 lg:col-span-10">
            <textarea
              value={shop.moTa}
              onChange={(e) => {
                setShop((prevState) => ({
                  ...prevState,
                  moTa: e.target.value,
                }));
              }}
              placeholder="Nhập mô tả"
              className="w-full lg:w-3/4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
            <p className="text-xs mt-2 text-red-500">
              {shop.moTa.length < 10 || shop.moTa.length > 500
                ? "Độ dài mô tả không hợp lệ (10-500 ký tự)"
                : ""}
            </p>
          </div>
        </div>
      </div>

      {/*   */}
      <div className="mb-2">
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-12 lg:col-span-2 text-sm font-semibold lg:text-right">
            Giấy phép kinh doanh
          </label>
          <div className="col-span-12 lg:col-span-10">
            <div className="flex items-center gap-4">
              <img
                src={shop.giayPhepKinhDoanh}
                alt="Giấy phép"
                className="w-24 h-24 rounded"
              />
              <button
                onClick={() => document.getElementById("shopG").click()}
                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
              >
                <RiUpload2Line size={20} />
              </button>
              <input
                onChange={(e) => uploadFile(e, "giayPhepKinhDoanh")}
                id="shopG"
                type="file"
                hidden
              />
            </div>
          </div>
        </div>
      </div>

      {/*    */}
      <div className="mb-2">
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-12 lg:col-span-2 text-sm font-semibold lg:text-right">
            Mã số thuế
          </label>
          <div className="col-span-12 lg:col-span-10">
            <input
              value={shop.maSoThue}
              onChange={(e) => {
                setShop((prevState) => ({
                  ...prevState,
                  maSoThue: e.target.value,
                }));
              }}
              type="text"
              placeholder="Nhập mã số thuế"
              className="w-full lg:w-3/4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
          </div>
        </div>
      </div>

      {/*   */}
      <div className="mb-2">
        <div className="grid grid-cols-12 gap-4 items-center">
          <label className="col-span-12 lg:col-span-2 text-sm font-semibold lg:text-right">
            Ảnh shop
          </label>
          <div className="col-span-12 lg:col-span-10">
            <div className="flex items-center gap-4">
              <img
                src={shop.hinhAnh}
                alt="Ảnh shop"
                className="w-24 h-24 rounded"
              />
              <button
                onClick={() => document.getElementById("shopImage").click()}
                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
              >
                <RiUpload2Line size={20} />
              </button>
              <input
                onChange={(e) => uploadFile(e, "hinhAnh")}
                id="shopImage"
                type="file"
                hidden
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      {/*   */}
      <div className="text-right mt-2 mr-8">
        <button
          onClick={() => updateShop()}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
        >
          Cập nhật shop
        </button>
      </div>
    </div>
  );
};
export default UpdateShop;
