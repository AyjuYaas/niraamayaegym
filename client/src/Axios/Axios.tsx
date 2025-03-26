import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true, // send the cookie with every request
});
