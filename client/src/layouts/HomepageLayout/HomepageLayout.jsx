import Landing from "./components/Landing";
import WhyUs from "./components/WhyUs";
import KeyFeatures from "./components/KeyFeatures";
import MeetOurTrainer from "./components/MeetOurTrainer";
import Footer from "../../components/Footer";

const HomepageLayout = () => {
  return (
    <div>
      <Landing />
      <WhyUs />
      <KeyFeatures />
      <MeetOurTrainer />
      <Footer />
    </div>
  );
};
export default HomepageLayout;
