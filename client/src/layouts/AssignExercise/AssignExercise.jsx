import { useEffect } from "react";
import { useExerciseHook } from "../../hook/useExerciseHook";
import { useParams } from "react-router-dom";
import UserProfile from "../../components/UserProfile";
import AssignedExercises from "./components/AssignedExercises";
import Exercises from "./components/Exercises";

const AssignExercise = () => {
  const { getAssignedExercise, loadingAssignedExercise, user, task } =
    useExerciseHook();
  const { taskId } = useParams();

  useEffect(() => {
    getAssignedExercise(taskId);
  }, [getAssignedExercise, taskId]);

  return (
    <div className="pt-20 min-h-screen bg-black flex justify-center items-start">
      {loadingAssignedExercise ? (
        <div>
          <span className="loading loading-spinner loading-xl"></span>
        </div>
      ) : (
        <div className="flex flex-col gap-5 w-full">
          <div className="self-center">
            <UserProfile user={user} />
          </div>

          <h1 className="text-xl font-bold text-second text-center">
            Assign Exercises for <span className="capitalize">{task.day}</span>{" "}
            [{task.title}]
          </h1>
          <div className="flex flex-col p-4 px-10 gap-5">
            <div className="flex-1/2">
              <AssignedExercises userName={user.name} />
            </div>
            <div className="flex-1/2">
              <Exercises taskId={task._id} userName={user.name} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AssignExercise;
