import db from "../config/db.js"; // Kết nối cơ sở dữ liệu

// Lấy danh sách tất cả bản ghi lương
export const getAllSalaries = (req, res) => {
  const query = "SELECT * FROM salaries";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi lấy danh sách lương." });
    }
    res.status(200).json(results);
  });
};

// Lấy thông tin lương theo ID
export const getSalaryById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM salaries WHERE salary_id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi lấy thông tin lương." });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Không tìm thấy bản ghi lương." });
    }
    res.status(200).json(results[0]);
  });
};

// Thêm mới một bản ghi lương
export const addSalary = (req, res) => {
  const { basic_salary, job_allowance, other_allowance, note } = req.body;
  const query = `
    INSERT INTO salaries (basic_salary, job_allowance, other_allowance, note)
    VALUES (?, ?, ?, ?)
  `;
  db.query(
    query,
    [basic_salary, job_allowance, other_allowance, note],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi khi thêm bản ghi lương." });
      }
      res
        .status(201)
        .json({
          message: "Thêm bản ghi lương thành công.",
          salary_id: results.insertId,
        });
    }
  );
};

// Cập nhật thông tin lương
export const updateSalary = (req, res) => {
  const { id } = req.params;
  const { basic_salary, job_allowance, other_allowance, note } = req.body;
  const query = `
    UPDATE salaries
    SET basic_salary = ?, job_allowance = ?, other_allowance = ?, note = ?
    WHERE salary_id = ?
  `;
  db.query(
    query,
    [basic_salary, job_allowance, other_allowance, note, id],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Lỗi khi cập nhật thông tin lương." });
      }
      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "Không tìm thấy bản ghi lương để cập nhật." });
      }
      res.status(200).json({ message: "Cập nhật thông tin lương thành công." });
    }
  );
};

// Xóa một bản ghi lương
export const deleteSalary = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM salaries WHERE salary_id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi xóa bản ghi lương." });
    }
    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Không tìm thấy bản ghi lương để xóa." });
    }
    res.status(200).json({ message: "Xóa bản ghi lương thành công." });
  });
};
