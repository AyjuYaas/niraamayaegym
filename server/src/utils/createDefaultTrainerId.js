import Trainer from "../models/trainerModel.js";

export default async function createDefaultTrainerId() {
  try {
    const existingTrainer = await Trainer.findOne({
      username: "NiraamayaeTrainers",
    });

    if (!existingTrainer) {
      await Trainer.create({
        name: "Trainers",
        username: "NiraamayaeTrainers",
        password: "PushYourself@123",
      });

      console.log("Default Trainer Created");
    } else {
      console.log("Default Trainer Already Exists.");
    }
  } catch (error) {
    console.error("Error creating default trainer: ", error);
  }
}
