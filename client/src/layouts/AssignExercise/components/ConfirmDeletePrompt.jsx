import useClickOutside from "../../../hook/useClickOutside";

const ConfirmDeletePrompt = ({ handleDelete, close }) => {
  const ref = useClickOutside(close);
  return (
    <div className="fixed backdrop-blur-lg top-0 left-0 z-70 w-full h-screen flex justify-center items-center">
      <div
        className="bg-gray-900 text-black p-5 rounded-lg relative w-90 border-3 border-gray-800"
        ref={ref}
      >
        <h1 className="text-xl font-bold text-second mb-3">Confirm Delete?</h1>
        <div className="text-base text-gray-400 flex flex-col gap-3 mb-4">
          <p>Are you sure you want to delete this task?</p>
          <p>
            After deleting the task along with the exercise will all be deleted
          </p>
        </div>

        <div className="flex gap-5">
          <button
            onClick={handleDelete}
            className="p-2 px-4 bg-highlight rounded-lg font-bold text-white hover:bg-red-700 cursor-pointer duration-100"
          >
            Delete
          </button>
          <button
            onClick={close}
            className="text-white cursor-pointer hover:underline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmDeletePrompt;
