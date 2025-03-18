import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";

import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <div>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};
export default App;
