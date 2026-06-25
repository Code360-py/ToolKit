import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function ClockCard() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(
      () => setTime(new Date()),
      1000
    );

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="glass-card mb-4 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <i className="bi bi-clock-history clock-icon"></i>

      <h2>Digital Clock</h2>

      <div className="clock-display">
        {time.toLocaleTimeString()}
      </div>

      <div className="date-display mt-3">
        <i className="bi bi-calendar3 me-2"></i>

        {time.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>
    </motion.div>
  );
}

export default ClockCard;
