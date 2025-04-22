import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Task from "../models/taskModel.js";
import AssignedExercise from "../models/assignedExerciseModel.js";

export async function newPassword(req, res) {
  try {
    if (req.credentials.defaultId) {
      const { password, confirmPassword } = req.body;
      if (!password || !confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Password must match",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      await User.findByIdAndUpdate(req.credentials._id, {
        password: hashedPassword,
        defaultId: false,
      });

      return res.status(200).json({
        success: true,
        message: "Password Updated Successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Not a new user",
      });
    }
  } catch (error) {
    console.log("Error in User Controller: newPassword: " + error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function updateProfile(req, res) {
  try {
    const { profilePic, newPassword, oldPassword, ...otherData } = req.body;

    const updatedData = otherData;

    const user = await User.findById(req.credentials._id);

    if (profilePic) {
      updatedData.profilePic = profilePic;
    }

    if (!(await user.comparePassword(oldPassword))) {
      return res.status(400).json({
        success: false,
        message: "Your password is incorrect",
      });
    }

    if (newPassword) {
      if (newPassword <= 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be 7 characters or more",
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);
      updatedData.password = hashedPassword;
    }

    if (otherData.dob) {
      updatedData.dob = new Date(otherData.dob);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.credentials._id,
      updatedData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      credentials: {
        _id: updatedUser._id,
        profilePic: updatedUser.profilePic,
        name: updatedUser.name,
        height: updatedUser.height,
        weight: updatedUser.weight,
        BMI: updatedUser.BMI,
      },
    });
  } catch (error) {
    console.log("Error in User Controller: updateProfile: " + error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function calculateBMI(req, res) {
  try {
    const { height, weight } = req.body;

    if (!height || !weight) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const BMI = (weight / (height * height)).toFixed(2);

    const updatedUser = await User.findByIdAndUpdate(
      req.credentials._id,
      { height, weight, BMI },
      { new: true }
    );

    res.status(200).json({
      success: true,
      credentials: {
        height: updatedUser.height,
        weight: updatedUser.weight,
        BMI: updatedUser.BMI,
      },
    });
  } catch (error) {
    console.log("Error in User Controller: calculateBMI: " + error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function getTasks(req, res) {
  try {
    const tasks = await Task.find({ userId: req.credentials._id });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.log("Error in User Controller: getTask: " + error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function getAssignedExercise(req, res) {
  try {
    const { taskId } = req.params;

    if (!taskId) {
      return res.status(400).json({
        success: false,
        message: "TaskId Not Provided",
      });
    }

    const task = await Task.findById(taskId);

    if (!task.userId.equals(req.credentials._id)) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    const assignedExercises = await AssignedExercise.find({ taskId })
      .populate("taskId", "day title")
      .populate("exerciseId", "name bodyPart description videos");

    res.status(200).json({
      success: true,
      assignedExercises,
    });
  } catch (error) {
    console.log("Error in User Controller: getExercise: " + error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function updateAssignedStatus(req, res) {
  try {
    const { assignedExerciseId } = req.params;
    const { status } = req.body;

    const assignedExercise = await AssignedExercise.findByIdAndUpdate(
      assignedExerciseId,
      { status },
      { new: true }
    )
      .populate("taskId", "day title")
      .populate("exerciseId", "name bodyPart description videos");

    res.status(200).json({
      success: true,
      assignedExercise,
    });
  } catch (error) {
    console.log("Error in User Controller: updateAssignedStatus: " + error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}
