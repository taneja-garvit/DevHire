import express from "express";
import dotenv from "dotenv";
import connectDB from "./db.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/api/notifications", notificationRoutes);

const PORT = process.env.PORT || 4005;
app.listen(PORT, () => console.log(`Notification-Service running on port ${PORT}`));
