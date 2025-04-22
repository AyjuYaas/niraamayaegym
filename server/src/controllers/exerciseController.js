import Exercise from "../models/exerciseModel.js";

export async function addExercise(req, res) {
  try {
    const { name, bodyPart, description, videos } = req.body;

    if (!name || !bodyPart) {
      return res.status(400).json({
        success: false,
        message: "Name and body part is required",
      });
    }

    const exercise = await Exercise.create({
      name,
      bodyPart,
      description,
      videos,
    });

    return res.status(200).json({
      success: true,
      exercise,
    });
  } catch (error) {
    console.log("Error in exercise controller: addExercise: " + error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function getExercise(req, res) {
  try {
    const exercises = await Exercise.find();

    res.status(200).json({
      success: true,
      exercises,
    });
  } catch (error) {
    console.log("Error in exercise controller: getExercise: " + error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function updateExercise(req, res) {
  try {
    const { exerciseId } = req.params;

    const existingExercise = await Exercise.findById(exerciseId);

    if (!existingExercise) {
      return res.status(404).json({
        success: false,
        message: "Exercise not found",
      });
    }

    const { name, bodyPart, description, videos } = req.body;

    if (!name || !bodyPart) {
      return res.status(400).json({
        success: false,
        message: "Name and body part is required",
      });
    }

    const lowerCaseBodyPart = bodyPart.toLowerCase();

    const exercise = await Exercise.findByIdAndUpdate(
      exerciseId,
      {
        name,
        bodyPart: lowerCaseBodyPart,
        description,
        videos,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      exercise,
    });
  } catch (error) {
    console.log("Error in exercise controller: updateExercise: " + error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function deleteExercise(req, res) {
  try {
    const { exerciseId } = req.params;

    const exercise = await Exercise.findById(exerciseId);

    if (!exercise) {
      return res.status(404).json({
        success: false,
        message: "Exercise Not Found",
      });
    }

    await exercise.deleteOne();

    res.status(200).json({
      success: true,
      message: "Successfully Deleted the Exercise",
    });
  } catch (error) {
    console.log("Error in exercise controller: deleteExercise: " + error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}
