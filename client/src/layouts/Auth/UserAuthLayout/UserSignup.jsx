import { useState } from "react";
import { Link } from "react-router-dom";
import genderData from "./genderData";

const UserSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
  });

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-gray-200 text-black">
      <div className="flex shadow-2xl h-max pt-12">
        <div className="bg-white p-10 h-full flex items-center w-auto md:w-100">
          {/* Form */}
          <form
            className="flex flex-col gap-5 text-lg w-full"
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="font-semibold ml-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleFormDataChange}
                placeholder="Your Name"
                required
                className="bg-gray-300 p-2 rounded-lg text-base"
              />
            </div>

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

            {/* Phone */}
            <div className="flex flex-col">
              <label htmlFor="phone" className="font-semibold ml-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleFormDataChange}
                placeholder="Your Phone"
                pattern="\d{10}" // Ensures exactly 10 digits
                maxLength={10} // Prevents more than 10 digits
                required
                className="bg-gray-300 p-2 rounded-lg text-base"
              />
            </div>

            {/* Gender */}
            <div className="flex flex-col">
              <label htmlFor="gender" className="font-semibold ml-1">
                Gender
              </label>
              <div className="flex gap-3 ml-1">
                {genderData.map((gender) => (
                  <label key={gender}>
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleFormDataChange}
                      className="mr-1 w-4 h-4"
                    />
                    {gender}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <button className="py-3 px-10 bg-black text-white hover:bg-second cursor-pointer rounded-lg duration-150 font-bold">
                Signup
              </button>
            </div>

            <div className="text-sm">
              <Link
                to="/user/login"
                className="hover:underline hover:text-main"
              >
                Already have an Account? Click Here
              </Link>
            </div>
          </form>
        </div>

        <div className=" text-second h-full p-2 sm:p-10 flex flex-col items-start justify-start w-auto relative">
          <img
            src="/auth/signup.jpg"
            alt="auth-background"
            className="object-cover object-top absolute w-full h-full top-0 left-0 select-none z-1"
          />
          <div className="absolute inset-0 bg-black/80 z-2"></div>

          <div className="flex flex-col z-3 font-bold text-4xl lg:text-5xl gap-3">
            <span className="pt-18 sm:pt-10">Signup to</span>
            <span className="tracking-wider">Niraamayae</span>
            <span>App</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserSignup;
