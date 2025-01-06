import express from "express";
import { addDiscipline, getDisciplines, deleteDiscipline } from "../controllers/disciplineController.js";

const router = express.Router();

router.get("/disciplines", getDisciplines);
router.post("/disciplines", addDiscipline);
router.delete("/disciplines/:discipline_id", deleteDiscipline);

export default router;
