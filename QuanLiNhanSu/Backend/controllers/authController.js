import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

// Secret key cho JWT
const JWT_SECRET = "your_jwt_secret_key"; // Thay bằng key bảo mật riêng

// Đăng nhập
export const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin." });
  }

  // Tìm người dùng trong database
  const query = "SELECT * FROM accounts WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi server." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Tài khoản không tồn tại." });
    }

    const user = results[0];

    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Mật khẩu không chính xác." });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { account_id: user.account_id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "Đăng nhập thành công.",
      token,
    });
  });
};

export const getUserInfo = (req, res) => {
  const { account_id } = req.user; // Dữ liệu từ token đã giải mã trong middleware (nếu có)

  // Truy vấn thông tin tài khoản và vai trò
  const query = `
    SELECT 
      accounts.account_id, 
      accounts.username, 
      accounts.fullname, 
      roles.name AS role_name
    FROM accounts
    LEFT JOIN roles ON accounts.role_id = roles.role_id
    WHERE accounts.account_id = ?`;

  db.query(query, [account_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi server." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy người dùng." });
    }

    const user = results[0];

    // Trả về thông tin người dùng
    return res.status(200).json({
      account_id: user.account_id,
      username: user.username,
      fullname: user.fullname,
      role: user.role_name,
    });
  });
};

export const forgotPassword = (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Vui lòng nhập username." });
  }

  const query = "SELECT * FROM accounts WHERE username = ?";
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi server." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Username không tồn tại." });
    }

    return res
      .status(200)
      .json({ message: "Username hợp lệ, có thể đặt lại mật khẩu." });
  });
};

// Cập nhật mật khẩu mới
export const resetPassword = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin." });
  }

  // Kiểm tra xem username có tồn tại hay không
  const query = "SELECT * FROM accounts WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi server." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Username không tồn tại." });
    }

    // Mã hóa mật khẩu mới
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cập nhật mật khẩu vào cơ sở dữ liệu
    const updateQuery = "UPDATE accounts SET password = ? WHERE username = ?";
    db.query(updateQuery, [hashedPassword, username], (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Lỗi server khi cập nhật mật khẩu." });
      }

      return res
        .status(200)
        .json({ message: "Mật khẩu đã được cập nhật thành công." });
    });
  });
};
