import { Router } from "express";
import { isUser } from "../middlewares/authMiddleware.js";
import {
  calculateBMI,
  getAssignedExercise,
  getTasks,
  newPassword,
  updateAssignedStatus,
  updateProfile,
} from "../controllers/userController.js";

const router = Router();

router.use(isUser);

router.put("/new-password", newPassword);
router.put("/update-profile", updateProfile);

router.put("/calculate-bmi", calculateBMI);

router.get("/tasks", getTasks);
router.get("/:taskId/exercises", getAssignedExercise);

router.put("/update-status/:assignedExerciseId", updateAssignedStatus);

export default router;
