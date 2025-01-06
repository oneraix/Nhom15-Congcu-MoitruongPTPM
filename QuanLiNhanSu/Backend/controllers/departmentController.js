import db from "../config/db.js";

export const getAllDepartments = (req, res) => {
  const query = "SELECT * FROM departments";
  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Lỗi server", error: err });
    }
    res.status(200).json({ success: true, data: results });
  });
};

// Lấy thông tin một phòng ban theo ID
export const getDepartmentById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM departments WHERE department_id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Lỗi server", error: err });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Phòng ban không tồn tại" });
    }
    res.status(200).json({ success: true, data: results[0] });
  });
};

// Thêm mới một phòng ban
export const addDepartment = (req, res) => {
  const { department_name, description } = req.body;
  if (!department_name) {
    return res
      .status(400)
      .json({ success: false, message: "Tên phòng ban là bắt buộc" });
  }
  const query =
    "INSERT INTO departments (department_name, description) VALUES (?, ?)";
  db.query(query, [department_name, description], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Lỗi server", error: err });
    }
    res.status(201).json({
      success: true,
      message: "Thêm phòng ban thành công",
      department_id: results.insertId,
    });
  });
};

// Cập nhật thông tin một phòng ban
export const updateDepartment = (req, res) => {
  const { id } = req.params;
  const { department_name, description } = req.body;
  const query =
    "UPDATE departments SET department_name = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE department_id = ?";
  db.query(query, [department_name, description, id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Lỗi server", error: err });
    }
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Phòng ban không tồn tại" });
    }
    res
      .status(200)
      .json({ success: true, message: "Cập nhật phòng ban thành công" });
  });
};

// Xóa một phòng ban
export const deleteDepartment = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM departments WHERE department_id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Lỗi server", error: err });
    }
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Phòng ban không tồn tại" });
    }
    res
      .status(200)
      .json({ success: true, message: "Xóa phòng ban thành công" });
  });
};
