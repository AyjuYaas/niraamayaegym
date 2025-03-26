import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    if (connect) {
      console.log("Connected to the database Successfully");
    }
  } catch (error) {
    console.log("Error connecting to the database " + error);
  }
};
