import useClickOutside from "../../../hook/useClickOutside";
import { CgUnavailable } from "react-icons/cg";
import YouTubePreviewCard from "./YouTubePreviewCard";
import { IoMdClose } from "react-icons/io";

const ExerciseDetails = ({ exercise, close }) => {
  const ref = useClickOutside(close);
  return (
    <div className="fixed backdrop-blur-lg top-0 left-0 z-40 w-full h-screen flex justify-center items-center py-5">
      <div
        className="bg-gray-900 cursor-default text-white p-5 rounded-lg min-w-90 max-w-140 relative m-5 max-h-full h-max overflow-y-auto border-3 border-gray-800"
        ref={ref}
      >
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-xl text-second font-bold">
              All About {exercise.name}
            </h1>
          </div>

          <div>
            <h1 className="font-bold text-gray-200">Targeted Body Part:</h1>
            <p className="capitalize text-gray-300">{exercise.bodyPart}</p>
          </div>

          <div>
            <h1 className="font-bold text-gray-200">About the Exercise:</h1>
            <p className="text-gray-300">{exercise.description}</p>
          </div>

          <div>
            <h1 className="font-bold text-gray-200 mb-2">Videos:</h1>
            {exercise.videos.length === 0 ? (
              <div className="flex items-center">
                <CgUnavailable />
                <p>Sorry, no videos at the moment</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 ">
                {exercise.videos.map((video, index) => (
                  <div key={index}>
                    <YouTubePreviewCard url={video} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div
          className="absolute top-2 right-2 cursor-pointer bg-red-700 hover:bg-red-500"
          onClick={(e) => {
            e.stopPropagation();
            close();
          }}
        >
          <IoMdClose size={25} />
        </div>
      </div>
    </div>
  );
};
export default ExerciseDetails;
