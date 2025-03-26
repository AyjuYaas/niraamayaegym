import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center text-4xl gap-5 bg-black font-extrabold">
      Page Not Found
      <Link
        className="bg-second p-3 w-max px-5 rounded-lg font-light hover:bg-second-hi duration-100"
        to="/"
      >
        Go Back
      </Link>
    </div>
  );
};
export default NotFound;
