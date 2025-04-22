import express from "express";
import {
  logout,
  logStatus,
  trainerLogin,
  userLogin,
  // trainerSignup,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Handle User Login
router.post("/user/login", userLogin);

// Handle Trainer Login and Signup
router.post("/trainer/login", trainerLogin);
// router.post("/signup", trainerSignup);

//Logout Function
router.post("/logout", logout);

//Check LogStatus
router.get("/logStatus", isAuthenticated, logStatus);

export default router;
