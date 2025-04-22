import { useState } from "react";
import genderData from "./genderData";
import { useTrainerHook } from "../../hook/TrainerHook";
import { useNavigate } from "react-router-dom";

const AddNewUserLayout = () => {
  const navigate = useNavigate();
  const { loadAddUser, addUser } = useTrainerHook();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
  });

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addUser(formData);

    if (success) {
      navigate("/trainer/dashboard");
    }
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
                placeholder="Customer's Name"
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
                placeholder="Customer's Email"
                required
                className="bg-gray-300 p-2 rounded-lg text-base"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col">
              <label htmlFor="phone" className="font-semibold ml-1">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleFormDataChange}
                placeholder="Customer's Phone"
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

            {/* DOB */}
            <div className="flex flex-col">
              <label htmlFor="dob" className="font-semibold ml-1">
                Date of Birth (AD)
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                value={formData.dob}
                onChange={handleFormDataChange}
                required
                className="bg-gray-300 p-2 rounded-lg text-base [&::-webkit-calendar-picker-indicator]:invert"
              />
            </div>

            <div>
              <input
                type="submit"
                className={`py-3 px-10 rounded-lg duration-150 font-bold ${
                  loadAddUser
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-second cursor-pointer"
                }`}
                value={`${loadAddUser ? "Registering..." : "Register a User"}`}
              />
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
            <span className="pt-18 sm:pt-10">Register </span>
            <span className="tracking-wider">a New</span>
            <span>User</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddNewUserLayout;
