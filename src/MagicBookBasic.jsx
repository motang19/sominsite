import React from "react";
import "./MagicBookBasic.css";

const MagicBookBasic = () => {
  return (
    <div className="magicbook-container">
      <div className="sparkles"></div>

      <div className="book">
        {/* Left Page Stack */}
        <div className="page-stack left-stack">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="page" style={{ "--i": i }}></div>
          ))}
        </div>

        {/* Spine */}
        <div className="spine"></div>

        {/* Right Page Stack */}
        <div className="page-stack right-stack">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="page" style={{ "--i": i }}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MagicBookBasic;
