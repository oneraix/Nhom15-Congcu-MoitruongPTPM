import express from "express";
import { getStatistics } from "../controllers/reportController.js";

const router = express.Router();

// Route lấy báo cáo thống kê
router.get("/statistics", getStatistics);

export default router;
