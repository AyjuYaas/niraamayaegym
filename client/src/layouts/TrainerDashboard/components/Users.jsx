import { useState } from "react";
import AssignedUsers from "./AssignedUsers";
import UnassignedUsers from "./UnassignedUsers";
import { MdPersonSearch } from "react-icons/md";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="flex flex-col h-max justify-start items-start gap-5">
      <div className="relative self-center w-full max-w-xs flex items-center justify-center">
        <MdPersonSearch className="absolute left-2 text-white size-6 z-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Users..."
          className="input w-full pl-10 border-0"
        />
      </div>
      <UnassignedUsers searchQuery={searchQuery} />
      <AssignedUsers searchQuery={searchQuery} />
    </div>
  );
};
export default Users;
