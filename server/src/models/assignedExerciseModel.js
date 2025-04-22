import mongoose from "mongoose";

const assignedExerciseSchema = mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exercise",
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
});

const AssignedExercise = mongoose.model(
  "AssignedExercise",
  assignedExerciseSchema
);

export default AssignedExercise;
