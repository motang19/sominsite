import React, { useEffect, useMemo, useRef, useState } from 'react';
import './OpenJournal.css';
import RibbonBookmarks from './RibbonBookmarks.jsx';
import remoImage from './Remo.png';
import remo2Image from './Remo2.png';
import remo3Image from './Remo3.png';
import remo4Image from './Remo4.png';
import remo5Image from './Remo5.png';
import remo6Image from './Remo6.png';
import remo7Image from './Remo7.png';
import remo8Video from './Remo8.mp4';
import remo9Image from './Remo9.png';
import remo10Image from './Remo10.png';
import remo11Image from './Remo11.png';
import remo12Image from './Remo12.png';
import mannLabPdf from './MANN LAB (3)-combined.pdf';

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
      image: remoImage,
      title: "Remo",
      text: "",
      fullBleed: true,
      button: {
        href: "https://www.jacc.org/doi/full/10.1016/j.jacadv.2024.101196",
        position: { bottom: "8%", right: "39%" }
      }
    }
  },
  {
    left: {
      image: remo6Image,
      title: "Remo 6",
      text: "",
      fullBleed: true,
      button: {
        href: mannLabPdf,
        label: "Open PDF",
        position: { top: "0%", right: "25%" }
      }
    },
    right: {
      image: remo2Image,
      title: "Remo 2",
      text: "",
      fullBleed: true,
      button: {
        href: "https://www.mdpi.com/2077-0383/14/20/7438",
        position: { top: "4%", right: "3.5%" }
      }
    }
  },
  {
    left: {
      image: remo3Image,
      title: "Remo 3",
      text: "",
      fullBleed: true,
      button: {
        href: "https://ieeexplore.ieee.org/abstract/document/11078963",
        position: { bottom: "11%", right: "28%" }
      }
    },
    right: {
      image: remo4Image,
      title: "Remo 4",
      text: "",
      fullBleed: true,
      button: {
        href: "https://openreview.net/pdf?id=QvuG2h28GP",
        position: { bottom: "0%", right: "41%" }
      }
    }
  },
  {
    left: {
      image: remo5Image,
      title: "Remo 5",
      text: "",
      fullBleed: true
    },
    right: {
      image: remo7Image,
      title: "Remo 7",
      text: "",
      fullBleed: true
    }
  },
  {
    left: {
      image: "/images/projects-left.jpg",
      title: "Projects",
      text: "Project highlights coming soon...",
    },
    right: {
      video: remo8Video,
      title: "Remo 8",
      text: "",
      fullBleed: true
    }
  },
  {
    left: {
      image: remo9Image,
      title: "Remo 9",
      text: "",
      fullBleed: true
    },
    right: {
      image: remo10Image,
      title: "Remo 10",
      text: "",
      fullBleed: true
    }
  },
  {
    left: {
      image: remo11Image,
      title: "Remo 11",
      text: "",
      fullBleed: true
    },
    right: {
      image: remo12Image,
      title: "Remo 12",
      text: "",
      fullBleed: true,
      button: {
        href: "https://journals.lww.com/ccmjournal/citation/2025/01001/1553__evaluation_of_machine_learning_model_drift.1506.aspx",
        position: { bottom: "2%", right: "40%" }
      }
    }
  },
  {
    left: {
      image: "/images/projects-right.jpg",
      title: "Projects (cont'd)",
      text: "More project details coming soon...",
    },
    right: {}
  },
];

const PageContent = ({ page }) => {
  if (!page) return null;

  const renderMedia = () => {
    if (page.video) {
      return (
        <video
          className={`page-video${page.fullBleed ? ' fullbleed' : ''}`}
          src={page.video}
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
        />
      );
    }
    return (
      <img
        src={page.image}
        className={`page-image${page.fullBleed ? ' fullbleed' : ''}`}
        alt={page.title || 'Page image'}
        draggable="false"
      />
    );
  };

  const renderButton = () => {
    if (!page.button) return null;
    const { href, label = 'Read paper', position = {} } = page.button;
    return (
      <a
        className="page-button"
        href={href}
        target="_blank"
        rel="noreferrer"
        style={position}
      >
        {label}
      </a>
    );
  };

  if (page.fullBleed) {
    return (
      <div className="page-inner fullbleed">
        {renderMedia()}
        {renderButton()}
      </div>
    );
  }
  return (
    <div className="page-inner">
      {renderMedia()}
      <h2 className="page-title">{page.title}</h2>
      <p className="page-text">{page.text}</p>
      {renderButton()}
    </div>
  );
};

