import Footer from "../../components/Footer";

const AboutLayout = () => {
  return (
    <div>
      <div className="flex flex-col lg:flex-row h-screen min-h-max justify-center lg:justify-around items-center gap-10 relative p-10 text-white bg-black">
        <div className="flex flex-col gap-10 items-start justify-center w-full">
          <div className="flex flex-col gap-3 p-10 rounded-xl shadow-2xl bg-black text-white w-auto md:w-200 self-start">
            <h1 className="font-extrabold text-2xl md:text-5xl text-start tracking-wide">
              <span className="text-second">About</span> Us
            </h1>
            <p className="text-2xl text-justify">
              Since 2012,{" "}
              <span className="font-medium text-second">Niraamayae</span> has
              been at the forefront of fitness innovation, helping individuals
              achieve their health and wellness goals. What started as a small
              gym with a big vision has now grown into a thriving community of
              fitness enthusiasts, trainers, and wellness experts.
            </p>
          </div>

          <div className="flex flex-col gap-3 p-10 rounded-xl shadow-2xl bg-black text-white w-auto md:w-200 self-end">
            <h1 className="font-extrabold text-2xl md:text-5xl text-end tracking-wide">
              Our <span className="text-second">Mission</span>
            </h1>
            <p className="text-2xl text-justify">
              Our mission has always been simple: to make fitness accessible,
              personalized, and enjoyable for everyone. Whether you're a
              beginner taking your first steps or a seasoned athlete{" "}
              <span className="text-second">pushing your limits</span>, Nirmaya
              is here to support you every step of the way.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default AboutLayout;
