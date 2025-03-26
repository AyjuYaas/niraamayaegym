const KeyFeatures = () => {
  return (
    <div className="h-max bg-black text-white flex flex-col justify-center items-center p-10 gap-15 py-20">
      <h1 className="font-extrabold text-5xl md:text-7xl text-center lg:text-start tracking-wide w-full">
        Key <span className="text-second">Features</span>
      </h1>

      <div className="flex gap-10 justify-center lg:justify-between items-start flex-wrap h-max w-full">
        <div className="flex flex-col w-110 gap-4 h-full">
          <img
            src="/homepage/smart-task.jpg"
            alt="smart-task-img"
            className="w-80 sm:w-110 h-60 object-cover"
          />
          <h1 className="font-extrabold text-4xl">Smart Task Assignment</h1>

          <p className="font-light text-2xl">
            Assign workouts in seconds and track with structured, goal-oriented
            plans.
          </p>
        </div>

        <div className="flex flex-col w-110 gap-4 h-full">
          <img
            src="/homepage/real-time.jpg"
            alt="real-time-img"
            className="w-80 sm:w-110 h-60 object-cover"
          />
          <h1 className="font-extrabold text-4xl">
            Real-Time Progress Tracking
          </h1>

          <p className="font-light text-2xl">
            Mark tasks as you complete. Celebrate wins and adjust plans
            effortlessly.
          </p>
        </div>

        <div className="flex flex-col w-110 gap-4 h-full">
          <img
            src="/homepage/personalized.jpg"
            alt="personalized-img"
            className="w-80 sm:w-110 h-60 object-cover"
          />
          <h1 className="font-extrabold text-4xl">Personalized Workouts</h1>

          <p className="font-light text-2xl">
            Tailored plans for every client—beginners to pros. Fitness that fits
            like a glove.
          </p>
        </div>
      </div>
    </div>
  );
};
export default KeyFeatures;
