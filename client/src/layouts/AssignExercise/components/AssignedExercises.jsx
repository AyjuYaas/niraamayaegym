import { useState } from "react";
import { useExerciseHook } from "../../../hook/useExerciseHook";
import { PiEmpty } from "react-icons/pi";
import AssignUpdateExerciseForm from "./AssignUpdateExerciseForm";

const AssignedExercises = ({ userName }) => {
  const { assignedExercises } = useExerciseHook();
  const [updateExerciseData, setUpdateExerciseData] = useState(null);

  return (
    <div className="bg-white text-black p-2 rounded-md shadow-md shadow-gray-200 flex flex-col h-full">
      <div className="my-2">
        <h1 className="text-center font-bold text-xl">Assigned Exercises</h1>
        <p className="text-center text-gray-600">
          To edit any assigned exercise, click on the exercise
        </p>
        <p className="text-sm text-gray-600 text-center">
          Green background indicates, the user has completed the exercise
        </p>
      </div>
      <div className="flex flex-wrap gap-5 max-h-60 overflow-y-auto justify-center p-2 mb-5">
        {assignedExercises.length === 0 ? (
          <div className="flex items-center gap-2">
            <PiEmpty />
            <h1>No Exercises Assigned, Select from Below to Assign</h1>
          </div>
        ) : (
          assignedExercises.map((exercise, index) => (
            <div
              key={index}
              className={`relative  text-white p-5 w-45 h-20 flex items-center justify-center text-lg cursor-pointer rounded-md duration-100 gap-2 ${
                exercise.status === "completed"
                  ? "bg-green-700 hover:bg-green-600"
                  : "bg-gray-900 hover:bg-gray-700"
              }`}
              onClick={() => setUpdateExerciseData(exercise)}
            >
              <h1 className="text-center">{exercise.exerciseId.name}</h1>
            </div>
          ))
        )}
      </div>

      {updateExerciseData && (
        <AssignUpdateExerciseForm
          taskId={updateExerciseData.taskId}
          userName={userName}
          exercise={updateExerciseData.exerciseId}
          close={() => setUpdateExerciseData(null)}
          sets={updateExerciseData.sets}
          reps={updateExerciseData.reps}
          assignedExerciseId={updateExerciseData._id}
        />
      )}
    </div>
  );
};
export default AssignedExercises;
