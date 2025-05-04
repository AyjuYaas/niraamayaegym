import { IoIosCloseCircle } from "react-icons/io";
import useClickOutside from "../../../hook/useClickOutside";
import { useTaskHook } from "../../../hook/useTaskHook";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const AssignNewTask = ({ close, inputVal = null }) => {
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const ref = useClickOutside(close);
  const { assignTask, updateTask } = useTaskHook();
  const { userId } = useParams();

  const [inputValues, setInputValues] = useState({
    day: "",
    title: "",
    assignedBy: "",
  });

  useEffect(() => {
    if (inputVal) {
      setInputValues({
        day: inputVal.day,
        title: inputVal.title,
        assignedBy: inputVal.assignedBy,
      });
    }
  }, [inputVal]);

  const changeInputValues = (e) => {
    setInputValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (inputVal) {
      const res = await updateTask(inputVal._id, inputValues);
      res ? close() : "";
    } else {
      const res = await assignTask(userId, inputValues);
      res ? close() : "";
    }
  };

  return (
    <div className="fixed backdrop-blur-lg top-0 left-0 z-40 w-full h-screen flex justify-center items-center">
      <div
        className="bg-gray-900 text-black p-5 rounded-lg relative w-80 border-3 border-gray-800"
        ref={ref}
      >
        <h1 className="font-bold text-2xl mb-4 text-second">
          {inputVal ? "Update Task" : "Assign a New Task"}
        </h1>

        <form onSubmit={handleOnSubmit}>
          <div className="mb-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-gray-200 text-base">
                Day
              </legend>
              <select
                name="day"
                value={inputValues.day}
                onChange={changeInputValues}
                className="select text-white capitalize"
              >
                <option disabled value="">
                  Select a day
                </option>
                {days.map((day, index) => (
                  <option key={index} value={day} className="capitalize">
                    {day}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>

          <div className="mb-2">
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-gray-200 text-base">
                Title of the Task
              </legend>
              <input
                type="text"
                name="title"
                placeholder="eg: Chest Day"
                value={inputValues.title}
                onChange={changeInputValues}
                className="input text-white"
              />
            </fieldset>
          </div>

          <div className="mb-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-gray-200 text-base">
                Assigned By:
              </legend>
              <input
                type="text"
                name="assignedBy"
                placeholder="Name of the trainer"
                value={inputValues.assignedBy}
                onChange={changeInputValues}
                className="input text-white"
              />
            </fieldset>
          </div>

          <div className="mx-auto w-max">
            <input
              type="submit"
              value={inputVal ? "Update" : "Assign"}
              className="w-max bg-second p-3 px-5 text-sm font-bold rounded-lg cursor-pointer hover:bg-second-hi hover:text-white duration-150"
            />
          </div>
        </form>
        <button className="absolute top-2 right-2" onClick={close}>
          <IoIosCloseCircle
            size={30}
            className="text-red-700 cursor-pointer hover:text-red-400"
          />
        </button>
      </div>
    </div>
  );
};
export default AssignNewTask;
