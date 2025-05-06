import { useEffect, useState } from "react";
import genderData from "./genderData";
import { useUserHook } from "../../hook/useUserHook";

const UpdateUserProfile = () => {
  const { getUpdateDetails, updateProfile, loadUpdate } = useUserHook();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    phone: "",
    gender: "",
    dob: "",
  });

  useEffect(() => {
    const getDetails = async () => {
      const user = await getUpdateDetails();

      const formattedDate = new Date(user.dob).toISOString().split("T")[0]; // "2003-10-30"

      setFormData({
        name: user.name,
        email: user.email,
        oldPassword: "",
        newPassword: "",
        phone: user.phone,
        gender: user.gender,
        dob: formattedDate,
      });
    };

    getDetails();
  }, [getUpdateDetails]);

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
  };

  return (
    <div className="min-h-screen h-max w-full flex flex-col items-center justify-center bg-gray-200 py-20 relative ">
      <div className="bg-white w-120 rounded-md self-center p-10 h-full flex flex-col items-center min-w-100 text-gray-900 shadow-xl">
        <h1 className="text-2xl font-bold text-second mb-5">
          Update Your Profile
        </h1>
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

          {/* New Password */}
          <div className="flex flex-col">
            <label htmlFor="newPassword" className="font-semibold ml-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              id="password"
              value={formData.newPassword}
              onChange={handleFormDataChange}
              placeholder="Enter your new password"
              className="bg-gray-300 p-2 rounded-lg text-base"
            />
            <p className="text-xs text-gray-400">
              If you don't want to change, leave this field blank
            </p>
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

          {/* Old Password */}
          <div className="flex flex-col">
            <label htmlFor="oldPassword" className="font-semibold ml-1">
              Enter your Password to Confirm
            </label>
            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              value={formData.oldPassword}
              onChange={handleFormDataChange}
              placeholder="Enter your password"
              required
              className="bg-gray-300 p-2 rounded-lg text-base"
            />
          </div>

          <div>
            <input
              type="submit"
              className={`py-3 px-10 rounded-lg duration-150 font-bold ${
                loadUpdate
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-second cursor-pointer"
              }`}
              value={`${loadUpdate ? "Updating..." : "Update"}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdateUserProfile;
