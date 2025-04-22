import { useEffect } from "react";
import { useTrainerHook } from "../../../hook/TrainerHook";
import defaultUserImage from "/default-user.jpg";
import { Link } from "react-router-dom";

const UnassignedUsers = ({ searchQuery }) => {
  const { unassignedUsers, getUnassignedUsers, loadingUnassignedUsers } =
    useTrainerHook();

  useEffect(() => {
    getUnassignedUsers();
  }, [getUnassignedUsers]);

  const filteredUsers = unassignedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5 w-full px-4">
      <div className="flex justify-between gap-5">
        <h1 className="text-2xl font-bold tracking-wide">Unassigned Users</h1>
      </div>

      {loadingUnassignedUsers ? (
        <div>
          <span className="loading loading-bars loading-xl"></span>
        </div>
      ) : (
        <div className="flex flex-wrap justify-start w-full gap-3">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <Link
                key={index}
                className="relative h-max bg-white rounded-lg shadow-lg shadow-gray-600 text-black p-4 py-7 flex flex-col justify-center items-center cursor-pointer transform hover:-translate-y-2 transition-all duration-75 font-medium text-lg w-50"
                to={`/trainer/assign-user/${user._id}`}
              >
                <img
                  src={user.image || defaultUserImage}
                  alt={user.name}
                  className="size-30 rounded-full mb-2"
                />
                <h1>{user.name}</h1>
                <p className="font-light">{user.gender}</p>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-lg mt-4">No users found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UnassignedUsers;
