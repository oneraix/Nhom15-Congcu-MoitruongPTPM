import express from "express";
import {
  getAllSalaries,
  getSalaryById,
  addSalary,
  updateSalary,
  deleteSalary,
} from "../controllers/salaryController.js";

const router = express.Router();

// Route: Lấy danh sách tất cả bản ghi lương
router.get("/salaries", getAllSalaries);

// Route: Lấy thông tin lương theo ID
router.get("/salaries/:id", getSalaryById);

// Route: Thêm mới một bản ghi lương
router.post("/salaries", addSalary);

// Route: Cập nhật thông tin lương
router.put("/salaries/:id", updateSalary);

// Route: Xóa một bản ghi lương
router.delete("/salaries/:id", deleteSalary);

export default router;
