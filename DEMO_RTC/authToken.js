const jwt = require("jsonwebtoken");

// Secret key (tương tự như trong Java)
const secretKey = "8B2zYp5WpfJ2oLq1mSkhY9c4PpzN0mR8B2zYp5WpfJ2oLq1mSkhY9c4PpzN0mR8X8X";

// Thời gian hết hạn mặc định cho token (30 triệu ms = ~8.33 giờ)
const EXPIRATION_TIME = 30000000; // = ~8.33 hours

/**
 * Tạo token với thông tin truyền vào (thời gian hết hạn mặc định)
 * @param {string} orderInfo Thông tin cần lưu trong token
 * @returns {string} Token đã được mã hóa
 */
function generateToken(orderInfo) {
  // Kiểm tra giá trị của orderInfo trước khi tạo token
  if (!orderInfo || typeof orderInfo !== "string") {
    throw new Error("Invalid orderInfo parameter. It must be a non-empty string.");
  }

  // Tạo token
  return jwt.sign(
    { sub: orderInfo }, // payload với subject (sub) là orderInfo
    secretKey, // secret key để ký
    {
      expiresIn: EXPIRATION_TIME / 1000 + "s", // Thời gian hết hạn (giây)
      algorithm: "HS256", // Thuật toán ký
    }
  );
}

/**
 * Tạo token với thời gian hết hạn 30 ngày
 * @param {string} orderInfo Thông tin cần lưu trong token
 * @returns {string} Token đã được mã hóa
 */
function generateTokenAccount(orderInfo) {
  // Kiểm tra giá trị của orderInfo
  if (!orderInfo || typeof orderInfo !== "string") {
    throw new Error("Invalid orderInfo parameter. It must be a non-empty string.");
  }

  // Tạo token với thời gian hết hạn 30 ngày
  return jwt.sign(
    { sub: orderInfo }, // payload với subject (sub) là orderInfo
    secretKey, // secret key để ký
    {
      expiresIn: "30d", // Thời gian hết hạn là 30 ngày
      algorithm: "HS256", // Thuật toán ký
    }
  );
}

/**
 * Kiểm tra token có hợp lệ không
 * @param {string} token Token cần kiểm tra
 * @returns {boolean} Trả về true nếu hợp lệ, false nếu không
 */
function validateToken(token) {
  try {
    // Giải mã token
    jwt.verify(token, secretKey);
    return true; // Token hợp lệ
  } catch (error) {
    // Xử lý các lỗi cụ thể và hiển thị thông báo phù hợp
    if (error.name === "TokenExpiredError") {
      console.error("Token has expired.");
    } else if (error.name === "JsonWebTokenError") {
      console.error("Invalid token signature:", error.message);
    } else {
      console.error("Error during token validation:", error.message);
    }
    return false; // Token không hợp lệ
  }
}

/**
 * Lấy thông tin từ token (subject)
 * @param {string} token Token chứa thông tin
 * @returns {string | null} Thông tin subject hoặc null nếu lỗi
 */
async function getOrderInfoFromToken(token) {
    return fetch("http://localhost:8080/user/checkuser?token="+token, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json()) // Chuyển đổi response thành JSON
        .then((v) => {
          if (v.status === 200) {
            return v.data
          } else {
            console.log("Có lỗi nha bạn ơi =================")
            console.log(v.data)
            return null;
          }
        })
        .catch((error) => {
            return null;
        });
      
}

async function  getOrderInfoFromTokenShop(token) {
    return await fetch("http://localhost:8080/user/auth/checkseller", {
        method: "GET",
        headers: {
            "token":token,
          "Content-Type": "application/json",
        },
      })
        .then(async (response) =>await response.json())
        .then((v) => {
          if (v.status === 200) {
            let a=v.data
            // console.log(a)
            // console.log("LẤY THÀNH CÔNG")
            return a
          } else {
            console.log("LẤY SHOP LỖI BẠN ƠI ")
            return null;
          }
        })
        .catch((error) => {
            return null;
        });
      
}

module.exports = {
  generateToken,
  generateTokenAccount,
  validateToken,
  getOrderInfoFromToken,
  getOrderInfoFromTokenShop
};
