import cloudinary from "../config/cloudinaryConnect.js";
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
import { sendPasswordEmail } from "../utils/nodeMailer.js";

export async function addUser(req, res) {
  try {
    const {
      profilePic,
      name,
      email,
      phone,
      gender,
      dob,
      height,
      weight,
      specialCondition,
    } = req.body;

    if (!name || !email || !phone || !gender || !dob || !height || !weight) {
      return res.status(400).json({
        success: false,
        message: "All the input is required",
      });
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Email format is invalid",
      });
    }

    // Validate that the user is older than 13
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--; // Adjust if birthday hasn't occurred yet this year
    }

    if (age <= 13) {
      return res.status(400).json({
        success: false,
        message: "User must be older than 13 years.",
      });
    }

    // EMail Validation

    let image = "";
    let imagePublicId = "";

    // ============== Upload image to cloudinary ==============
    if (profilePic) {
      // base64 format
      if (profilePic.startsWith("data:image")) {
        try {
          const uploadResponse = await cloudinary.uploader.upload(profilePic, {
            folder: "Niraamayae/",
            crop: "auto",
            width: 500,
            height: 500,
            gravity: "auto",
          });
          image = uploadResponse.secure_url;
          imagePublicId = uploadResponse.public_id;
        } catch (err) {
          console.log(err);
          return res.status(400).json({
            success: false,
            message: "Error uploading image!",
          });
        }
      }
    }

    const password = Math.random().toString(36).slice(-8);

    console.log(password);

    try {
      await sendPasswordEmail(email, password);
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Failed to send password email.",
      });
    }

    await User.create({
      profilePic: image,
      imagePublicId,
      name,
      email,
      password,
      phone,
      gender,
      dob: new Date(dob),
      height,
      weight,
      specialCondition,
    });

    return res.status(200).json({
      success: true,
      message: "User Added Successfully",
    });
  } catch (error) {
    if (error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({
        success: false,
        message: "Email already exists. Please use a different email address.",
      });
    }
    console.log("Error in trainer controller: addUser: " + error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function getUserDetails(req, res) {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        _id: user.id,
        profilePic: user.profilePic,
        name: user.name,
        age: user.age,
        gender: user.gender,
        email: user.email,
        phone: user.phone,
        height: user.height,
        weight: user.weight,
        BMI: user.BMI,
        specialCondition: user.specialCondition,
      },
    });
  } catch (error) {
    console.log("Error in trainer controller, getUser: " + error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

// Existing Users
export async function getAssignedUsers(req, res) {
  try {
    const users = await User.find({ isAssigned: true }) // SELECT * USERS WHERE IS_ASSIGNE = TRUE
      .sort({ createdAt: -1 })
      .select("_id profilePic name gender email");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("Error in trainer controller, getAssignedUsers: " + error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

// New Users
export async function getUnassignedUsers(req, res) {
  try {
    const users = await User.find({ isAssigned: false })
      .sort({ createdAt: -1 })
      .select("_id profilePic name gender email");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log("Error in trainer controller, getUnassignedUsers: " + error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function deleteUser(req, res) {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }

    const tasks = await Task.find({ userId });

    if (tasks.length > 0) {
      const taskIds = tasks.map((task) => task._id);

      // Delete AssignedExercises by taskId
      await AssignedExercise.deleteMany({ taskId: { $in: taskIds } });

      // Now, delete all the tasks
      await Task.deleteMany({ userId });
    }
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message:
        "User and associated tasks/assigned exercises deleted successfully",
    });
  } catch (error) {
    console.log("Error while deleting user: ", error);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
}
