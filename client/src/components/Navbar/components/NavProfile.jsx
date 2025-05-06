import { Link } from "react-router-dom";
import { useAuthHook } from "../../../hook/useAuthHook";
import defaultUserProfilePic from "../images/default-user.jpg";
import defaultTrainerProfilePic from "../images/default-trainer.jpg";

const NavProfile = () => {
  const { authUser, authType, logout } = useAuthHook();

  return (
    <div className="navbar-end">
      {authUser ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={
                  authType === "user"
                    ? authUser.profilePic || defaultUserProfilePic
                    : defaultTrainerProfilePic
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {authType === "user" && (
              <li>
                <Link
                  to="/user/update-profile"
                  className="justify-between text-lg"
                >
                  Update Profile
                </Link>
              </li>
            )}
            <li>
              <button className="text-lg" onClick={() => logout()}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <Link
          to="/user/login"
          className="bg-base-300 border-1 border-white text-white py-2 px-6 text-xl rounded-lg font-bold hover:bg-second hover:border-second duration-200"
        >
          Login
        </Link>
      )}
    </div>
  );
};
export default NavProfile;
