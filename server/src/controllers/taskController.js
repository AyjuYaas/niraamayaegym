import AssignedExercise from "../models/assignedExerciseModel.js";
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";

export async function assignTask(req, res) {
  try {
    const { userId } = req.params;
    const { assignedBy, day, title } = req.body;

    const user = User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!assignedBy || !day || !title) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingTask = await Task.findOne({
      userId,
      day,
    });

    if (existingTask) {
      return res.status(400).json({
        success: false,
        message: "A task is already assigned to this user on " + day,
      });
    }

    const task = await Task.create({
      userId,
      assignedBy,
      day,
      title,
    });

    await user.updateOne({ isAssigned: true });

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.log("Error in task controller: assignTask: " + error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function getTask(req, res) {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "No user found",
      });
    }

    const tasks = await Task.find({ userId: userId });

    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        profilePic: user.profilePic,
        name: user.name,
        gender: user.gender,
        age: user.age,
        height: user.height,
        weight: user.weight,
      },
      tasks,
    });
  } catch (error) {
    console.log("Error in task controller: getTask: " + error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function removeTask(req, res) {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    const userId = task.userId;

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "No task found",
      });
    }

    await AssignedExercise.deleteMany({ taskId: taskId });

    await task.deleteOne();

    const countTasks = await Task.countDocuments({ userId: userId });

    if (countTasks === 0) {
      await User.findByIdAndUpdate(userId, { isAssigned: false });
    }

    res.status(200).json({
      success: true,
      message: "task deleted successfully",
    });
  } catch (error) {
    console.log("Error in task controller: removeTask: " + error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

export async function updateTask(req, res) {
  try {
    const { taskId } = req.params;

    const { assignedBy, day, title } = req.body;

    if (!assignedBy || !day || !title) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const toBeUpdatedTask = await Task.findById(taskId);
    if (!toBeUpdatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    const existingTask = await Task.findOne({
      userId: toBeUpdatedTask.userId,
      day,
      _id: { $ne: taskId },
    });

    if (existingTask) {
      return res.status(409).json({
        success: false,
        message: `A task is already assigned to this user on ${day}`,
      });
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      { assignedBy, day, title },
      { new: true }
    );

    res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.log("Error in task controller: updateTask: " + error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}
