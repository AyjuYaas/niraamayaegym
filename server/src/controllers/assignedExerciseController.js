import AssignedExercise from "../models/assignedExerciseModel.js";
import Exercise from "../models/exerciseModel.js";
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";

export async function assignExercise(req, res) {
  try {
    const { taskId, exerciseId, sets, reps } = req.body;

    if (!taskId || !exerciseId || !sets || !reps) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const task = await Task.findById(taskId);
    const exercise = await Exercise.findById(exerciseId);

    if (!task || !exercise) {
      return res.status(404).json({
        success: false,
        message: "Task or Exercise is not valid",
      });
    }

    const assignedExercise = await AssignedExercise.create({
      taskId,
      exerciseId,
      sets,
      reps,
    });

    const populatedAssignedExercise = await AssignedExercise.findById(
      assignedExercise._id
    ).populate("exerciseId");

    res.status(200).json({
      success: true,
      assignedExercise: populatedAssignedExercise,
    });
  } catch (error) {
    console.log(
      "Error in assignedExerciseController: assignExercise: " + error
    );
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function getAssignedExercise(req, res) {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId).select(
      "_id userId day title assignedBy"
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task is not valid",
      });
    }
    const user = await User.findById(task.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    const assignedExercises = await AssignedExercise.find({
      taskId: taskId,
    }).populate("exerciseId", "name bodyPart description videos");

    res.status(200).json({
      success: true,
      task,
      user: {
        _id: user._id,
        profilePic: user.profilePic,
        name: user.name,
        gender: user.gender,
        age: user.age,
        height: user.height,
        weight: user.weight,
        BMI: user.BMI,
        specialCondition: user.specialCondition,
      },
      assignedExercises,
    });
  } catch (error) {
    console.log(
      "Error in assignedExerciseController: getAssignedExercise: " + error
    );
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function removeAssignedExercise(req, res) {
  try {
    const { assignedExerciseId } = req.params;

    const assignedExercise = await AssignedExercise.findById(
      assignedExerciseId
    );

    if (!assignedExercise) {
      return res.status(404).json({
        success: false,
        message: "No exercise found",
      });
    }

    await assignedExercise.deleteOne();

    res.status(200).json({
      success: true,
      message: "Successfully Deleted the Assigned Exercise",
    });
  } catch (error) {
    console.log(
      "Error in assignedExerciseController: removeAssignedExercise: " + error
    );
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function updateAssignedExercise(req, res) {
  try {
    const { assignedExerciseId } = req.params;

    const existingAssignedExercise = await AssignedExercise.findById(
      assignedExerciseId
    );

    if (!existingAssignedExercise) {
      return res.status(404).status({
        success: false,
        message: "Assigned Exercise Not Found",
      });
    }

    const { sets, reps } = req.body;

    if (!sets || !reps) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const assignedExercise = await AssignedExercise.findByIdAndUpdate(
      assignedExerciseId,
      { sets, reps },
      { new: true }
    ).populate("exerciseId");

    res.status(200).json({
      success: true,
      assignedExercise,
    });
  } catch (error) {
    console.log(
      "Error in assignedExerciseController: updateAssignedExercise: " + error
    );
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}
