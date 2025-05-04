import defaultUserImage from "/default-user.jpg";

const UserProfile = ({ user }) => {
  return (
    <div className="flex items-center gap-3">
      <img
        src={user.profilePic || defaultUserImage}
        alt={user.name}
        className="size-25 rounded-full"
      />
      <div className="text-lg">
        <h1>{user.name}</h1>
        <div className="text-gray-400 text-sm">
          <p>
            <span className="font-bold">Height:</span> {user.height}
          </p>
          <p>
            <span className="font-bold">Weight: </span>
            {user.weight}
          </p>
          <p>
            <span className="font-bold">Age: </span>
            {user.age}
          </p>
          <p>
            <span className="font-bold">Gender: </span>
            {user.gender}
          </p>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
