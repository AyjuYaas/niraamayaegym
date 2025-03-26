import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

trainerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

trainerSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Trainer = mongoose.model("Trainer", trainerSchema);

export default Trainer;
