import { useState } from "react";
import { evaluate } from "mathjs";
import { motion } from "framer-motion";

function CalculatorCard() {
  const [display, setDisplay] = useState("");

  const append = (value) => {
    setDisplay((prev) => prev + value);
  };

  const clear = () => setDisplay("");

  const del = () => {
    setDisplay((prev) => prev.slice(0, -1));
  };

  const calculate = () => {
    try {
      setDisplay(
        evaluate(display).toString()
      );
    } catch {
      setDisplay("Error");
    }
  };

  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+"
  ];

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h3 className="text-center mb-4">
        <i className="bi bi-calculator me-2"></i>
        Calculator
      </h3>

      <input
        className="form-control calc-display mb-3"
        value={display}
        readOnly
      />

      <div className="row g-2">
        <div className="col-6">
          <button
            className="btn btn-danger w-100 calc-btn"
            onClick={clear}
          >
            AC
          </button>
        </div>

        <div className="col-6">
          <button
            className="btn btn-warning w-100 calc-btn"
            onClick={del}
          >
            DEL
          </button>
        </div>

        {buttons.map((btn) => (
          <div className="col-3" key={btn}>
            <button
              className={`btn w-100 calc-btn ${
                btn === "="
                  ? "btn-success"
                  : "btn-outline-light"
              }`}
              onClick={() =>
                btn === "="
                  ? calculate()
                  : append(btn)
              }
            >
              {btn}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default CalculatorCard;
