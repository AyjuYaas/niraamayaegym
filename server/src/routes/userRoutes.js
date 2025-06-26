import { Router } from "express";
import { isUser } from "../middlewares/authMiddleware.js";
import {
  calculateBMI,
  getAllExercise,
  getAssignedExercise,
  getTasks,
  getUpdateDetails,
  newPassword,
  updateAssignedStatus,
  updateProfile,
} from "../controllers/userController.js";

const router = Router();

router.get("/all-all-exercises", getAllExercise);

router.use(isUser);

router.put("/new-password", newPassword);
router.get("/get-update-details", getUpdateDetails);
router.put("/update-profile", updateProfile);

router.put("/calculate-bmi", calculateBMI);

router.get("/tasks", getTasks);
router.get("/assigned-exercises", getAssignedExercise);

router.get("/all-exercises", getAllExercise);

router.put("/update-status/:assignedExerciseId", updateAssignedStatus);

export default router;
