import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function CounterAuto() {
  const [count, setCount] = useState(0);
  const [autoIncrement, setAutoIncrement] = useState(false);

  useEffect(() => {
    let intervalId;

    if (autoIncrement) {
      intervalId = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [autoIncrement]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="card p-5 shadow-lg border-0 text-center" style={{ minWidth: 350 }}>
        <h3 className="mb-4">Counter</h3>

        <motion.div
          key={count}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="display-4 fw-bold mb-4 text-primary"
        >
          {count}
        </motion.div>

        <div className="btn-group mb-4">
          <button className="btn btn-outline-danger" onClick={() => setCount(count - 1)}>
            <i className="bi bi-dash-circle me-1"></i> Decrement
          </button>
          <button className="btn btn-outline-success" onClick={() => setCount(count + 1)}>
            <i className="bi bi-plus-circle me-1"></i> Increment
          </button>
          <button className="btn btn-outline-secondary" onClick={() => setCount(0)}>
            <i className="bi bi-arrow-counterclockwise me-1"></i> Reset
          </button>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          className={`btn ${autoIncrement ? "btn-warning" : "btn-primary"} px-4`}
          onClick={() => setAutoIncrement(!autoIncrement)}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={autoIncrement ? "stop" : "start"}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {autoIncrement ? "⏹ Stop Auto-Increment" : "▶ Start Auto-Increment"}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
