import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Task from "../models/taskModel.js";
import AssignedExercise from "../models/assignedExerciseModel.js";
import Exercise from "../models/exerciseModel.js";
import cloudinary from "../config/cloudinaryConnect.js";

export async function newPassword(req, res) {
  try {
    if (req.credentials.defaultId) {
      const { password, confirmPassword } = req.body;

      if (!password || !confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Both password fields are required",
        });
      }

      if (password.length < 7) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 7 characters long",
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Passwords do not match",
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

export async function updateDetails(req, res) {
  try {
    const user = await User.findById(req.credentials._id).select(
      "_id profilePic name email phone gender dob"
    );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("Error in User Controller: updateProfile: " + error);
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

    // ============== Upload image to cloudinary ==============
    if (profilePic) {
      // base64 format
      if (profilePic.startsWith("data:image")) {
        try {
          // Incase it is their first upload
          if (!user.imagePublicId) {
            const uploadResponse = await cloudinary.uploader.upload(
              profilePic,
              {
                folder: "Niraamayae/",
                crop: "auto",
                width: 500,
                height: 500,
                gravity: "auto",
              }
            );
            updatedData.profilePic = uploadResponse.secure_url;
            updatedData.imagePublicId = uploadResponse.public_id;
          } else {
            // incase they are changing their image, replace the one on cloudinary
            const uploadResponse = await cloudinary.uploader.upload(
              profilePic,
              {
                public_id: user.imagePublicId,
                crop: "auto",
                width: 500,
                height: 500,
                gravity: "auto",
              }
            );
            updatedData.profilePic = uploadResponse.secure_url;
          }
        } catch (err) {
          console.log(err);
          return res.status(400).json({
            success: false,
            message: "Error uploading image. Profile cannot be updated!",
          });
        }
      }
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
        age: updatedUser.age,
        gender: updatedUser.gender,
        defaultId: updatedUser.defaultId,
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

    const updatedUser = await User.findByIdAndUpdate(
      req.credentials._id,
      { height, weight },
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

export async function getAllExercise(req, res) {
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

export async function getAssignedExercise(req, res) {
  try {
    const todayName = new Date()
      .toLocaleString("en-US", { weekday: "long" })
      .toLowerCase();

    const task = await Task.findOne({
      userId: req.credentials._id,
      day: todayName,
    }).select("_id day title assignedBy");

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "No Task Assigned for Today",
      });
    }

    let assignedExercises = await AssignedExercise.find({
      taskId: task._id,
    }).populate("exerciseId", "name bodyPart description videos");

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Strip time

    // Reset outdated "completed" statuses to "pending"
    const resetPromises = assignedExercises.map(async (exercise) => {
      const lastUpdate = new Date(exercise.lastStatusUpdate);
      lastUpdate.setHours(0, 0, 0, 0); // Strip time

      if (exercise.status === "completed" && lastUpdate < today) {
        exercise.status = "pending";
        exercise.lastStatusUpdate = new Date();
        await exercise.save();
      }

      return exercise;
    });

    const updatedExercises = await Promise.all(resetPromises);

    // Split into pending and completed
    const pending = updatedExercises.filter((ex) => ex.status === "pending");
    const completed = updatedExercises.filter(
      (ex) => ex.status === "completed"
    );

    res.status(200).json({
      success: true,
      task,
      pending,
      completed,
    });
  } catch (error) {
    console.log("Error in User Controller: getAssignedExercise: " + error);
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
      { status, lastStatusUpdate: new Date() },
      { new: true }
    ).populate("exerciseId", "name bodyPart description videos");

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
