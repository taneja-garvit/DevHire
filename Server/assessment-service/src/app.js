import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import questionRoutes from "./routes/questionRoutes.js";
import testRoutes from "./routes/testRoutes.js";

dotenv.config()
connectDB()
const app = express()
app.use(cors())
app.use(express.json());

app.use("/api/questions", questionRoutes);
app.use("/api/tests", testRoutes);

export default app;