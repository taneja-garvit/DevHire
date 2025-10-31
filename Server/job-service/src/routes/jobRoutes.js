import { createJob, getAllJobs, getJobById } from "../controllers/jobController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import express from "express";

const router = express.Router();

router.post("/",verifyAdmin,createJob);
router.get("/",getAllJobs);
router.get("/:id",getJobById)

export default router;