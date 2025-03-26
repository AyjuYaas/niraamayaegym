import Trainer from "../models/trainerModel.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const loginToken = (id, role) => {
  //jwt token
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });
};

export async function userSignup(req, res) {
  try {
    const { name, email, password, phone, gender } = req.body;

    if (!name || !email || !password || !phone || !gender) {
      return res.status(400).json({
        success: false,
        message: "All the input is required",
      });
    }

    if (password.length < 7) {
      return res.status(400).json({
        success: false,
        message: "Password must be more than 7 characters",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      phone,
      gender,
    });

    return res.status(200).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    if (error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({
        success: false,
        message: "Email already exists. Please use a different email address.",
      });
    }
    console.log("Error in User Signup Controller: " + error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({
        success: false,
        message: "Email or password are not valid",
      });
    }

    const token = loginToken(user._id, "user");

    res.cookie("auth", token, {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return res.status(200).json({
      success: true,
      credentials: {
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
      },
      authType: "user",
    });
  } catch (error) {
    console.log("Error in User Login Controller: " + error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

// export async function trainerSignup(req, res) {
//   try {
//     const { name, username, password } = req.body;

//     if (!name || !username || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All the input is required",
//       });
//     }

//     if (password.length < 7) {
//       return res.status(400).json({
//         success: false,
//         message: "Password must be more than 7 characters",
//       });
//     }

//     const newTrainer = await Trainer.create({
//       name,
//       username,
//       password,
//     });

//     return res.status(200).json({
//       success: true,
//       trainer: newTrainer,
//     });
//   } catch (error) {
//     if (error.keyPattern && error.keyPattern.email) {
//       return res.status(400).json({
//         success: false,
//         message: "Email already exists. Please use a different email address.",
//       });
//     }
//     console.log("Error in Trainer Signup Controller: " + error);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// }

export async function trainerLogin(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const trainer = await Trainer.findOne({ username }).select("+password");

    if (!trainer || !(await trainer.comparePassword(password))) {
      return res.status(400).json({
        success: false,
        message: "Username or password are not valid",
      });
    }

    const token = loginToken(trainer._id, "trainer");

    res.cookie("auth", token, {
      maxAge: 14 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return res.status(200).json({
      success: true,
      credentials: {
        _id: trainer._id,
        name: trainer.name,
      },
      authType: "trainer",
    });
  } catch (error) {
    console.log("Error in User Login Controller: " + error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("auth");
    res.status(200).json({
      success: true,
      message: "Logged out Successfully",
    });
  } catch (error) {
    console.log("Error in Auth Logout Controller: " + error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function logStatus(req, res) {
  try {
    if (!req.credentials || !req.role) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }

    res.status(200).json({
      success: true,
      credentials: req.credentials,
      role: req.role,
    });
  } catch (error) {
    console.error("Error in auth controller, logStatus: ", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}
