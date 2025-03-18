import { Link } from "react-router-dom";

const NavProfile = () => {
  return (
    <div className="navbar-end">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
            <Link to="/profile" className="justify-between text-lg">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/settings" className="text-lg">
              Settings
            </Link>
          </li>
          <li>
            <Link to="/logout" className="text-lg">
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default NavProfile;
