import { useEffect } from "react";
import { useTrainerHook } from "../../../hook/useTrainerHook";
import SingleUser from "./SingleUser";

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
    <div className="flex flex-col gap-5 w-full px-4 mt-5">
      <div className="flex justify-between gap-5 self-center lg:self-start">
        <h1 className="text-2xl font-bold tracking-wide">Unassigned Users</h1>
      </div>

      {loadingUnassignedUsers ? (
        <div>
          <span className="loading loading-bars loading-xl"></span>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center lg:justify-start w-full gap-5">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <SingleUser user={user} key={index} />
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
