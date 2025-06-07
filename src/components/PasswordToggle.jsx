import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const getStrength = (password) => {
  if (!password) return "";
  if (password.length < 6) return "Weak";
  if (password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)) return "Strong";
  return "Moderate";
};

const getColor = (strength) => {
  switch (strength) {
    case "Weak":
      return "danger";
    case "Moderate":
      return "warning";
    case "Strong":
      return "success";
    default:
      return "";
  }
};

const PasswordInput = () => {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const strength = getStrength(password);
  const strengthColor = getColor(strength);

  return (
    <div>
      <div className="input-group mb-2">
        <input
          ref={inputRef}
          type={show ? "text" : "password"}
          className="form-control form-control-lg border-end-0"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-outline-secondary border-start-0"
          onClick={() => setShow((prev) => !prev)}
        >
          <AnimatePresence mode="wait">
            <motion.i
              key={show ? "eye-slash" : "eye"}
              className={`bi ${show ? "bi-eye-slash" : "bi-eye"}`}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
        </button>
      </div>

      {strength && (
        <div className="progress mb-2" style={{ height: "6px" }}>
          <div
            className={`progress-bar bg-${strengthColor}`}
            style={{
              width:
                strength === "Weak"
                  ? "33%"
                  : strength === "Moderate"
                  ? "66%"
                  : "100%",
            }}
          />
        </div>
      )}
      {strength && (
        <small className={`text-${strengthColor}`}>
          Password strength: {strength}
        </small>
      )}
    </div>
  );
};

export default PasswordInput;
