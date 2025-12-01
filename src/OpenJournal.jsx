import React, { useEffect, useState } from 'react';
import './OpenJournal.css';
import RibbonBookmarks from './RibbonBookmarks.jsx';

const spreads = [
  {
    left: {
      image: "/images/pg1-left.jpg",
      title: "Beginning",
      text: "This is a placeholder for a long paragraph... (add your own content)\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque commodo..."
    },
    right: {
      image: "/images/pg1-right.jpg",
      title: "Childhood",
      text: "Another long placeholder paragraph for page 2... Lorem ipsum dolor sit amet..."
    }
  },
  {
    left: {
      image: "/images/pg2-left.jpg",
      title: "Identity",
      text: "A long reflection about identity... Pellentesque orci odio, tincidunt vitae..."
    },
    right: {
      image: "/images/pg2-right.jpg",
      title: "Creativity",
      text: "This page describes creativity... Nulla facilisi. Sed nec magna ut velit..."
    }
  },
  {
    left: {
      image: "/images/pg3-left.jpg",
      title: "Early Engineering",
      text: "Long text text text text..."
    },
    right: {
      image: "/images/pg3-right.jpg",
      title: "Health & AI",
      text: "Health tech journey content..."
    }
  },
  {
    left: {
      image: "/images/pg4-left.jpg",
      title: "Projects",
      text: "Project content..."
    },
    right: {
      image: "/images/pg4-right.jpg",
      title: "More Projects",
      text: "Project details..."
    }
  },
  {
    left: {
      image: "/images/pg5-left.jpg",
      title: "Travel",
      text: "Travel reflections..."
    },
    right: {
      image: "/images/pg5-right.jpg",
      title: "France",
      text: "Paris + Monet Garden memories..."
    }
  },
  {
    left: {
      image: "/images/pg6-left.jpg",
      title: "Boston",
      text: "Boston experiences with Max..."
    },
    right: {
      image: "/images/pg6-right.jpg",
      title: "Vancouver",
      text: "Winter memories..."
    }
  },
  {
    left: {
      image: "/images/pg7-left.jpg",
      title: "MIT",
      text: "MIT Critical Data story..."
    },
    right: {
      image: "/images/pg7-right.jpg",
      title: "SNU",
      text: "SNU robotics story..."
    }
  },
  {
    left: {
      image: "/images/pg8-left.jpg",
      title: "Dojo House",
      text: "Your community reflections..."
    },
    right: {
      image: "/images/pg8-right.jpg",
      title: "Mentorship",
      text: "Mentor reflections..."
    }
  },
  {
    left: {
      image: "/images/pg9-left.jpg",
      title: "Philosophy",
      text: "Your reflective writing themes..."
    },
    right: {
      image: "/images/pg9-right.jpg",
      title: "Future",
      text: "Your goals..."
    }
  },
  {
    left: {
      image: "/images/pg10-left.jpg",
      title: "Closing",
      text: "Final reflections..."
    },
    right: {
      image: "/images/pg10-right.jpg",
      title: "Thank You",
      text: "End page..."
    }
  },
];

const PageContent = ({ page }) => {
  if (!page) return null;
  return (
    <div className="page-inner">
      <img src={page.image} className="page-image" alt={page.title} />
      <h2 className="page-title">{page.title}</h2>
      <p className="page-text">{page.text}</p>
    </div>
  );
};

