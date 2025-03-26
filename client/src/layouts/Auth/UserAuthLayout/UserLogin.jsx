import { useState } from "react";
import { useAuthHook } from "../../../hook/AuthHook";

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { userLogin, loading } = useAuthHook();
  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    userLogin(formData);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-200 text-black">
      <div className="flex shadow-2xl h-max">
        <div className="bg-white p-10 h-full flex items-center w-auto md:w-100">
          {/* Form */}
          <form
            className="flex flex-col gap-5 text-lg w-full"
            onSubmit={handleSubmit}
          >
            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="font-semibold ml-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleFormDataChange}
                placeholder="Your Email"
                required
                className="bg-gray-300 p-2 rounded-lg text-base"
              />
            </div>
            {/* Password */}
            <div className="flex flex-col">
              <label htmlFor="password" className="font-semibold ml-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleFormDataChange}
                placeholder="Your Password"
                required
                className="bg-gray-300 p-2 rounded-lg text-base"
              />
            </div>
            <div>
              <input
                type="submit"
                className={`py-3 px-10 rounded-lg duration-150 font-bold ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-second cursor-pointer"
                }`}
                value={`${loading ? "logging in.." : "Login"}`}
              />
            </div>
          </form>
        </div>

        <div className=" text-second h-full p-2 sm:p-10 flex flex-col items-start justify-start w-auto relative">
          <img
            src="/auth/auth.jpg"
            alt="auth-background"
            className="object-cover object-top absolute w-full h-full top-0 left-0 select-none z-1"
          />
          <div className="absolute inset-0 bg-black/80 z-2"></div>

          <div className="flex flex-col z-3 font-bold text-4xl items-start justify-center lg:text-5xl gap-3 ">
            <span>Login to</span>
            <span className="tracking-wider">Niraamayae</span>
            <span>App</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserLogin;
