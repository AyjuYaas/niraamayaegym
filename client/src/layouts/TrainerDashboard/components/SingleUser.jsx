import defaultUserImage from "/default-user.jpg";
import { Link } from "react-router-dom";

const SingleUser = ({ user }) => {
  return (
    <Link
      className="relative h-50 bg-white rounded-lg shadow-lg mt-9 shadow-gray-600 text-black p-4 py-7 flex flex-col justify-center items-center cursor-pointer transform hover:-translate-y-2 transition-all duration-75 font-medium text-lg w-50"
      to={`/trainer/assign-user/${user._id}`}
    >
      <img
        src={user.profilePic || defaultUserImage}
        alt={user.name}
        className="size-30 rounded-full mb-2 absolute -top-10"
      />
      <div className="absolute top-0 h-full flex flex-col items-center justify-center pt-15">
        <h1 className="text-center">
          {user.name.split(" ").slice(0, 2).join(" ")}
        </h1>
        <p className="font-light">{user.gender}</p>
      </div>
    </Link>
  );
};
export default SingleUser;