const OpenJournal = ({ onBack }) => {
  const [loading, setLoading] = useState(true);
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [turning, setTurning] = useState(null); // "next" | "prev" | null
  const [frozenLeft, setFrozenLeft] = useState(null);
  const [frozenRight, setFrozenRight] = useState(null);
  const currentIndexRef = React.useRef(0);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    currentIndexRef.current = spreadIndex;
  }, [spreadIndex]);

  if (loading) {
    return (
      <div className="openjournal-container">
        <button className="back-link" onClick={onBack} type="button">
          ← Back
        </button>
        <div className="opening-banner">Opening the journal...</div>
      </div>
    );
  }

  return (
    <div className="openjournal-container">
      <RibbonBookmarks
        chapters={[
          { icon: '❤️', spread: 0, color: '#FF6D7A' },
          { icon: '💡', spread: 2, color: '#FFC84A' },
          { icon: '🧪', spread: 4, color: '#6AC7FF' },
          { icon: '🌍', spread: 6, color: '#7DDE92' },
          { icon: '✨', spread: 8, color: '#C59CFF' },
        ]}
        onSelect={(target) => {
          if (turning) return;
          const flipForward = () => {
            setFrozenRight(spreads[currentIndexRef.current].right);
            setFrozenLeft(spreads[currentIndexRef.current + 1]?.left ?? null);
            setTurning('next');
            setTimeout(() => {
              setSpreadIndex((p) => p + 1);
              setTurning(null);
              currentIndexRef.current = (currentIndexRef.current + 1);
              setFrozenLeft(null);
              setFrozenRight(null);
              if (currentIndexRef.current < target) {
                setTimeout(flipForward, 150);
              }
            }, 800);
          };
          const flipBackward = () => {
            setFrozenLeft(spreads[currentIndexRef.current].left);
            setFrozenRight(spreads[currentIndexRef.current - 1]?.right ?? null);
            setTurning('prev');
            setTimeout(() => {
              setSpreadIndex((p) => p - 1);
              setTurning(null);
              currentIndexRef.current = (currentIndexRef.current - 1);
              setFrozenLeft(null);
              setFrozenRight(null);
              if (currentIndexRef.current > target) {
                setTimeout(flipBackward, 150);
              }
            }, 800);
          };
          if (target > currentIndexRef.current) flipForward();
          else if (target < currentIndexRef.current) flipBackward();
        }}
      />
      <button className="back-link" onClick={onBack} type="button">
        ← Back
      </button>
      <div className="open-book simple">
        <div className="page left-simple">
          <div className={`page-rect ${turning === 'prev' ? 'turn-prev' : ''}`}>
            <div className="page-face front">
              <PageContent page={turning ? (frozenLeft || spreads[spreadIndex].left) : spreads[spreadIndex].left} />
            </div>
            <div className="page-face back">
              {spreadIndex > 0 ? (
                <PageContent page={turning ? (frozenRight || spreads[spreadIndex - 1].right) : spreads[spreadIndex - 1].right} />
              ) : null}
            </div>
          {spreadIndex > 0 && (
            <button
              className="page-nav-button prev"
              onClick={() => {
                if (turning) return;
                  setFrozenLeft(spreads[currentIndexRef.current].left);
                  setFrozenRight(spreads[currentIndexRef.current - 1]?.right ?? null);
                  setTurning('prev');
                  setTimeout(() => {
                    setSpreadIndex((p) => p - 1);
                    setTurning(null);
                    setFrozenLeft(null);
                    setFrozenRight(null);
                    currentIndexRef.current = Math.max(0, currentIndexRef.current - 1);
                  }, 800);
                }}
                type="button"
              >
                ◀ Previous
              </button>
            )}
          </div>
        </div>
        <div className="spine-simple" />
        <div className="page right-simple">
          <div className={`page-rect ${turning === 'next' ? 'turn-next' : ''}`}>
            <div className="page-face front">
              <PageContent page={turning ? (frozenRight || spreads[spreadIndex].right) : spreads[spreadIndex].right} />
              {spreadIndex < spreads.length - 1 && (
                <button
                  className="page-nav-button next"
                  onClick={() => {
                    if (turning) return;
                    setFrozenRight(spreads[currentIndexRef.current].right);
                    setFrozenLeft(spreads[currentIndexRef.current + 1]?.left ?? null);
                    setTurning('next');
                    setTimeout(() => {
                      setSpreadIndex((p) => p + 1);
                      setTurning(null);
                      setFrozenLeft(null);
                      setFrozenRight(null);
                      currentIndexRef.current = Math.min(spreads.length - 1, currentIndexRef.current + 1);
                    }, 800);
                  }}
                  type="button"
                >
                  Next ▶
                </button>
              )}
            </div>
            <div className="page-face back">
              {spreadIndex < spreads.length - 1 ? (
                <PageContent page={turning ? (frozenLeft || spreads[spreadIndex + 1].left) : spreads[spreadIndex + 1].left} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenJournal;
