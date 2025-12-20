import React, { useEffect, useMemo, useRef, useState } from 'react';
import './OpenJournal.css';
import RibbonBookmarks from './RibbonBookmarks.jsx';
import aboutme from './AboutMe.png';
import aboutme2 from './AboutMe2.png';
import remo0Image from './Remo0.png';
import remoImage from './Remo.png';
import remo2Image from './Remo2.png';
import remo3Image from './Remo3.png';
import remo4Image from './Remo4.png';
import remo5Image from './Remo5.png';
import remo6Image from './Remo6.png';
import remo7Image from './Remo7.png';
import remo7_5Image from './Remo7_5.png';
import remo8Video from './Remo8.mp4';
import remo9Image from './Remo9.png';
import remo10Image from './Remo10.png';
import remo11Image from './Remo11.png';
import remo12Image from './Remo12.png';
import mannLabPdf from './MANN LAB (3)-combined.pdf';

const spreads = [
  {
    left: {
      image: aboutme,
      title: "AboutMe",
      text: "",
      fullBleed: true
    },
    right: {
      image: aboutme2,
      title: "AboutMe2",
      text: "",
      fullBleed: true
    }
  },
  {
    left: {
      image: remo0Image,
      title: "Remo0",
      text: "",
      fullBleed: true,
      buttons: [
        {
          label: "1",
          color: "#FAD3E6",
          pageIndex: 3,
          position: { top: "13%", left: "19%" },
        },
        {
          label: "2",
          color: "#B8D8FF",
          pageIndex: 4,
          position: { top: "26%", left: "19%" },
        },
        {
          label: "3",
          color: "#C8F7C5",
          pageIndex: 5,
          position: { top: "39%", left: "19%" },
        },
        {
          label: "4",
          color: "#FFD8A8",
          pageIndex: 6,
          position: { top: "50%", left: "19%" },
        },
        {
          label: "5",
          color: "#DCC6F8",
          pageIndex: 7,
          position: { top: "63%", left: "19%" },
        },
        {
          label: "6",
          color: "#A5F0FF",
          pageIndex: 8,
          position: { top: "74%", left: "19%" },
        },
        {
          label: "7",
          color: "#FFF7BA",
          pageIndex: 9,
          position: { top: "87%", left: "19%" },
        },
      ],
    },
    right: {
      image: remoImage,
      title: "Remo",
      text: "",
      fullBleed: true,
      button: {
        href: "https://www.jacc.org/doi/full/10.1016/j.jacadv.2024.101196",
        position: { bottom: "11%", right: "39%" }
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
        position: { top: "3%", right: "24%" }
      }
    },
    right: {
      image: remo2Image,
      title: "Remo 2",
      text: "",
      fullBleed: true,
      button: {
        href: "https://www.mdpi.com/2077-0383/14/20/7438",
        position: { top: "7%", right: "2%" }
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
        position: { bottom: "14%", right: "27%" }
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
      image: remo7_5Image,
      title: "Remo7_5",
      text: "",
      fullBleed: true,
       buttons: [
        {
          label: "1",
          color: "#FAD3E6",
          pageIndex: 11,
          position: { top: "13%", left: "19%" },
        },
        {
          label: "2",
          color: "#B8D8FF",
          pageIndex: 12,
          position: { top: "28%", left: "19%" },
        },
        {
          label: "3",
          color: "#C8F7C5",
          pageIndex: 13,
          position: { top: "40%", left: "19%" },
        },
        {
          label: "4",
          color: "#FFD8A8",
          pageIndex: 14,
          position: { top: "57%", left: "19%" },
        },
        {
          label: "5",
          color: "#DCC6F8",
          pageIndex: 15,
          position: { top: "73%", left: "19%" },
        },
      ],
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
        position: { bottom: "5%", right: "40%" }
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

const PageContent = ({ page, goToPage, bookScale }) => {
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

  const renderButtons = () => {
    const buttons = page.buttons || (page.button ? [page.button] : []);
    if (!buttons.length) return null;

    return buttons.map((button, idx) => {
      const {
        href,
        label = 'Read paper',
        position = {},
        color,
        pageIndex,
      } = button;
      const style = { ...position, '--btn-scale': bookScale };
      if (color) {
        style['--button-bg'] = color;
      }

      if (typeof pageIndex === 'number' && goToPage) {
        return (
          <button
            key={`${page.title || 'page'}-btn-${idx}`}
            className="page-button"
            type="button"
            style={style}
            onClick={() => goToPage(pageIndex)}
          >
            {label}
          </button>
        );
      }

      return (
        <a
          key={`${page.title || 'page'}-btn-${idx}`}
          className="page-button"
          href={href}
          target="_blank"
          rel="noreferrer"
          style={style}
        >
          {label}
        </a>
      );
    });
  };

  if (page.fullBleed) {
    return (
      <div className="page-inner fullbleed">
        {renderMedia()}
        {renderButtons()}
      </div>
    );
  }
  return (
    <div className="page-inner">
      {renderMedia()}
      <h2 className="page-title">{page.title}</h2>
      <p className="page-text">{page.text}</p>
      {renderButtons()}
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
  const [bookScale, setBookScale] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const updateScale = () => {
      if (typeof window === 'undefined') return;
      const widthScale = window.innerWidth / 1400;
      const heightScale = window.innerHeight / 900;
      const nextScale = Math.max(0.6, Math.min(widthScale, heightScale, 1));
      setBookScale(nextScale);
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
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
      <div className="openjournal-container" style={{ '--book-scale': bookScale }}>
        <button className="back-link" onClick={onBack} type="button">
          Back
        </button>
        <div className="opening-banner">Opening the journal...</div>
      </div>
    );
  }

  return (
    <div className="openjournal-container" style={{ '--book-scale': bookScale }}>
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
              <PageContent page={leftPage} goToPage={goToPage} bookScale={bookScale} />
            </div>
            {isFlipping && flipDirection === 'prev' && (
              <div className={`page-sheet flip-left${leftPage?.fullBleed ? ' fullbleed' : ''}`} style={{ zIndex: 50 }}>
                <PageContent page={leftPage} goToPage={goToPage} bookScale={bookScale} />
              </div>
            )}
          </div>
        </div>
        <div className="spine-simple" />
        <div className="page right-simple">
          <div className="page-rect">
            <div className={`page-sheet${rightPage?.fullBleed ? ' fullbleed' : ''}`}>
              <PageContent page={rightPage} goToPage={goToPage} bookScale={bookScale} />
            </div>
            {isFlipping && flipDirection === 'next' && (
              <div className={`page-sheet flip-right${rightPage?.fullBleed ? ' fullbleed' : ''}`} style={{ zIndex: 50 }}>
                <PageContent page={rightPage} goToPage={goToPage} bookScale={bookScale} />
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
