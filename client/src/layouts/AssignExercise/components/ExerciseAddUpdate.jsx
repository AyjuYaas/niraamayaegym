import { useState, useEffect } from "react";
import useClickOutside from "../../../hook/useClickOutside";
import YouTubeVideoInput from "./YouTubeVideoInput";
import { useExerciseHook } from "../../../hook/useExerciseHook";
import { IoClose } from "react-icons/io5";
import ConfirmDeletePrompt from "./ConfirmDeletePrompt";

const ExerciseAddUpdate = ({ close, inputData = null }) => {
  const { addExercise, updateExercise, deleteExercise } = useExerciseHook();
  const ref = useClickOutside(close);

  const [formData, setFormData] = useState({
    name: "",
    bodyPart: "",
    description: "",
    videos: [],
  });

  useEffect(() => {
    if (inputData) {
      setFormData({
        name: inputData.name,
        bodyPart: inputData.bodyPart,
        description: inputData.description,
        videos: inputData.videos,
      });
    }
  }, [inputData]);

  const [deletePrompt, setDeletePrompt] = useState(false);

  const bodyPart = [
    "chest",
    "back",
    "shoulders",
    "neck",
    "biceps",
    "triceps",
    "abs",
    "arms",
    "hip",
    "legs",
  ];

  const handleFormData = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = false;
    if (inputData) {
      res = await updateExercise(inputData._id, formData);
    } else {
      res = await addExercise(formData);
    }

    if (res) {
      close();
    }
  };

  const handleDelete = async () => {
    const res = await deleteExercise(inputData._id);

    if (res) {
      close();
    }
  };

  return (
    <div className="fixed backdrop-blur-lg top-0 left-0 z-40 w-full h-screen flex justify-center items-center py-5">
      <div
        className="bg-gray-900 text-white p-5 rounded-lg relative w-130 m-5 max-h-full h-max overflow-y-auto border-3 border-gray-800"
        ref={ref}
      >
        <h1 className="text-2xl text-second font-bold">
          {inputData ? "Update Exercise" : "Add New Exercise"}
        </h1>
        <form className="flex flex-col gap-2 mt-5" onSubmit={handleSubmit}>
          {/* Name */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base">Name:</legend>
            <input
              type="text"
              className="input w-full"
              placeholder="Name of the Exercise"
              name="name"
              value={formData.name}
              onChange={handleFormData}
            />
          </fieldset>

          {/* Body Part */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base">Body Part</legend>
            <select
              className="select capitalize w-full"
              name="bodyPart"
              value={formData.bodyPart}
              onChange={handleFormData}
            >
              <option disabled value="">
                Select a Body Part
              </option>
              {bodyPart.map((indPart, index) => (
                <option key={index} value={indPart} className="capitalize">
                  {indPart}
                </option>
              ))}
            </select>
          </fieldset>

          {/* Description */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base">Description</legend>
            <textarea
              className="textarea h-24 w-full"
              placeholder="A short description about the exercise"
              name="description"
              value={formData.description}
              onChange={handleFormData}
            ></textarea>
          </fieldset>

          {/* Add Youtube Videos */}
          <YouTubeVideoInput
            videos={formData.videos} // Pass videos array from formData
            setFormData={setFormData} // Pass setFormData to update videos in formData
          />

          {/* Submit */}
          <div className="flex mt-3 gap-5 w-full">
            <input
              type="submit"
              name="submit"
              value={inputData ? "Update" : "Add Exercise"}
              className="cursor-pointer px-7 py-3 bg-second font-semibold rounded-md hover:bg-second-hi duration-100"
            />
            {inputData && (
              <button
                type="button"
                className="cursor-pointer px-7 bg-red-700 font-semibold rounded-md hover:bg-red-500 duration-100"
                onClick={() => setDeletePrompt(true)}
              >
                Delete
              </button>
            )}
          </div>
        </form>

        <div className="absolute top-5 right-5">
          <button
            className="bg-red-600 p-1 rounded-full hover:bg-red-400 cursor-pointer"
            onClick={close}
          >
            <IoClose size={25} />
          </button>
        </div>

        {deletePrompt && (
          <ConfirmDeletePrompt
            handleDelete={handleDelete}
            close={() => setDeletePrompt(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ExerciseAddUpdate;
