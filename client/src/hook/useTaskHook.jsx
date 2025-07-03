import { create } from "zustand";
import { axiosInstance } from "../Axios/Axios";
import toast from "react-hot-toast";

const dayOrder = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export const useTaskHook = create((set) => ({
  loadingUser: false,
  user: {},
  tasks: [],

  getTask: async (userId) => {
    try {
      set({ loadingUser: true });
      const response = await axiosInstance.get(`/trainer/task/${userId}`);
      const sortedTasks = response.data.tasks.sort(
        (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
      );
      set({ user: response.data.user, tasks: sortedTasks });
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong");
    } finally {
      set({ loadingUser: false });
    }
  },

  resetTask: async () => {
    set({ tasks: [] });
  },

  assignTask: async (userId, taskDetails) => {
    try {
      const response = await axiosInstance.post(
        `/trainer/task/assign/${userId}`,
        taskDetails
      );
      if (response.data.success) {
        const taskDetailsWithId = {
          ...taskDetails,
          _id: response.data.task._id,
        };
        set((state) => {
          const newTasks = [...state.tasks, taskDetailsWithId];
          newTasks.sort(
            (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
          );
          return { tasks: newTasks };
        });
        toast.success("Task assigned successfully");
        return true;
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong");
      return false;
    }
  },

  updateTask: async (taskId, taskDetails) => {
    try {
      const response = await axiosInstance.put(
        `trainer/task/update/${taskId}`,
        taskDetails
      );

      if (response.data.success) {
        set((state) => {
          const updatedTasks = state.tasks.map((task) =>
            task._id === taskId ? response.data.task : task
          );
          // Sort based on day order
          updatedTasks.sort(
            (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
          );
          return { tasks: updatedTasks };
        });

        toast.success("Task updated successfully");
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something Went Wrong");
      return false;
    }
  },

  deleteTask: async (taskId) => {
    try {
      const response = await axiosInstance.delete(
        `/trainer/task/delete/${taskId}`
      );

      if (response.data.success) {
        set((state) => ({
          tasks: state.tasks.filter((task) => task._id !== taskId),
        }));
      }
      toast.success("Deleted Task Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something Went Wrong");
      return false;
    }
  },
}));
