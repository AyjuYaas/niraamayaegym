import { useState } from "react";
import { useUserHook } from "../../../hook/useUserHook";
import ExerciseDetails from "./ExerciseDetails";

const IndividualExercise = ({ exercise }) => {
  const [check, setCheck] = useState(exercise.status === "completed");
  const [exerciseDetails, setExerciseDetails] = useState(null);

  const { updateAssignedExercise } = useUserHook();

  const handleOnClick = () => {
    setCheck(!check);
    if (exercise.status === "pending") {
      updateAssignedExercise(exercise._id, { status: "completed" });
    } else {
      updateAssignedExercise(exercise._id, { status: "pending" });
    }
  };

  return (
    <div
      className={`p-2 px-7 rounded-md flex items-center justify-between duration-100 ${
        exercise.status === "pending"
          ? "bg-white hover:bg-gray-200 cursor-pointer text-black"
          : "bg-gray-800 text-white"
      }`}
      onClick={() => setExerciseDetails(exercise.exerciseId)}
    >
      <div className="flex flex-col">
        <h1
          className={`text-lg font-bold ${
            exercise.status === "completed" && "line-through"
          }`}
        >
          {exercise.exerciseId.name}
        </h1>
        <div
          className={`text-base ${
            exercise.status === "pending" ? "text-gray-600" : "text-gray-400"
          }`}
        >
          <p>Sets: {exercise.sets}</p>
          <p>Reps: {exercise.reps}</p>
        </div>
      </div>

      <div>
        <input
          type="checkbox"
          checked={check}
          className="checkbox cursor-alias border-3 duration-100 border-second checked:border-second checked:bg-second checked:text-white size-7"
          onClick={(e) => e.stopPropagation()}
          onChange={handleOnClick}
        />
      </div>

      {exerciseDetails && (
        <ExerciseDetails
          exercise={exerciseDetails}
          close={() => setExerciseDetails(null)}
        />
      )}
    </div>
  );
};
export default IndividualExercise;
