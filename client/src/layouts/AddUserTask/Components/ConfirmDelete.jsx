import { useNavigate } from "react-router-dom";
import useClickOutside from "../../../hook/useClickOutside";
import { useTrainerHook } from "../../../hook/useTrainerHook";

const ConfirmDelete = ({ user, close }) => {
  const ref = useClickOutside(close);
  const { deleteUser } = useTrainerHook();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const res = await deleteUser(user._id);

    if (res) {
      navigate("/trainer/dashboard");
    }
  };
  return (
    <div className="fixed backdrop-blur-lg top-0 left-0 z-40 w-full h-screen flex justify-center items-center">
      <div
        className="bg-gray-900 text-white p-5 rounded-lg relative w-100 border-3 border-gray-800"
        ref={ref}
      >
        <div>
          <h1 className="font-bold text-xl text-second">Confirm Delete?</h1>
        </div>

        <div>
          <h1>Do you wish to delete {user.name}'s account?</h1>
          <p>All the tasks and assigned exercise will be deleted</p>
        </div>

        <div className="w-full flex justify-around mt-13">
          <button
            className="hover:underline cursor-pointer"
            onClick={() => close()}
          >
            Cancel
          </button>
          <button
            className="bg-red-800 p-2 px-5 rounded-md cursor-pointer hover:bg-red-600"
            onClick={handleDelete}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
export default ConfirmDelete;
