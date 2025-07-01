import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

export default function BackButton() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button onClick={handleBack} className="btn">
      <IoMdArrowBack className="size-5 font-bold" />
    </button>
  );
}