const OpenJournal = ({ onBack }) => {
  const [loading, setLoading] = useState(true);
  const pages = useMemo(
    () =>
      spreads.flatMap((spread) => [
        { ...spread.left },
        { ...spread.right },
      ]),
    []
  );
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('');
  const preloadersRef = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const videoSources = spreads
      .flatMap((spread) => [spread.left?.video, spread.right?.video])
      .filter(Boolean);

    preloadersRef.current = videoSources.map((src) => {
      const video = document.createElement('video');
      video.src = src;
      video.preload = 'auto';
      video.muted = true;
      video.playsInline = true;
      video.load();
      return video;
    });

    return () => {
      preloadersRef.current.forEach((video) => {
        video.pause();
        video.removeAttribute('src');
        video.load();
      });
      preloadersRef.current = [];
    };
  }, []);

  const leftPageIndex = currentSpread * 2;
  const rightPageIndex = currentSpread * 2 + 1;
  const leftPage = pages[leftPageIndex];
  const rightPage = pages[rightPageIndex];

  const nextPage = () => {
    if (currentSpread < spreads.length - 1 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('next');
      setTimeout(() => {
        setCurrentSpread((prev) => prev + 1);
        setIsFlipping(false);
        setFlipDirection('');
      }, 1200);
    }
  };

  const prevPage = () => {
    if (currentSpread > 0 && !isFlipping) {
      setIsFlipping(true);
      setFlipDirection('prev');
      setTimeout(() => {
        setCurrentSpread((prev) => prev - 1);
        setIsFlipping(false);
        setFlipDirection('');
      }, 1200);
    }
  };

  const goToPage = (pageIndex) => {
    if (isFlipping || pageIndex === leftPageIndex || pageIndex === rightPageIndex) return;
    const targetSpread = Math.floor(pageIndex / 2);
    setIsFlipping(true);
    setFlipDirection(targetSpread > currentSpread ? 'next' : 'prev');
    setTimeout(() => {
      setCurrentSpread(targetSpread);
      setIsFlipping(false);
      setFlipDirection('');
    }, 1200);
  };

  if (loading) {
    return (
      <div className="openjournal-container">
        <button className="back-link" onClick={onBack} type="button">
          Back
        </button>
        <div className="opening-banner">Opening the journal...</div>
      </div>
    );
  }

  return (
    <div className="openjournal-container">
      <button className="back-link" onClick={onBack} type="button">
        Back
      </button>
      <div className="open-book simple">
        <RibbonBookmarks
          chapters={[
            { icon: '1', label: 'About me', spread: 0, color: '#FF6D7A' },
            { icon: '2', label: 'Research', spread: 1, color: '#FFC84A' },
            { icon: '3', label: 'Projects', spread: 5, color: '#6AC7FF' },
            { icon: '4', label: 'Art', spread: 1, color: '#7DDE92' },
            { icon: '5', label: 'Travel', spread: 4, color: '#FB8C00' },
          ]}
          onSelect={(spread) => {
            const targetPage = spread * 2;
            goToPage(targetPage);
          }}
        />
        <div className="page left-simple">
          <div className="page-rect">
            <div className={`page-sheet${leftPage?.fullBleed ? ' fullbleed' : ''}`}>
              <PageContent page={leftPage} />
            </div>
            {isFlipping && flipDirection === 'prev' && (
              <div className={`page-sheet flip-left${leftPage?.fullBleed ? ' fullbleed' : ''}`} style={{ zIndex: 50 }}>
                <PageContent page={leftPage} />
              </div>
            )}
          </div>
        </div>
        <div className="spine-simple" />
        <div className="page right-simple">
          <div className="page-rect">
            <div className={`page-sheet${rightPage?.fullBleed ? ' fullbleed' : ''}`}>
              <PageContent page={rightPage} />
            </div>
            {isFlipping && flipDirection === 'next' && (
              <div className={`page-sheet flip-right${rightPage?.fullBleed ? ' fullbleed' : ''}`} style={{ zIndex: 50 }}>
                <PageContent page={rightPage} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="book-nav" aria-label="Journal navigation">
        <button
          className="book-nav-button"
          onClick={prevPage}
          disabled={isFlipping || currentSpread === 0}
          type="button"
        >
          Previous
        </button>
        <button
          className="book-nav-button"
          onClick={nextPage}
          disabled={isFlipping || currentSpread >= spreads.length - 1}
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OpenJournal;
