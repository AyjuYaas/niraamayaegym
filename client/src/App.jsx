import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

import { Toaster } from "react-hot-toast";
import HomepageLayout from "./layouts/HomepageLayout";
import AboutLayout from "./layouts/AboutLayout";
import ContactLayout from "./layouts/ContactLayout";

import TrainerLogin from "./layouts/Auth/TrainerAuthLayout/TrainerLogin";
// import TrainerSignup from "./layouts/Auth/TrainerAuthLayout/TrainerSignup";
import NotFound from "./components/NotFound";
import UserLogin from "./layouts/Auth/UserAuthLayout/UserLogin";
// import UserSignup from "./layouts/Auth/UserAuthLayout/UserSignup";
import UserDashboard from "./layouts/UserDashboard";
import { useAuthHook } from "./hook/useAuthHook";
import { useEffect } from "react";
import TrainerDashboard from "./layouts/TrainerDashboard";
import AddNewUserLayout from "./layouts/AddNewUserLayout";
import AddUserTask from "./layouts/AddUserTask";
import AssignExercise from "./layouts/AssignExercise";

const App = () => {
  const { loadingLogStatus, checkLogStatus, authUser, authType } =
    useAuthHook();

  useEffect(() => {
    checkLogStatus();
  }, [checkLogStatus]);

  if (loadingLogStatus) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl text-white bg-black font-extrabold">
        <h1>Loading......</h1>
      </div>
    );
  }
  return (
    <div>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomepageLayout />} />
        <Route path="/about" element={<AboutLayout />} />
        <Route path="/contact" element={<ContactLayout />} />

        <Route
          path="/user/login"
          element={
            !authUser ? (
              <UserLogin />
            ) : authType === "user" ? (
              <Navigate to="/user/dashboard" />
            ) : (
              <Navigate to="/trainer/dashboard" />
            )
          }
        />
        <Route
          path="/user/dashboard"
          element={
            authUser && authType === "user" ? (
              <UserDashboard />
            ) : (
              <Navigate to={"/user/login"} />
            )
          }
        />

        {/* Trainer Routes */}
        <Route
          path="/trainer/login"
          element={
            !authUser ? (
              <TrainerLogin />
            ) : authType === "user" ? (
              <Navigate to="/user/dashboard" />
            ) : (
              <Navigate to="/trainer/dashboard" />
            )
          }
        />
        <Route
          path="/trainer/dashboard"
          element={
            authUser && authType === "trainer" ? (
              <TrainerDashboard />
            ) : (
              <Navigate to={"/trainer/login"} />
            )
          }
        />
        <Route
          path="/trainer/add-user"
          element={
            authUser && authType === "trainer" ? (
              <AddNewUserLayout />
            ) : (
              <Navigate to={"/trainer/login"} />
            )
          }
        />
        <Route
          path="/trainer/assign-user/:userId"
          element={
            authUser && authType === "trainer" ? (
              <AddUserTask />
            ) : (
              <Navigate to={"/trainer/login"} />
            )
          }
        />
        <Route
          path="/trainer/assign-exercise/:taskId"
          element={
            authUser && authType === "trainer" ? (
              <AssignExercise />
            ) : (
              <Navigate to={"/trainer/login"} />
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};
export default App;
