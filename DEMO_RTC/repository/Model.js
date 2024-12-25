const { Sequelize, DataTypes } = require('sequelize');

// Tạo kết nối đến cơ sở dữ liệu
const sequelize = new Sequelize('livestream', 'root', '1234spdf', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 5, // Số lượng kết nối tối đa trong pool
    min: 0, // Số lượng kết nối tối thiểu trong pool
    acquire: 30000, // Thời gian tối đa (ms) để một kết nối được lấy từ pool
    idle: 10000 // Thời gian tối đa (ms) mà một kết nối có thể không hoạt động trước khi bị giải phóng
  }
});

// Định nghĩa mô hình 'account' (bảng users)
const account = sequelize.define('account', {
  email: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'account',
  timestamps:false
});

const shop = sequelize.define('shop', {
    shopId: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
      allowNull: false
    },
    shopName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accountId: {
      type: DataTypes.STRING,
      references: {
        model: account, // Tham chiếu đến bảng account
        key: 'email'    // Khóa chính trong bảng account
      },
      allowNull: false
    }
  }, {
    tableName: 'shop',
    timestamps: false
  });





  const liveSession = sequelize.define('livesession', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull: false
    },
    tieuDe: {
      type: DataTypes.STRING,
      allowNull: false
    },
    moTa: {
        type: DataTypes.STRING,
        allowNull: false
      },
    startTime: {
    type: DataTypes.DATE,
    allowNull: true
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: true
    },
    likeCount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    cartCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    
    shopId:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
  }, {
    tableName: 'livesession',
    timestamps: false
  });


  const comment = sequelize.define('comments', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true
    },
    accountId: {
      type: DataTypes.STRING,
      references: {
        model: account, // Tham chiếu đến bảng account
        key: 'email'    // Khóa chính trong bảng account
      },
      allowNull: false
    },
    liveSession: {
        type: DataTypes.INTEGER,
        references: {
          model: liveSession, // Tham chiếu đến bảng account
          key: 'liveSession'    // Khóa chính trong bảng account
        },
        allowNull: false
      }
  }, {
    tableName: 'comments',
    timestamps: false
  });
  console.log("Start")

// Hàm thực hiện các thao tác cơ bản
const init=(async () => {
  try {
    // Kiểm tra kết nối
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Đồng bộ hóa mô hình với cơ sở dữ liệu (cập nhật cấu trúc bảng nếu cần)
    // await sequelize.sync({ force: true });
    console.log('Database & tables updated.');

    // Tạo một bản ghi mới trong bảng 'account' (nếu cần)
    

    // Tìm bản ghi theo email
    const user = await comment.findOne({ where: { id: 1 } });
    console.log(user)
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})
module.exports = {
    sequelize,
    account,
    shop,
    liveSession,
    comment,
    init
  };