const Landing = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen min-h-150 justify-center lg:justify-around items-center gap-10 relative p-10">
      <img
        src="/trainer.jpg"
        alt=""
        className="w-full h-full object-cover object-top absolute -z-10"
      />

      <div className="absolute inset-0 bg-black/80 -z-9"></div>

      <div className="flex flex-col gap-6">
        <h1 className="font-extrabold text-5xl md:text-8xl text-white text-center">
          Nirmaya Gym Assistance
        </h1>
        <p className="text-2xl md:text-3xl font-light text-center xl:text-start">
          Your Personal Gym Coach, Anytime, Anywhere
        </p>
      </div>
    </div>
  );
};
export default Landing;
