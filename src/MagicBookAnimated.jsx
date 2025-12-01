import React, { useState } from "react";
import "./MagicBookAnimated.css";

const MagicBookAnimated = () => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="magicbook-container">
      <div className={`sparkles ${opened ? "burst" : ""}`}></div>

      <div
        className={`book ${opened ? "opened" : ""}`}
        onClick={() => setOpened(true)}
      >
        {/* Left Side */}
        <div className="page-stack left-stack">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="page" style={{ "--i": i }}></div>
          ))}
        </div>

        {/* Spine */}
        <div className="spine"></div>

        {/* Right Side */}
        <div className="page-stack right-stack">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="page" style={{ "--i": i }}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MagicBookAnimated;
