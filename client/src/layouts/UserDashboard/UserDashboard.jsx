import { useState } from "react";
import UserProfile from "../../components/UserProfile";
import { useAuthHook } from "../../hook/useAuthHook";
import AssignedExercises from "./components/AssignedExercises";
import UpdatePassword from "./components/UpdatePassword";
import { FaSearch } from "react-icons/fa";
import BMICalculator from "./components/BMICalculator";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const { authUser } = useAuthHook();
  const [heightWeight, setHeightWeight] = useState(null);

  return (
    <div className="min-h-screen h-max w-full flex flex-col bg-black py-20 relative">
      {authUser.defaultId && <UpdatePassword name={authUser.name} />}

      <div className="self-center flex flex-col gap-2">
        <UserProfile user={authUser} />

        <button
          className="btn bg-second font-bold hover:bg-second-hi"
          onClick={() =>
            setHeightWeight({
              height: authUser.height,
              weight: authUser.weight,
            })
          }
        >
          Update Height and Weight
        </button>
      </div>

      <div>
        <AssignedExercises />
      </div>

      <Link
        to={"/user/search-exercises"}
        className="fixed bottom-5 right-5 p-4 bg-second hover:bg-second-hi duration-100 rounded-full cursor-pointer"
      >
        <FaSearch />
      </Link>

      {heightWeight && (
        <BMICalculator
          data={heightWeight}
          close={() => setHeightWeight(null)}
        />
      )}
    </div>
  );
};
export default UserDashboard;
