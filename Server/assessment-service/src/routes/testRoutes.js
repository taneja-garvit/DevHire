import express from "express"
import { createTestSession, getTestById } from "../controllers/testController"

const router = express.Router()
router.post("/",createTestSession);
router.get("/id",getTestById);

export default router;