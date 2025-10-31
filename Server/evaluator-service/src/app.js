import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import evaluatorRoutes  from "./routes/evaluatorRoutes.js";


dotenv.config();
connectdb();

const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/evaluator",evaluatorRoutes);

export default app;