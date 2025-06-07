import React, { useEffect, useState } from "react";
import { BsArrowUp } from "react-icons/bs";
import "../assets/css/scrolling.css"
import "../App.css"; 

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="scroll-to-top fade-in"
        aria-label="Scroll to top"
      >
        <BsArrowUp />
      </button>
    )
  );
};

export default ScrollToTopButton;
