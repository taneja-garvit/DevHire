import express from "express";
import { getMe, login, signup, getUserById } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.get("/me",protect,getMe);
router.get("/user/:userId",protect,getUserById);

export default router;
