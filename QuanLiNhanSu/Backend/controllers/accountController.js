import db from "../config/db.js";

// Lấy danh sách tài khoản
export const getAccounts = (req, res) => {
  const query = "SELECT * FROM accounts";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi lấy danh sách tài khoản." });
    }
    res.status(200).json(results);
  });
};

// Thêm tài khoản
export const addAccount = (req, res) => {
  const { username, password, role_id, fullname, status } = req.body;

  if (!username || !password || !role_id) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin." });
  }

  const query = `
    INSERT INTO accounts (username, password, role_id, fullname, status) 
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(query, [username, password, role_id, fullname, status], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi thêm tài khoản." });
    }
    res.status(201).json({ message: "Thêm tài khoản thành công.", accountId: results.insertId });
  });
};

// Cập nhật thông tin tài khoản
export const updateAccount = (req, res) => {
  const { account_id } = req.params;
  const { username, role_id, fullname, status } = req.body;

  const query = `
    UPDATE accounts 
    SET username = ?, role_id = ?, fullname = ?, status = ?
    WHERE account_id = ?
  `;
  db.query(query, [username, role_id, fullname, status, account_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi cập nhật tài khoản." });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Tài khoản không tồn tại." });
    }
    res.status(200).json({ message: "Cập nhật tài khoản thành công." });
  });
};

// Xóa tài khoản
export const deleteAccount = (req, res) => {
  const { account_id } = req.params;

  const query = "DELETE FROM accounts WHERE account_id = ?";
  db.query(query, [account_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi xóa tài khoản." });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Tài khoản không tồn tại." });
    }
    res.status(200).json({ message: "Xóa tài khoản thành công." });
  });
};
