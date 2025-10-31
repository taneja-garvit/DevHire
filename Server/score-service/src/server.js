import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import scoreRoutes from "./routes/scoreRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/api/scores", scoreRoutes);

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => console.log(`Score-Service running on port ${PORT}`));
