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

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Token is Invalid",
      });
    }

    let activeUser;

    if (decode.role === "user") {
      activeUser = await User.findById(decode.id);
      req.credentials = {
        _id: activeUser._id,
        name: activeUser.name,
        email: activeUser.email,
        gender: activeUser.gender,
      };
    } else {
      activeUser = await Trainer.findById(decode.id);
      req.credentials = {
        _id: activeUser._id,
        name: activeUser.name,
      };
    }
    req.role = decode.role;
    next();
  } catch (error) {
    console.log("Error in LogStatus middleware: " + error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
