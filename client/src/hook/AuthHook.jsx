import { create } from "zustand";
import { axiosInstance } from "../Axios/Axios";
import toast from "react-hot-toast";

export const useAuthHook = create((set) => ({
  authUser: null,
  authType: null,
  loadingLogStatus: true,
  loading: false,

  checkLogStatus: async () => {
    try {
      const res = await axiosInstance.get("/auth/logStatus");
      set({ authUser: res.data.credentials, authType: res.data.authType });
    } catch (error) {
      set({ authUser: null, authType: "" });
      console.log("No Authentication: " + error);
    } finally {
      set({ loadingLogStatus: false });
    }
  },

  userLogin: async (loginData) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.post("/auth/user/login", loginData);
      set({
        authUser: response.data.credentials,
        authType: response.data.authType,
      });
      toast.success("Logged in Successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong");
    } finally {
      set({ loading: false });
    }
  },

  trainerLogin: async (loginData) => {
    try {
      set({ loading: true });
      const response = await axiosInstance.post(
        "/auth/trainer/login",
        loginData
      );
      set({
        authUser: response.data.credentials,
        authType: response.data.authType,
      });
      toast.success("Logged in Successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong");
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      toast.success("Logout Successful");
      set({ authUser: null, authType: null });
    } catch (error) {
      toast.error(error.response.data.message || "Something Went Wrong");
    }
  },
}));
