import { Link } from "react-router-dom";
import { useTaskHook } from "../../../hook/useTaskHook";
import { BsThreeDots } from "react-icons/bs";
import { MdEdit, MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import AssignNewTask from "./AssignNewTask";
import DeleteTask from "./DeleteTask";

const AssignedTask = () => {
  const { tasks } = useTaskHook();
  const [updateValue, setUpdateValue] = useState(null);
  const [deleteTask, setDeleteTask] = useState("");

  return (
    <div className="mt-10 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-5">Assigned Tasks</h1>

      <div className="flex flex-col gap-5">
        {tasks.length === 0 ? (
          <p>No Tasks Assigned Yet</p>
        ) : (
          tasks.map((task, index) => (
            <div
              className="relative hover:shadow-lg hover:z-20 shadow-gray-400 transition-all duration-100 rounded-xl"
              key={index}
            >
              <Link
                to={`/trainer/assign-exercise/${task._id}`}
                key={index}
                className="bg-white text-black p-5 flex gap-3 items-center rounded-xl cursor-pointer w-100 hover:bg-gray-100"
              >
                <img src="/Default_image.svg" className="text-white size-15" />
                <div>
                  <h1 className="capitalize font-bold">{task.day}</h1>
                  <p>{task.title}</p>
                  <p className="text-gray-400 text-md">
                    Added by: {task.assignedBy}
                  </p>
                </div>
              </Link>

              <div className="dropdown dropdown-bottom dropdown-end text-3xl rounded-r-xl p-1 cursor-pointer bg-second hover:bg-second-hi duration-100 absolute right-0 bottom-0 h-full">
                <div
                  tabIndex={0}
                  role="button"
                  className="h-full flex justify-center items-center"
                >
                  <BsThreeDots className="hover:text-white" />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <button
                    className="p-2 bg-second-hi hover:bg-[#5e72ae] cursor-pointer rounded-t-md w-full text-start flex items-center gap-1 duration-100"
                    onClick={(e) => {
                      setUpdateValue(task);
                      e.currentTarget.blur();
                    }}
                  >
                    <MdEdit /> Update Task
                  </button>
                  <button
                    className="p-2 bg-red-700 hover:bg-red-600 cursor-pointer rounded-b-md w-full text-start flex items-center gap-1 duration-100"
                    onClick={(e) => {
                      setDeleteTask(task._id);
                      e.currentTarget.blur();
                    }}
                  >
                    <MdDeleteForever /> Delete Task
                  </button>
                </ul>
              </div>
            </div>
          ))
        )}
      </div>

      {updateValue && (
        <AssignNewTask
          close={() => setUpdateValue(null)}
          inputVal={updateValue}
        />
      )}

      {deleteTask && (
        <DeleteTask close={() => setDeleteTask("")} taskId={deleteTask} />
      )}
    </div>
  );
};
export default AssignedTask;
