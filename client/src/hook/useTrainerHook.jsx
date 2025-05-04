import { create } from "zustand";
import { axiosInstance } from "../Axios/Axios";
import toast from "react-hot-toast";

export const useTrainerHook = create((set) => ({
  loadingUnassignedUsers: false,
  loadingAssignedUsers: false,
  loadAddUser: false,
  unassignedUsers: [],
  assignedUsers: [],

  addUser: async (userData) => {
    try {
      set({ loadAddUsers: true });
      const res = await axiosInstance.post("/trainer/add-user", userData);
      if (res.data.success) {
        toast.success(res.data.message);
        return true;
      }
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong");
    } finally {
      set({ loadAddUsers: false });
    }
    return false;
  },

  getUnassignedUsers: async () => {
    try {
      set({ loadingUnassignedUsers: true });
      const res = await axiosInstance.get("/trainer/unassigned-users");
      set({
        unassignedUsers: res.data.users,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loadingUnassignedUsers: false });
    }
  },

  getAssignedUsers: async () => {
    try {
      set({ loadingAssignedUsers: true });
      const res = await axiosInstance.get("/trainer/assigned-users");
      set({
        assignedUsers: res.data.users,
      });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loadingAssignedUsers: false });
    }
  },
}));
