const WhyUs = () => {
  return (
    <div className="h-max bg-white text-black flex flex-col justify-center items-center p-10 gap-15 py-20">
      <h1 className="font-extrabold text-5xl md:text-7xl text-center tracking-wide">
        Why <span className="text-second">Us?</span>
      </h1>
      <p className="text-2xl md:text-3xl font-light text-center leading-10 md:leading-15">
        At Niraamayae Gym Assistance, we believe fitness is more than just
        workouts—it's a lifestyle. We are not just your assistance; we are a
        whole community dedicated to helping you achieve your fitness goals,
        stay motivated, and connect with like-minded individuals.
      </p>

      <button className="px-15 py-8 md:px-20 md:py-10  relative z-2 bg-black text-white font-extrabold text-2xl md:text-3xl cursor-pointer border-5 hover:bg-second hover:-translate-y-2 transition-all duration-250 ease-in-out">
        Join Our Community
      </button>
    </div>
  );
};
export default WhyUs;
