import express from "express";
import { addReward, getRewards, deleteReward } from "../controllers/rewardController.js";

const router = express.Router();

router.get("/rewards", getRewards);
router.post("/rewards", addReward);
router.delete("/rewards/:reward_id", deleteReward);

export default router;
