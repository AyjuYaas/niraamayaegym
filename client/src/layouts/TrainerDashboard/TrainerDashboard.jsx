import AddUser from "./components/AddUser";
import Users from "./components/Users";

const TrainerDashboard = () => {
  return (
    <div className="min-h-screen h-max w-full flex flex-col bg-black pt-20">
      <Users />
      <AddUser />
    </div>
  );
};
export default TrainerDashboard;
