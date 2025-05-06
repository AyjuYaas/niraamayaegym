import { Router } from "express";
import { isUser } from "../middlewares/authMiddleware.js";
import {
  calculateBMI,
  getAllExercise,
  getAssignedExercise,
  getTasks,
  newPassword,
  updateAssignedStatus,
  updateDetails,
  updateProfile,
} from "../controllers/userController.js";

const router = Router();

router.use(isUser);

router.put("/new-password", newPassword);
router.get("/get-update-details", updateDetails);
router.put("/update-profile", updateProfile);

router.put("/calculate-bmi", calculateBMI);

router.get("/tasks", getTasks);
router.get("/assigned-exercises", getAssignedExercise);

router.get("/all-exercises", getAllExercise);

router.put("/update-status/:assignedExerciseId", updateAssignedStatus);

export default router;
