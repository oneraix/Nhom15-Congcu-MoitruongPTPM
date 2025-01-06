import express from "express";
import { getAccounts, addAccount, updateAccount, deleteAccount } from "../controllers/accountController.js";

const router = express.Router();

router.get("/accounts", getAccounts);
router.post("/accounts", addAccount);
router.put("/accounts/:account_id", updateAccount);
router.delete("/accounts/:account_id", deleteAccount);

export default router;
