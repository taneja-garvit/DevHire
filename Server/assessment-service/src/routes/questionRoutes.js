import express from "express"
import { getAllQuestions } from "../controllers/questionController";

const router= express.Router();

router.get("/",getAllQuestions);

export default router;