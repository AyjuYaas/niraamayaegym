import { useParams } from "react-router-dom";
import { useTrainerHook } from "../../hook/TrainerHook";
import { useEffect } from "react";

const AddUserTask = () => {
  const { userId } = useParams();
  const { userDetails, loadingUserDetails, getUserDetails } = useTrainerHook();

  useEffect(() => {
    getUserDetails(userId);
  }, [getUserDetails, userId]);

  return (
    <div className="pt-20 min-h-screen bg-black flex justify-center items-center">
      {loadingUserDetails ? (
        <span className="loading loading-dots size-20"></span>
      ) : (
        <div>
          <h1>{userDetails.name}</h1>
        </div>
      )}
    </div>
  );
};
export default AddUserTask;
