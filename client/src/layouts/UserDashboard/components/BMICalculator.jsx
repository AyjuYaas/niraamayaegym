import useClickOutside from "../../../hook/useClickOutside";
import { useState } from "react";
import { useUserHook } from "../../../hook/useUserHook";

const BMICalculator = ({ data, close }) => {
  const ref = useClickOutside(close);

  const [formData, setFormData] = useState(data);
  const [BMI, setBMI] = useState();

  const { calculateBMI } = useUserHook();

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await calculateBMI(formData);
    if (res <= 18.5) {
      setBMI({ BMI: res, message: "Underweight", color: "text-blue-400" });
    } else if (res <= 24.9) {
      setBMI({ BMI: res, message: "Healthy", color: "text-green-400" });
    } else if (res <= 29.9) {
      setBMI({ BMI: res, message: "Overweight", color: "text-yellow-400" });
    } else if (res <= 39.9) {
      setBMI({ BMI: res, message: "Obese", color: "text-orange-400" });
    } else {
      setBMI({ BMI: res, message: "Severely Obese", color: "text-red-600" });
    }
  };

  return (
    <div className="fixed backdrop-blur-lg top-0 left-0 z-40 w-full h-screen flex justify-center items-center py-5">
      <div
        className="bg-gray-900 text-white p-5 rounded-lg relative w-max m-5 max-h-full h-max overflow-y-auto border-3 border-gray-800"
        ref={ref}
      >
        <h1 className="font-bold text-xl text-second">BMI Calculator</h1>

        <form className="space-y-4 mt-3" onSubmit={handleSubmit}>
          {/* Weight in KG */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Weight (kg)</span>
            </label>
            <input
              type="number"
              placeholder="Enter your weight in kilograms"
              className="input input-bordered w-full"
              name="weight"
              min="0"
              step="0.1"
              required
              value={formData.weight}
              onChange={handleFormChange}
            />
          </div>

          {/* Height in Feet and Inches */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Height (cm)</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Enter your weight in Height in cm"
                className="input input-bordered w-full"
                name="height"
                min="1"
                step="0.1"
                required
                value={formData.height}
                onChange={handleFormChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full bg-second hover:bg-second-hi"
          >
            Calculate BMI
          </button>
        </form>

        {BMI && (
          <div className={BMI.color}>
            <h1 className={`mt-5 font-bold text-center text-xl`}>
              Your BMI is: {BMI.BMI}
            </h1>
            <p>Google Categories the BMI as {BMI.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default BMICalculator;
