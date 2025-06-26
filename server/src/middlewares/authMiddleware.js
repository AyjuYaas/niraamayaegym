import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Trainer from "../models/trainerModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.auth;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is not Provided",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Token is Invalid",
      });
    }

    let activeUser;

    // if decoded role is user
    if (decodedToken.authType === "user") {
      // Find user using their id
      activeUser = await User.findById(decodedToken.id);
      req.credentials = {
        _id: activeUser._id,
        profilePic: activeUser.profilePic,
        name: activeUser.name,
        height: activeUser.height,
        weight: activeUser.weight,
        BMI: activeUser.BMI,
        age: activeUser.age,
        gender: activeUser.gender,
        specialCondition: activeUser.specialCondition,
        defaultId: activeUser.defaultId,
      };
    } else {
      activeUser = await Trainer.findById(decodedToken.id);
      req.credentials = {
        _id: activeUser._id,
        name: activeUser.name,
      };
    }
    req.authType = decodedToken.authType;
    next();
  } catch (error) {
    console.log("Error in LogStatus middleware: " + error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const isTrainer = async (req, res, next) => {
  try {
    const token = req.cookies.auth;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is not Provided",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Token is Invalid",
      });
    }

    if (decodedToken.authType !== "trainer") {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    const activeUser = await Trainer.findById(decodedToken.id);
    req.credentials = {
      _id: activeUser._id,
    };

    req.authType = decodedToken.authType;
    next();
  } catch (error) {
    console.log("Error in LogStatus middleware: " + error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const isUser = async (req, res, next) => {
  try {
    const token = req.cookies.auth;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is not Provided",
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Token is Invalid",
      });
    }

    if (decodedToken.authType !== "user") {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }
    const activeUser = await User.findById(decodedToken.id);
    req.credentials = {
      _id: activeUser._id,
      defaultId: activeUser.defaultId,
    };

    req.authType = decodedToken.authType;

    next();
  } catch (error) {
    console.log("Error in LogStatus middleware: " + error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
