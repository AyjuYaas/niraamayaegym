import express from "express";
import { isTrainer } from "../middlewares/authMiddleware.js";
import {
  addUser,
  getAssignedUsers,
  getUnassignedUsers,
  getUserDetails,
} from "../controllers/trainerController.js";

import {
  addExercise,
  deleteExercise,
  getExercise,
  updateExercise,
} from "../controllers/exerciseController.js";

import {
  assignTask,
  getTask,
  removeTask,
  updateTask,
} from "../controllers/taskController.js";

import {
  assignExercise,
  getAssignedExercise,
  removeAssignedExercise,
  updateAssignedExercise,
} from "../controllers/assignedExerciseController.js";

const router = express.Router();

router.use(isTrainer);

// User Routes
router.post("/add-user", addUser);
router.get("/assigned-users", getAssignedUsers); // For Existing Users
router.get("/unassigned-users", getUnassignedUsers); // For new Users
router.get("/user-details/:userId", getUserDetails);

// Exercise Routes
router.post("/exercise/add", addExercise);
router.get("/exercise/get-all", getExercise);
router.put("/exercise/update/:exerciseId", updateExercise);
router.delete("/exercise/delete/:exerciseId", deleteExercise);

// Task Routes
router.post("/task/assign/:userId", assignTask);
router.get("/task/:userId", getTask);
router.put("/task/update/:taskId", updateTask);
router.delete("/task/delete/:taskId", removeTask);

// Assign Exercise Routes
router.post("/assigned-exercise/assign", assignExercise);
router.get("/assigned-exercise/:taskId", getAssignedExercise);
router.put(
  "/assigned-exercise/update/:assignedExerciseId",
  updateAssignedExercise
);
router.delete(
  "/assigned-exercise/delete/:assignedExerciseId",
  removeAssignedExercise
);

export default router;
