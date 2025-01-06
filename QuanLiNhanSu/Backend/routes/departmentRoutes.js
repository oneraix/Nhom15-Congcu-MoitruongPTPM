import express from "express";
import {
  getAllDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js";

const router = express.Router();

// Route: Lấy danh sách tất cả phòng ban
router.get("/departments", getAllDepartments);

// Route: Lấy thông tin một phòng ban theo ID
router.get("/departments/:id", getDepartmentById);

// Route: Thêm mới một phòng ban
router.post("/departments", addDepartment);

// Route: Cập nhật thông tin một phòng ban
router.put("/departments/:id", updateDepartment);

// Route: Xóa một phòng ban
router.delete("/departments/:id", deleteDepartment);

export default router;
