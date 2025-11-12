import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function Fireworks({ winner }) {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!winner) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={300}
        recycle={false}
        gravity={0.3}
        colors={["#FFD700", "#FF4500", "#00CED1", "#ADFF2F"]}
      />
      
    </div>
  );
}
