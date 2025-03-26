import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import { connectToDatabase } from "./config/databaseConnect.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Allow only your frontend to access
    credentials: true, // Allow cookies if required
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
  connectToDatabase();
});
