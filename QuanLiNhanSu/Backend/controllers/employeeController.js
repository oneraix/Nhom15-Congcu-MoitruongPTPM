import db from "../config/db.js"; // Giả sử bạn đã cấu hình MySQL trong db.js

// Thêm nhân viên
export const addEmployee = (req, res) => {
  const { full_name, gender, date_of_birth, email, phone_number } = req.body;

  if (!full_name || !gender || !date_of_birth || !email || !phone_number) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin." });
  }

  const query = `
    INSERT INTO employees (full_name, gender, date_of_birth, email, phone_number) 
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [full_name, gender, date_of_birth, email, phone_number],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi khi thêm nhân viên." });
      }
      return res.status(201).json({
        message: "Thêm nhân viên thành công.",
        employeeId: results.insertId,
      });
    }
  );
};

// Sửa thông tin nhân viên
export const updateEmployee = (req, res) => {
  const { employee_id } = req.params;
  const { full_name, gender, date_of_birth, email, phone_number } = req.body;

  if (!full_name || !gender || !date_of_birth || !email || !phone_number) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin." });
  }

  const query = `
    UPDATE employees 
    SET full_name = ?, gender = ?, date_of_birth = ?, email = ?, phone_number = ? 
    WHERE employee_id = ?
  `;

  db.query(
    query,
    [full_name, gender, date_of_birth, email, phone_number, employee_id],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Lỗi khi sửa thông tin nhân viên." });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Nhân viên không tồn tại." });
      }

      return res
        .status(200)
        .json({ message: "Sửa thông tin nhân viên thành công." });
    }
  );
};

// Xóa nhân viên
export const deleteEmployee = (req, res) => {
  const { employee_id } = req.params;

  const query = "DELETE FROM employees WHERE employee_id = ?";

  db.query(query, [employee_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi xóa nhân viên." });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Nhân viên không tồn tại." });
    }

    return res.status(200).json({ message: "Xóa nhân viên thành công." });
  });
};

// Lấy danh sách nhân viên
export const getEmployees = (req, res) => {
  const query = "SELECT * FROM employees";

  db.query(query, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Lỗi khi lấy danh sách nhân viên." });
    }

    return res.status(200).json({
      message: "Danh sách nhân viên.",
      employees: results,
    });
  });
};

export const searchById = (req, res) => {
  const { employee_id } = req.body;
  console.log(employee_id);

  if (!employee_id) {
    return res.status(400).json({ error: "employee_id là bắt buộc" });
  }

  const query = "SELECT * FROM employees WHERE employee_id = ?";
  db.query(query, [employee_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.status(200).json(results);
  });
};

// Tìm kiếm theo tên
export const searchByName = (req, res) => {
  const { full_name } = req.body;

  if (!full_name) {
    return res.status(400).json({ error: "full_name là bắt buộc" });
  }

  const query = "SELECT * FROM employees WHERE full_name LIKE ?";
  db.query(query, [`%${full_name}%`], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.status(200).json(results);
  });
};

// Tìm kiếm theo giới tính
export const searchByGender = (req, res) => {
  const { gender } = req.body;

  if (!gender) {
    return res.status(400).json({ error: "gender là bắt buộc" });
  }

  const query = "SELECT * FROM employees WHERE gender = ?";
  db.query(query, [gender], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.status(200).json(results);
  });
};

// Tìm kiếm theo ngày sinh
export const searchByDob = (req, res) => {
  const { date_of_birth } = req.body;

  if (!date_of_birth) {
    return res.status(400).json({ error: "date_of_birth là bắt buộc" });
  }

  const query = "SELECT * FROM employees WHERE date_of_birth = ?";
  db.query(query, [date_of_birth], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.status(200).json(results);
  });
};

// Tìm kiếm theo email
export const searchByEmail = (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "email là bắt buộc" });
  }

  const query = "SELECT * FROM employees WHERE email LIKE ?";
  db.query(query, [`%${email}%`], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.status(200).json(results);
  });
};

// Tìm kiếm theo số điện thoại
export const searchByPhone = (req, res) => {
  const { phone_number } = req.body;

  if (!phone_number) {
    return res.status(400).json({ error: "phone_number là bắt buộc" });
  }

  const query = "SELECT * FROM employees WHERE phone_number LIKE ?";
  db.query(query, [`%${phone_number}%`], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Lỗi server" });
    }
    res.status(200).json(results);
  });
};
