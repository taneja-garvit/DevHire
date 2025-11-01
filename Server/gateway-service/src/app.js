import express from "express";
import cors from "cors";
import applyRoutes from "./routes/applyRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import { requireAuth } from "./middlewares/authMiddleware.js";

const app = express();
app.use(cors());
app.use(express.json());

// public health check
app.get("/", (req, res) => res.send("Gateway Service up"));

// Protected routes: requireAuth before hitting apply/test routes
app.use("/apply", requireAuth, applyRoutes);           // POST /apply
app.use("/tests", requireAuth, testRoutes);           // POST /tests/:id/submit

export default app;
