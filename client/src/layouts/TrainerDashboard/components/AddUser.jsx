import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

const AddUser = () => {
  return (
    <div className="fixed bottom-5 right-5">
      <Link
        to="/trainer/add-user"
        className="bg-second py-2 px-5 rounded-lg font-bold cursor-pointer hover:bg-second-hi duration-150 flex justify-center items-center gap-2"
      >
        <FaPlusCircle />
        Add User
      </Link>
    </div>
  );
};
export default AddUser;
