import { useEffect } from "react";
import { useUserHook } from "../../../hook/useUserHook";
import IndividualExercise from "./IndividualExercise";

const AssignedExercises = () => {
  const {
    getAssignedExercises,
    resetAssignedExercise,
    pendingExercises,
    completedExercises,
    taskDetails,
    loadAssignedExercises,
  } = useUserHook();

  useEffect(() => {
    getAssignedExercises();

    return () => {
      resetAssignedExercise();
    };
  }, [getAssignedExercises, resetAssignedExercise]);

  if (loadAssignedExercises) {
    return (
      <div className="w-full flex items-center justify-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center mt-8">
      {!taskDetails ? (
        <div className="self-center flex flex-col items-center justify-center">
          <h1 className="text-xl text-second font-semibold">
            No assigned Exercises for Today
          </h1>
          <p className="text-gray-400">
            Contact your Trainer to Assign you a Task or Search for Exercises
            Below
          </p>
        </div>
      ) : (
        <div>
          {/* Title of the Exercise */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold text-second">
              Assigned Exercises for{" "}
              <span className="capitalize">{taskDetails.day}</span>
            </h1>
            <div className="text-center text-gray-400 w-80">
              <p>Title: {taskDetails.title}</p>
              <p>Assigned By: {taskDetails.assignedBy}</p>
              <p className="text-xs">
                [Click to View and Check to mark as Complete]
              </p>
            </div>
          </div>

          {/* Pending Exercises */}
          <div className="mt-5">
            <div>
              <div className="flex flex-col gap-3">
                {pendingExercises.map((exercise) => (
                  <IndividualExercise key={exercise._id} exercise={exercise} />
                ))}

                {completedExercises.map((exercise) => (
                  <IndividualExercise key={exercise._id} exercise={exercise} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AssignedExercises;
