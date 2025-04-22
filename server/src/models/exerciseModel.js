import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bodyPart: {
    type: String,
    enum: [
      "chest",
      "back",
      "shoulders",
      "neck",
      "biceps",
      "triceps",
      "abs",
      "arms",
      "hip",
      "legs",
    ],
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  videos: {
    type: [String],
    default: "",
  },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

export default Exercise;
