import React from "react";
import { FaChartLine, FaTasks, FaUserCheck } from "react-icons/fa";

const keyFeatures = [
  {
    heading: "Smart Task Assignment",
    content:
      "Assign workouts in seconds and track with structured, goal-oriented plans.",
    icon: <FaTasks className="w-12 h-12 mx-auto mb-4 text-blue-500" />,
  },
  {
    heading: "Real-Time Progress Tracking",
    content:
      "Mark tasks as you complete. Celebrate wins and adjust plans effortlessly.",
    icon: <FaChartLine className="w-12 h-12 mx-auto mb-4 text-green-500" />,
  },
  {
    heading: "Personalized Workouts",
    content:
      "Tailored plans for every client—beginners to pros. Fitness that fits like a glove.",
    icon: <FaUserCheck className="w-12 h-12 mx-auto mb-4 text-purple-500" />,
  },
];

export default keyFeatures;
