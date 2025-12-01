import React, { useState, useEffect } from "react";
import "./MagicBookStages.css";

const MagicBookStages = ({ onFinished, autoStart = true }) => {
  const [stage, setStage] = useState("closed"); // "closed" | "opening" | "magic"

  const startOpening = () => {
    if (stage !== "closed") return;
    setStage("opening");
    setTimeout(() => {
      setStage("magic");
      if (onFinished) onFinished();
    }, 1400);
  };

  const handleClick = () => {
    if (!autoStart) startOpening();
  };

  // auto-start the opening animation when mounted (after diary click)
  useEffect(() => {
    if (autoStart) startOpening();
  }, [autoStart]);

  return (
    <div className="book-scene">
      <div className={`book ${stage}`} onClick={handleClick}>
        <div className="page-stack left-stack">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="page" key={i} style={{ "--i": i }} />
          ))}
        </div>

        <div className="spine" />

        <div className="page-stack right-stack">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="page" key={i} style={{ "--i": i }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MagicBookStages;
