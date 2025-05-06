import { useState } from "react";
import { useAuthHook } from "../../../hook/useAuthHook";

const UpdatePassword = ({ name }) => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [warning, setWarning] = useState(false);

  const { changeDefaultPassword } = useAuthHook();

  const handleFormData = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    if (e.target.name === "confirmPassword") {
      e.target.value === formData.password
        ? setWarning(false)
        : setWarning(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    changeDefaultPassword(formData);
  };

  return (
    <div className="fixed backdrop-blur-lg top-0 left-0 z-40 w-full h-screen flex justify-center items-center py-5">
      <div className="bg-gray-900 text-white p-5 rounded-lg relative w-max m-5 max-h-full h-max overflow-y-auto border-3 border-gray-800">
        <div>
          <h1 className="font-bold text-lg text-second">
            Welcome {name.split(" ").slice(0, 1)},
          </h1>
          <p className="text-sm text-gray-400">
            Before continuing with the app, Please update your password
          </p>
        </div>

        <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your New Password"
              className="input"
              value={formData.password}
              onChange={handleFormData}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input"
              value={formData.confirmPassword}
              onChange={handleFormData}
            />
            {warning && (
              <p className="text-red-500 text-xs">
                Password and Confirm Password don't match
              </p>
            )}
          </div>

          <div>
            <input
              type="submit"
              value="Submit"
              className="btn bg-second hover:bg-second-hi mt-2"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default UpdatePassword;
