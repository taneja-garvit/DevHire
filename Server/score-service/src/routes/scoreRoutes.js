import express from "express";
import { saveScore, getScoresByRecruiter, getScoresByUser } from "../controllers/scoreController.js";

const router = express.Router();

router.post("/save", saveScore);
router.get("/recruiter/:recruiterId", getScoresByRecruiter);
router.get("/user/:userId", getScoresByUser);

export default router;
