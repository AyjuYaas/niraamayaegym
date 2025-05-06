import { create } from "zustand";
import { axiosInstance } from "../Axios/Axios";
import toast from "react-hot-toast";

export const useExerciseHook = create((set) => ({
  task: {},
  user: {},
  assignedExercises: [],
  exercises: [],
  loadingAssignedExercise: false,

  // Exercises
  getExercise: async (role = "trainer") => {
    try {
      if (role === "trainer") {
        const response = await axiosInstance.get("/exercise/get-all");
        set({ exercises: response.data.exercises });
      } else {
        const response = await axiosInstance.get("/user/all-exercises");
        set({ exercises: response.data.exercises });
      }
    } catch (error) {
      console.log(error);
    }
  },

  addExercise: async (data) => {
    try {
      const response = await axiosInstance.post("trainer/exercise/add", data);

      if (response.data.success) {
        set((state) => ({
          exercises: [...state.exercises, response.data.exercise],
        }));
        toast.success("Successfully Added Exercise");
        return true;
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong");
      return false;
    }
  },

  updateExercise: async (exerciseId, data) => {
    try {
      const response = await axiosInstance.put(
        `trainer/exercise/update/${exerciseId}`,
        data
      );

      if (response.data.success) {
        set((state) => {
          const updatedExercises = state.exercises.map((exercise) =>
            exercise._id === exerciseId ? response.data.exercise : exercise
          );
          return { exercises: updatedExercises };
        });
        toast.success("Successfully Updated the Exercise");
        return true;
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong");
      return false;
    }
  },

  deleteExercise: async (exerciseId) => {
    try {
      const response = await axiosInstance.delete(
        `trainer/exercise/delete/${exerciseId}`
      );

      if (response.data.success) {
        set((state) => ({
          exercises: state.exercises.filter(
            (exercise) => exercise._id !== exerciseId
          ),
        }));
        toast.success(response.data.message);
        return true;
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong");
      return false;
    }
  },

  // Assigned Exercises
  getAssignedExercise: async (taskId) => {
    try {
      set({ loadingAssignedExercise: true });
      const response = await axiosInstance.get(
        `trainer/assigned-exercise/${taskId}`
      );
      set({
        task: response.data.task,
        user: response.data.user,
        assignedExercises: response.data.assignedExercises,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loadingAssignedExercise: false });
    }
  },

  assignExercise: async (data) => {
    try {
      console.log(data);
      const res = await axiosInstance.post(
        "trainer/assigned-exercise/assign",
        data
      );

      if (res.data.success) {
        set((state) => ({
          assignedExercises: [
            ...state.assignedExercises,
            res.data.assignedExercise,
          ],
        }));
        toast.success("Successfully Assigned Exercise");
        return true;
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong");
      return false;
    }
  },

  updateAssignedExercise: async (assignedExerciseId, data) => {
    try {
      const res = await axiosInstance.put(
        `trainer/assigned-exercise/update/${assignedExerciseId}`,
        data
      );

      if (res.data.success) {
        set((state) => {
          const updatedAssignedExercises = state.assignedExercises.map(
            (exercise) =>
              exercise._id === assignedExerciseId
                ? res.data.assignedExercise
                : exercise
          );
          return { assignedExercises: updatedAssignedExercises };
        });
        toast.success("Successfully Updated the Assigned Exercise");
        return true;
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong");
      return false;
    }
  },

  deleteAssignedExercise: async (assignedExerciseId) => {
    try {
      const response = await axiosInstance.delete(
        `trainer/assigned-exercise/delete/${assignedExerciseId}`
      );

      if (response.data.success) {
        set((state) => ({
          assignedExercises: state.assignedExercises.filter(
            (exercise) => exercise._id !== assignedExerciseId
          ),
        }));
        toast.success(response.data.message);
        return true;
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong");
      return false;
    }
  },
}));
