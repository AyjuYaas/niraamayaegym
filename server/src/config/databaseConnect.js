import mongoose from "mongoose";
import createDefaultTrainerId from "../utils/createDefaultTrainerId.js";

export const connectToDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    await createDefaultTrainerId();
    if (connect) {
      console.log("Connected to the database Successfully");
    }
  } catch (error) {
    console.log("Error connecting to the database " + error);
  }
};
