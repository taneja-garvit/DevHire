import express from "express"
import { createTestSession, getTestById } from "../controllers/testController.js"

const router = express.Router()
router.post("/",createTestSession);
router.get("/id",getTestById);

export default router;