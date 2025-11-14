import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import trainerRoutes from "./routes/trainerRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { connectToDatabase } from "./config/databaseConnect.js";
import User from "./models/userModel.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Allow only your frontend to access
    credentials: true, // Allow cookies if required
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/trainer", trainerRoutes);
app.use("/user", userRoutes);

app.post("/update-fields", async (req, res) => {
  try {
    const result = await User.updateMany(
      {},
      {
        isAssigned: false,
      }
    );

    res.status(200).json({
      users: result,
    });
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
  connectToDatabase();
});
