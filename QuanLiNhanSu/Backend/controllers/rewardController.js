import db from "../config/db.js";

// Thêm khen thưởng
export const addReward = (req, res) => {
  const { employee_id, reward_type, description, reward_date, amount } = req.body;

  if (!employee_id || !reward_type || !reward_date) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin." });
  }

  const query = `
    INSERT INTO rewards (employee_id, reward_type, description, reward_date, amount) 
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(query, [employee_id, reward_type, description, reward_date, amount], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi thêm khen thưởng." });
    }
    res.status(201).json({ message: "Thêm khen thưởng thành công.", rewardId: results.insertId });
  });
};

// Lấy danh sách khen thưởng
export const getRewards = (req, res) => {
  const query = `
    SELECT rewards.*, employees.full_name 
    FROM rewards 
    JOIN employees ON rewards.employee_id = employees.employee_id
  `;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi lấy danh sách khen thưởng." });
    }
    res.status(200).json(results);
  });
};

// Xóa khen thưởng
export const deleteReward = (req, res) => {
  const { reward_id } = req.params;

  const query = "DELETE FROM rewards WHERE reward_id = ?";
  db.query(query, [reward_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi xóa khen thưởng." });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Khen thưởng không tồn tại." });
    }
    res.status(200).json({ message: "Xóa khen thưởng thành công." });
  });
};
