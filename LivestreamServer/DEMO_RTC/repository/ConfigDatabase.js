const { Sequelize } = require('sequelize');

// Tạo kết nối với cơ sở dữ liệu
const sequelize = new Sequelize('testDemo', 'root', '1234spdf', {
  host: 'localhost',  // Hoặc địa chỉ IP của database server
  dialect: 'mysql',   // Loại cơ sở dữ liệu (MySQL)
  logging: false      // Tắt log SQL nếu không muốn hiển thị trong console
});

// Kiểm tra kết nối
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
