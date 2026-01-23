import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./scrollToTop.css";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button className="scroll-to-top" onClick={scrollToTop}>
        <FaArrowUp />
      </button>
    )
  );
};

export default ScrollToTop;
