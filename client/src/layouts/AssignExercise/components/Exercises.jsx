import { useEffect, useState } from "react";
import { useExerciseHook } from "../../../hook/useExerciseHook";
import { FaSearch } from "react-icons/fa";
import { PiEmpty } from "react-icons/pi";
import { MdEdit } from "react-icons/md";
import ExerciseAddUpdate from "./ExerciseAddUpdate";
import AssignUpdateExerciseForm from "./AssignUpdateExerciseForm";

const Exercises = ({ taskId, userName }) => {
  const { getExercise, exercises } = useExerciseHook();

  useEffect(() => {
    getExercise();
  }, [getExercise]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [assignExercise, setAssignExercise] = useState(null);

  const filteredExercises = exercises.filter((exercises) => {
    const query = searchQuery.toLowerCase();

    return (
      exercises.name.toLowerCase().includes(query) ||
      exercises.bodyPart.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-white text-black p-2 rounded-md shadow-md shadow-gray-200 flex flex-col gap-5 mb-5">
      <div className="flex flex-col mt-1">
        <h1 className="font-bold text-xl text-center">Available Exercises</h1>
        <p className="text-gray-600 text-center">
          To Assign an Exercise Select from below or Add a New Exercise
        </p>
      </div>

      <div className="relative w-full max-w-xs flex items-center self-center">
        <FaSearch className="absolute left-2 text-black size-4 z-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Exercise or Body Part"
          className="input w-full pl-10 border-0 bg-gray-400"
        />
      </div>

      <div className="flex flex-wrap gap-5 max-h-60 overflow-y-auto justify-center p-2">
        {filteredExercises.length === 0 ? (
          <div className="flex items-center gap-2">
            <PiEmpty />
            <h1>No Exercises Found</h1>
          </div>
        ) : (
          filteredExercises.map((exercise, index) => (
            <div
              key={index}
              className="relative bg-gray-900 text-white p-5 w-45 h-20 flex items-center justify-center text-lg cursor-pointer rounded-md hover:bg-gray-700 duration-100"
              onClick={() => setAssignExercise(exercise)}
            >
              <h1 className="text-center">{exercise.name}</h1>

              <button
                className="p-1 bg-amber-600 absolute rounded-full -top-2 -right-2 cursor-pointer hover:bg-amber-500"
                onClick={(e) => {
                  e.stopPropagation();
                  setUpdateData(exercise);
                }}
              >
                <MdEdit />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="self-center my-3">
        <button
          className="p-4 bg-second hover:bg-gray-700 hover:text-white font-semibold rounded-md cursor-pointer duration-100"
          onClick={() => setIsFormOpen(true)}
        >
          Add New Exercise
        </button>
      </div>

      {isFormOpen && <ExerciseAddUpdate close={() => setIsFormOpen(false)} />}

      {updateData && (
        <ExerciseAddUpdate
          close={() => setUpdateData(null)}
          inputData={updateData}
        />
      )}

      {assignExercise && (
        <AssignUpdateExerciseForm
          taskId={taskId}
          userName={userName}
          exercise={assignExercise}
          close={() => setAssignExercise(null)}
        />
      )}
    </div>
  );
};
export default Exercises;
