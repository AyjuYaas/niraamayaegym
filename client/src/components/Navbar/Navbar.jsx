import { Link } from "react-router-dom";
import NavProfile from "./components/NavProfile";
import NavStart from "./components/NavStart";
import { useAuthHook } from "../../hook/AuthHook";

const Navbar = () => {
  const { authType } = useAuthHook();
  return (
    <div className="navbar bg-base-300 shadow-sm fixed z-10">
      <NavStart />

      {/* Navbar Logo  */}
      <div className="navbar-center hidden sm:inline-block">
        <Link
          to={
            authType === "user"
              ? "/user/dashboard"
              : authType === "trainer"
              ? "/trainer/dashboard"
              : "/"
          }
          className="btn btn-ghost text-2xl text-white font-extrabold tracking-wider"
        >
          Niraamayae
        </Link>
      </div>

      {/* Navbar Profile  */}
      <NavProfile />
    </div>
  );
};
export default Navbar;
