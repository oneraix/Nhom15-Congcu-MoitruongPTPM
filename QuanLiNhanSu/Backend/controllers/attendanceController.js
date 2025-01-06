import db from "../config/db.js";

// Lấy danh sách chấm công
export const getAttendances = (req, res) => {
  const query = `
    SELECT a.attendance_id, e.full_name, a.attendance_date, a.status, a.notes
    FROM attendances a
    LEFT JOIN employees e ON a.employee_id = e.employee_id
  `;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi lấy danh sách chấm công." });
    }
    res.status(200).json(results);
  });
};

// Thêm chấm công mới
export const addAttendance = (req, res) => {
  const { employee_id, attendance_date, status, notes } = req.body;

  if (!employee_id || !attendance_date || !status) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin." });
  }

  const query = `
    INSERT INTO attendances (employee_id, attendance_date, status, notes)
    VALUES (?, ?, ?, ?)
  `;
  db.query(query, [employee_id, attendance_date, status, notes || null], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi thêm chấm công." });
    }
    res.status(201).json({ message: "Thêm chấm công thành công.", attendanceId: results.insertId });
  });
};

// Cập nhật thông tin chấm công
export const updateAttendance = (req, res) => {
  const { attendance_id } = req.params;
  const { employee_id, attendance_date, status, notes } = req.body;

  const query = `
    UPDATE attendances
    SET employee_id = ?, attendance_date = ?, status = ?, notes = ?
    WHERE attendance_id = ?
  `;
  db.query(
    query,
    [employee_id, attendance_date, status, notes || null, attendance_id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi khi cập nhật chấm công." });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Chấm công không tồn tại." });
      }
      res.status(200).json({ message: "Cập nhật chấm công thành công." });
    }
  );
};

// Xóa chấm công
export const deleteAttendance = (req, res) => {
  const { attendance_id } = req.params;

  const query = "DELETE FROM attendances WHERE attendance_id = ?";
  db.query(query, [attendance_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi xóa chấm công." });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Chấm công không tồn tại." });
    }
    res.status(200).json({ message: "Xóa chấm công thành công." });
  });
};
