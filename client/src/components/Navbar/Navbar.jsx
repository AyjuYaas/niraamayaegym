import NavProfile from "./NavProfile";
import NavStart from "./NavStart";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm fixed z-10">
      <NavStart />

      {/* Navbar Logo  */}
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl">Niramaya</a>
      </div>

      {/* Navbar Profile  */}
      <NavProfile />
    </div>
  );
};
export default Navbar;
