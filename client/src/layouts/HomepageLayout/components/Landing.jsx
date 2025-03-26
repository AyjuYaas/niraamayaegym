const Landing = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen min-h-150 justify-center lg:justify-around items-center gap-10 relative p-10">
      <img
        src="/homepage/LandingBackground.jpg"
        alt="landing-background"
        className="w-full h-full object-cover object-top absolute -z-10 select-none"
      />

      <div className="absolute inset-0 bg-black/80 -z-9"></div>

      <div className="flex flex-col gap-6">
        <span className="font-extrabold text-5xl md:text-8xl text-white text-center">
          <span className="text-second">Niraamayae</span> Gym Assistance
        </span>
        <span className="text-2xl md:text-3xl font-light text-center 2xl:text-start text-second">
          Your Personal Gym Coach, Anytime, Anywhere
        </span>
      </div>
    </div>
  );
};
export default Landing;
