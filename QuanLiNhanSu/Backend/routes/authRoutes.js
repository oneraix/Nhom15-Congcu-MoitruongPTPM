import express from "express";
import { login } from "../controllers/authController.js";
import {
  getUserInfo,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { verifyToken } from "../Middleware/authMiddleware.js";

const router = express.Router();

// Route đăng nhập
router.post("/login", login);
router.get("/userinfo", verifyToken, getUserInfo);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
