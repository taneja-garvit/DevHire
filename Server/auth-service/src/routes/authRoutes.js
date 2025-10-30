import express from "express";
import { getMe, login, signup } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/me",protect,getMe);

export default router;
