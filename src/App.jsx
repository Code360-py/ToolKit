import { useState } from "react";

import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import ClockCard from "./components/ClockCard";
import CalculatorCard from "./components/CalculatorCard";
import CameraCard from "./components/CameraCard";
import Footer from "./components/Footer";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("light-theme");
  };

  return (
    <div className="app-bg">
      {/* Animated Background */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="bg-shape shape-3"></div>

      <div className="container py-5">
        {/* Theme Switch */}
        <ThemeToggle
          darkMode={darkMode}
          toggleTheme={toggleTheme}
        />

        {/* Header */}
        <Header />

        <div className="row justify-content-center">
          <div className="col-lg-8">

            {/* Clock */}
            <ClockCard />

            {/* Calculator */}
            <CalculatorCard />

            {/* Camera */}
            <div id="camera">
              <CameraCard />
            </div>

          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>

      {/* Floating Camera Shortcut */}
      <a
        href="#camera"
        className="camera-shortcut"
        title="Open Camera"
      >
        <i className="bi bi-camera-fill"></i>
      </a>
    </div>
  );
}

export default App;
