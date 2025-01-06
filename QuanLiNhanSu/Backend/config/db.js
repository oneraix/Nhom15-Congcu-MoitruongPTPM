import mysql from "mysql";

// Tạo kết nối
const connection = mysql.createConnection({
  host: "localhost", // Địa chỉ máy chủ MySQL
  user: "root", // Tên người dùng MySQL
  password: "", // Mật khẩu MySQL
  database: "quanlynhansu1", // Tên cơ sở dữ liệu
});

export default connection;
