import express from "express";
import {
  getAttendances,
  addAttendance,
  updateAttendance,
  deleteAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.get("/attendances", getAttendances);
router.post("/attendances", addAttendance);
router.put("/attendances/:attendance_id", updateAttendance);
router.delete("/attendances/:attendance_id", deleteAttendance);

export default router;
