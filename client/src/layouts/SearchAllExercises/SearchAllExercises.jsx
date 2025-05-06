import { useEffect, useState } from "react";
import { useExerciseHook } from "../../hook/useExerciseHook";
import { FaSearch } from "react-icons/fa";
import { PiEmpty } from "react-icons/pi";
import ExerciseDetails from "../UserDashboard/components/ExerciseDetails";

const SearchAllExercises = () => {
  const { getExercise, exercises } = useExerciseHook();

  useEffect(() => {
    getExercise("user");
  }, [getExercise]);

  const [searchQuery, setSearchQuery] = useState("");
  const [assignExercise, setAssignExercise] = useState(null);

  const filteredExercises = exercises.filter((exercises) => {
    const query = searchQuery.toLowerCase();

    return (
      exercises.name.toLowerCase().includes(query) ||
      exercises.bodyPart.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen h-max w-full flex flex-col gap-5 bg-black py-20 relative">
      <div className="flex flex-col mt-1">
        <h1 className="font-bold text-2xl text-center text-second">
          All Exercises
        </h1>
      </div>

      <div className="relative w-full max-w-xs flex items-center self-center">
        <FaSearch className="absolute left-2 text-gray-500 size-4 z-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Exercise or Body Part"
          className="input w-full pl-10 border-0 "
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
            </div>
          ))
        )}
      </div>

      {assignExercise && (
        <ExerciseDetails
          exercise={assignExercise}
          close={() => setAssignExercise(null)}
        />
      )}
    </div>
  );
};
export default SearchAllExercises;
