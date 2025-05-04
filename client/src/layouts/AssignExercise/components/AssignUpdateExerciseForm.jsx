import { useState } from "react";
import useClickOutside from "../../../hook/useClickOutside";
import { useExerciseHook } from "../../../hook/useExerciseHook";
import ConfirmDeletePrompt from "./ConfirmDeletePrompt";

const AssignUpdateExerciseForm = ({
  taskId,
  userName,
  exercise,
  close,
  sets = "",
  reps = "",
  assignedExerciseId = "",
}) => {
  const ref = useClickOutside(close);

  const { assignExercise, updateAssignedExercise, deleteAssignedExercise } =
    useExerciseHook();

  const [formData, setFormData] = useState({
    taskId,
    exerciseId: exercise._id,
    reps: reps,
    sets: sets,
  });

  const handleFormDataChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = false;

    if (assignedExerciseId) {
      res = await updateAssignedExercise(assignedExerciseId, {
        reps: formData.reps,
        sets: formData.sets,
      });
    } else {
      res = await assignExercise(formData);
    }

    if (res) {
      close();
    }
  };

  const [deletePrompt, setDeletePrompt] = useState(false);

  const handleDelete = async () => {
    const res = await deleteAssignedExercise(assignedExerciseId);

    if (res) {
      close();
    }
  };

  return (
    <div className="fixed backdrop-blur-lg top-0 left-0 z-40 w-full h-screen flex justify-center items-center py-5">
      <div
        className="bg-gray-900 text-white p-5 rounded-lg relative w-max m-5 max-h-full h-max overflow-y-auto border-3 border-gray-800"
        ref={ref}
      >
        <h1 className="text-xl font-bold text-second">
          {assignedExerciseId ? "Update Assigned Exercise" : "Assign Exercise"}
        </h1>
        <p>
          {assignedExerciseId ? "Update" : "Assign"} {exercise.name} to{" "}
          {userName}
        </p>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="reps">Sets</label>
            <input
              type="number"
              className="input validator"
              required
              placeholder="Type the number of Sets"
              min="1"
              title="Must be greater than 1"
              name="sets"
              value={formData.sets}
              onChange={handleFormDataChange}
            />
            <p className="validator-hint">Must be greater than 1</p>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="reps">Reps</label>
            <input
              type="number"
              className="input validator"
              required
              placeholder="Type the number of repetition"
              min="1"
              title="Must be greater than 1"
              name="reps"
              value={formData.reps}
              onChange={handleFormDataChange}
            />
            <p className="validator-hint">Must be greater than 1</p>
          </div>

          <div className="flex gap-5">
            <input
              type="submit"
              value={assignedExerciseId ? "Update" : "Assign"}
              className="px-7 py-2 bg-second rounded-md hover:bg-second-hi cursor-pointer"
            />

            {assignedExerciseId && (
              <button
                type="button"
                onClick={() => setDeletePrompt(true)}
                className="px-7 py-2 bg-red-700 rounded-md hover:bg-red-600 cursor-pointer"
              >
                Delete
              </button>
            )}
          </div>
        </form>

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
export default AssignUpdateExerciseForm;
