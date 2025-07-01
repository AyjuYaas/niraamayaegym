import { useRef, useState } from "react";
import genderData from "./genderData";
import { useTrainerHook } from "../../hook/useTrainerHook";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";

const AddNewUserLayout = () => {
  const navigate = useNavigate();
  const { loadAddUser, addUser } = useTrainerHook();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    profilePic: "/default-user.jpg",
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    height: "",
    weight: "",
    specialCondition: "",
  });

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setFormData((prev) => ({
          ...prev,
          profilePic: result,
        }));
      }
    };
    reader.readAsDataURL(file); // Converts to base64
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await addUser(formData);

    if (success) {
      navigate("/trainer/dashboard");
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-20 justify-center items-center bg-gray-200 text-black">
      <div className="flex shadow-2xl">
        <div className="bg-white p-10 h-full flex items-center w-auto md:w-100">
          {/* Form */}
          <form
            className="flex flex-col gap-5 text-lg w-full"
            onSubmit={handleSubmit}
          >
            {/* ========== Image Update =========== */}
            <div className="flex mx-auto relative w-max p-0">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                name="profilePic"
              />

              {formData.profilePic && (
                <div>
                  <img
                    src={formData.profilePic}
                    alt={formData.name + "-img"}
                    className="size-30 rounded-full border-2 bg-white object-cover"
                    style={{ imageRendering: "-webkit-optimize-contrast" }}
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`absolute bottom-0 right-0 text-center size-10 flex items-center justify-center bg-gray-800 text-[white] hover:bg-[#565b70] duration-100 rounded-full p-1 min-w-max border-0 font-medium cursor-pointer`}
              >
                <FaCamera />
              </button>
            </div>
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
            {/* Weight in KG */}
            <div className="flex flex-col">
              <label htmlFor="weight" className="font-semibold ml-1">
                Weight (Kg)
              </label>
              <input
                type="number"
                name="weight"
                id="weight"
                value={formData.weight}
                onChange={handleFormDataChange}
                placeholder="Customer's Weight in Kg"
                required
                min={20}
                className="bg-gray-300 p-2 rounded-lg text-base"
              />
            </div>
            {/* Height in cm */}
            <div className="form-control">
              <div className="flex flex-col">
                <label htmlFor="height" className="font-semibold ml-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  id="height"
                  value={formData.height}
                  onChange={handleFormDataChange}
                  placeholder="Customer's Height in cm"
                  min={40}
                  required
                  className="bg-gray-300 p-2 rounded-lg text-base"
                />
              </div>
            </div>

            {/* Special Condition */}
            <div className="flex flex-col">
              <label htmlFor="specialCondition" className="font-semibold ml-1">
                Special Condition
              </label>
              <input
                type="text"
                name="specialCondition"
                id="specialCondition"
                value={formData.specialCondition}
                onChange={handleFormDataChange}
                placeholder="Enter special condition if any"
                className="bg-gray-300 p-2 rounded-lg text-base [&::-webkit-calendar-picker-indicator]:invert"
              />
              <span className="text-sm">e.g. High blood pressure, etc</span>
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

        <div className=" text-second min-h-full bg-red-300 p-2 sm:p-10 flex flex-col items-start justify-start w-auto relative">
          <img
            src="/auth/signup.jpg"
            alt="auth-background"
            className="object-cover absolute w-full h-full top-0 left-0 select-none z-1"
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
