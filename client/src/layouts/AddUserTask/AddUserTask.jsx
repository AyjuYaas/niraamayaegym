import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTaskHook } from "../../hook/useTaskHook";

import { FaPlus } from "react-icons/fa";
import AssignedTask from "./Components/AssignedTask";
import AssignNewTask from "./Components/AssignNewTask";
import UserProfile from "../../components/UserProfile";
import ConfirmDelete from "./Components/ConfirmDelete";

const AddUserTask = () => {
  const { userId } = useParams();
  const { loadingUser, getTask, user, resetTask } = useTaskHook();

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    getTask(userId);

    return () => {
      resetTask();
    };
  }, [getTask, userId, resetTask]);

  return (
    <div className="pt-20 p-5 min-h-screen bg-black flex justify-center items-start">
      {loadingUser ? (
        <span className="loading loading-dots size-20"></span>
      ) : (
        <div>
          <UserProfile user={user} />

          <AssignedTask />

          <div className="mt-10 bg-second hover:bg-second-hi p-3 w-max mx-auto font-bold rounded-lg cursor-pointer  duration-150">
            <button
              className="flex justify-center items-center gap-2 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              <FaPlus /> Assign Task
            </button>
          </div>

          <div className="absolute bottom-5 right-5">
            <button
              className="bg-red-800 p-2 px-5 rounded-md hover:bg-red-500 cursor-pointer"
              onClick={() => setIsDeleteOpen(true)}
            >
              Delete User
            </button>
          </div>

          {isOpen && <AssignNewTask close={() => setIsOpen(false)} />}

          {isDeleteOpen && (
            <ConfirmDelete user={user} close={() => setIsDeleteOpen(false)} />
          )}
        </div>
      )}
    </div>
  );
};
export default AddUserTask;
