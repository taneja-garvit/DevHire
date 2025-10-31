import express from "express";
import {
  evaluateTest,
  getRecruiterResults,
  getUserResults
} from "../controllers/evaluatorController.js";

const router = express.Router();

router.post("/evaluate", evaluateTest);

router.get("/results/recruiter/:recruiterId", getRecruiterResults);

router.get("/results/:userId", getUserResults);

export default router;
