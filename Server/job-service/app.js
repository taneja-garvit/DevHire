import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jobRoutes from "./routes/jobRoutes.js";
import connectdb from "../auth-service/src/config/db";

dotenv.config();
connectdb();

const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/jobs",jobRoutes);

export default app;
