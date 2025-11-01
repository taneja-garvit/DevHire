import express from "express";
import cors from "cors";
import { requireAuth } from "./middlewares/authMiddleware.js";

import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import assessmentRoutes from "./routes/assessmentRoutes.js";
import evaluatorRoutes from "./routes/evaluatorRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Gateway Service up ✅"));

// Public routes
app.use("/auth", authRoutes);

// Protected routes (after login)
app.use("/jobs", requireAuth, jobRoutes);
app.use("/assessments", requireAuth, assessmentRoutes);
app.use("/evaluator", requireAuth, evaluatorRoutes);
app.use("/scores", requireAuth, scoreRoutes);
app.use("/notifications", requireAuth, notificationRoutes);

export default app;
