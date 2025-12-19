import React from "react";

const RibbonBookmarks = ({ chapters, onSelect }) => {
  return (
    <div className="ribbon-container">
      {chapters.map((ch, index) => (
        <button
          key={index}
          className="ribbon-bookmark"
          style={{ background: ch.color }}
          onClick={() => onSelect(ch.spread)}
        >
          <span className="ribbon-icon">{ch.icon}</span>
          {ch.label && <span className="ribbon-label">{ch.label}</span>}
        </button>
      ))}
    </div>
  );
};

export default RibbonBookmarks;
