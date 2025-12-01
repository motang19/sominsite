import React, { useEffect, useRef, useState } from "react";
import "./SingleBook.css";

const PAGE_COUNT = 10; // 8–12 layered pages per side

const SingleBook = () => {
  const [stage, setStage] = useState("closed");
  const magicTimer = useRef(null);

  useEffect(() => {
    if (stage === "opening") {
      magicTimer.current = window.setTimeout(() => setStage("magic"), 1100); // 0.9s cover + 0.2s fan delay
    }
    return () => {
      if (magicTimer.current) {
        window.clearTimeout(magicTimer.current);
        magicTimer.current = null;
      }
    };
  }, [stage]);

  const handleClick = () => {
    if (stage !== "closed") return;
    setStage("opening");
  };

  return (
    <div className="single-book-scene">
      <div className={`book stage-${stage}`} onClick={handleClick}>
        <div className="cover front">Somin's Diary</div>
        <div className="spine"></div>
        <div className="pages left">
          {Array.from({ length: PAGE_COUNT }).map((_, index) => (
            <div className="page" key={`left-${index}`} style={{ "--index": index }} />
          ))}
        </div>
        <div className="pages right">
          {Array.from({ length: PAGE_COUNT }).map((_, index) => (
            <div className="page" key={`right-${index}`} style={{ "--index": index }} />
          ))}
        </div>
        <div className="cover back"></div>
      </div>
    </div>
  );
};

export default SingleBook;
