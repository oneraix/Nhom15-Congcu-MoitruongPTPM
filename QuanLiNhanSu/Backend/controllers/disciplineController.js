import db from "../config/db.js";

// Thêm kỷ luật
export const addDiscipline = (req, res) => {
  const { employee_id, discipline_type, description, discipline_date, penalty } = req.body;

  if (!employee_id || !discipline_type || !discipline_date) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin." });
  }

  const query = `
    INSERT INTO disciplines (employee_id, discipline_type, description, discipline_date, penalty) 
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(query, [employee_id, discipline_type, description, discipline_date, penalty], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi thêm kỷ luật." });
    }
    res.status(201).json({ message: "Thêm kỷ luật thành công.", disciplineId: results.insertId });
  });
};

// Lấy danh sách kỷ luật
export const getDisciplines = (req, res) => {
  const query = `
    SELECT disciplines.*, employees.full_name 
    FROM disciplines 
    JOIN employees ON disciplines.employee_id = employees.employee_id
  `;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi lấy danh sách kỷ luật." });
    }
    res.status(200).json(results);
  });
};

// Xóa kỷ luật
export const deleteDiscipline = (req, res) => {
  const { discipline_id } = req.params;

  const query = "DELETE FROM disciplines WHERE discipline_id = ?";
  db.query(query, [discipline_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi xóa kỷ luật." });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Kỷ luật không tồn tại." });
    }
    res.status(200).json({ message: "Xóa kỷ luật thành công." });
  });
};
