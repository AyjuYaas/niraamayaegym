import { MdPersonSearch } from "react-icons/md";

const MeetOurTrainer = () => {
  return (
    <div className="h-max bg-white text-black flex flex-col justify-center items-center p-10 gap-15 py-20">
      <h1 className="font-extrabold text-5xl md:text-7xl text-center tracking-wide w-full">
        Meet Our <span className="text-second">Trainer</span>
      </h1>

      <div className="flex gap-10 justify-between items-start flex-wrap h-max">
        <div className="flex flex-col w-110 gap-2 h-full justify-center items-center">
          <div className="relative">
            <img
              src="/homepage/Trainer.jpg"
              alt="Trainer-img"
              className="size-90 object-cover border-2 border-gray-400"
            />
            <button className="bg-second size-15 cursor-pointer flex justify-center items-center absolute right-5 bottom-5 text-white hover:bg-black duration-200">
              <MdPersonSearch size={30} />
            </button>
          </div>
          <h1 className="font-bold text-4xl">Falano Falano</h1>

          <span className="font-medium text-2xl text-center text-gray-600">
            Personal Trainer
          </span>
        </div>
      </div>
    </div>
  );
};
export default MeetOurTrainer;
