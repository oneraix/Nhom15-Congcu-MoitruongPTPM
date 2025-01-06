import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret_key"; // Khóa bí mật JWT

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header

  if (!token) {
    return res.status(401).json({ error: "Bạn cần đăng nhập để tiếp tục." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Lưu thông tin giải mã từ token
    next(); // Chuyển tiếp đến controller
  } catch (err) {
    return res.status(403).json({ error: "Token không hợp lệ." });
  }
};
