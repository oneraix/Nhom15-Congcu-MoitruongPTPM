import express from "express";
import {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployees,
  searchById,
  searchByName,
  searchByGender,
  searchByDob,
  searchByEmail,
  searchByPhone,
} from "../controllers/employeeController.js";

const router = express.Router();

// Thêm nhân viên
router.post("/employees", addEmployee);

// Sửa thông tin nhân viên
router.put("/employees/:employee_id", updateEmployee);

// Xóa nhân viên
router.delete("/employees/:employee_id", deleteEmployee);

// Lấy danh sách nhân viên
router.get("/employees", getEmployees);

router.post("/search-by-id", searchById);
router.post("/search-by-name", searchByName);
router.post("/search-by-gender", searchByGender);
router.post("/search-by-dob", searchByDob);
router.post("/search-by-email", searchByEmail);
router.post("/search-by-phone", searchByPhone);

export default router;
