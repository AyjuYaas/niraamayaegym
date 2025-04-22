import User from "../models/userModel.js";

export async function addUser(req, res) {
  try {
    const { name, email, phone, gender, dob } = req.body;

    if (!name || !email || !phone || !gender || !dob) {
      return res.status(400).json({
        success: false,
        message: "All the input is required",
      });
    }

    const password = "1234567";

    await User.create({
      name,
      email,
      password,
      phone,
      gender,
      dob: new Date(dob),
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

export async function getAssignedUsers(req, res) {
  try {
    const users = await User.find({ isAssigned: true })
      .sort({ createdAt: -1 })
      .select("_id profilePic name gender");

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

export async function getUnassignedUsers(req, res) {
  try {
    const users = await User.find({ isAssigned: false })
      .sort({ createdAt: -1 })
      .select("_id profilePic name gender");

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
