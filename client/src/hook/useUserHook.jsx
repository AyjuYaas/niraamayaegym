import { create } from "zustand";
import { axiosInstance } from "../Axios/Axios";
import toast from "react-hot-toast";
import { useAuthHook } from "./useAuthHook";
export const useUserHook = create((set) => ({
  pendingExercises: [],
  completedExercises: [],
  taskDetails: null,
  loadAssignedExercises: false,
  loadUpdate: false,

  getAssignedExercises: async () => {
    try {
      set({ loadAssignedExercises: true });
      const res = await axiosInstance.get("user/assigned-exercises");
      if (res.data.success) {
        set({
          pendingExercises: res.data.pending,
          completedExercises: res.data.completed,
          taskDetails: res.data.task,
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ loadAssignedExercises: false });
    }
  },

  resetAssignedExercise: () => {
    set({ pendingExercises: [], completedExercises: [] });
  },

  updateAssignedExercise: async (exerciseId, data) => {
    try {
      const res = await axiosInstance.put(
        `user/update-status/${exerciseId}`,
        data
      );

      if (res.data.success) {
        const updatedExercise = res.data.assignedExercise;

        set((state) => {
          let newPending = [...state.pendingExercises];
          let newCompleted = [...state.completedExercises];

          if (updatedExercise.status === "completed") {
            // Remove from pending
            newPending = newPending.filter(
              (ex) => ex._id !== updatedExercise._id
            );
            // Add to completed
            newCompleted.push(updatedExercise);
          } else {
            // If moved back to pending
            newCompleted = newCompleted.filter(
              (ex) => ex._id !== updatedExercise._id
            );
            newPending.push(updatedExercise);
          }

          return {
            pendingExercises: newPending,
            completedExercises: newCompleted,
          };
        });

        toast.success("Successfully Updated the Exercise");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong");
    }
  },

  calculateBMI: async (data) => {
    try {
      const res = await axiosInstance.put("user/calculate-bmi", data);
      const authHook = useAuthHook.getState();
      authHook.setAuthUser({
        ...authHook.authUser,
        height: data.height,
        weight: data.weight,
        BMI: res.data.credentials.BMI,
      });
      return res.data.credentials.BMI;
    } catch (error) {
      console.log(error);
    }
  },

  getUpdateDetails: async () => {
    try {
      const res = await axiosInstance.get("/user/get-update-details");
      return res.data.user;
    } catch (error) {
      console.log(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    try {
      set({ loadUpdate: true });
      const res = await axiosInstance.put("user/update-profile", data);

      if (res.data.success) {
        toast.success("Successfully Updated your Profile");
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong");
    } finally {
      set({ loadUpdate: false });
    }
  },
}));
