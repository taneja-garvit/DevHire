import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectdb from "./config/db";

dotenv.config();
connectdb();

const app=express();
app.use(cors());
app.use(express.json);
app.use("/auth",authRoutes);
