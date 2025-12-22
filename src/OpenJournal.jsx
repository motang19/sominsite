import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
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
import remo13Image from './Remo13.png';
import remo14Image from './Remo14.png';
import remo15Image from './Remo15.png';
import remo16Image from './Remo16.png';
import remo17Image from './Remo17.png';
import remo18Image from './Remo18.png';
import remo19Image from './Remo19.png';
import remo20Image from './Remo20.png';
import remo21Image from './Remo21.png';
import remo22Image from './Remo22.png';



import mannLabPdf from './MANN LAB (3)-combined.pdf';

/* ================= DATA ================= */

const spreads = [
  {
    left: { image: aboutme, fullBleed: true },
    right: { image: aboutme2, fullBleed: true },
  },
  {
    left: {
      image: remo0Image,
      fullBleed: true,
      buttons: [
        { label: '1', pageIndex: 3, position: { top: '13%', left: '19%' } },
        { label: '2', pageIndex: 4, position: { top: '26%', left: '19%' } },
        { label: '3', pageIndex: 5, position: { top: '39%', left: '19%' } },
        { label: '4', pageIndex: 6, position: { top: '50%', left: '19%' } },
        { label: '5', pageIndex: 7, position: { top: '63%', left: '19%' } },
        { label: '6', pageIndex: 8, position: { top: '74%', left: '19%' } },
        { label: '7', pageIndex: 9, position: { top: '87%', left: '19%' } },
      ],
    },
    right: {
      image: remoImage,
      fullBleed: true,
      button: {
        href: 'https://www.jacc.org/doi/full/10.1016/j.jacadv.2024.101196',
        position: { bottom: '11%', right: '39%' },
      },
    },
  },
  {
    left: {
      image: remo6Image,
      fullBleed: true,
      button: {
        href: mannLabPdf,
        label: 'Open PDF',
        position: { top: '3%', right: '24%' },
      },
    },
    right: {
      image: remo2Image,
      fullBleed: true,
      button: {
        href: 'https://www.mdpi.com/2077-0383/14/20/7438',
        position: { top: '7%', right: '2%' },
      },
    },
  },
  {
    left: {
      image: remo3Image,
      fullBleed: true,
      button: {
        href: 'https://ieeexplore.ieee.org/document/11078963',
        position: { bottom: '14%', right: '27%' },
      },
    },
    right: {
      image: remo4Image,
      fullBleed: true,
      button: {
        href: 'https://openreview.net/pdf?id=QvuG2h28GP',
        position: { bottom: '0%', right: '41%' },
      },
    },
  },
  {
    left: { image: remo5Image, fullBleed: true },
    right: { image: remo7Image, fullBleed: true },
  },
  {
    left: {
      image: remo7_5Image,
      fullBleed: true,
      buttons: [
        { label: '1', pageIndex: 11, position: { top: '13%', left: '19%' } },
        { label: '2', pageIndex: 12, position: { top: '28%', left: '19%' } },
        { label: '3', pageIndex: 13, position: { top: '40%', left: '19%' } },
        { label: '4', pageIndex: 14, position: { top: '57%', left: '19%' } },
        { label: '5', pageIndex: 15, position: { top: '73%', left: '19%' } },
      ],
    },
    right: {
      video: remo8Video,
      fullBleed: true,
    },
  },
  {
    left: { image: remo9Image, fullBleed: true },
    right: { image: remo10Image, fullBleed: true },
  },
  {
    left: { image: remo11Image, fullBleed: true },
    right: {
      image: remo12Image,
      fullBleed: true,
      button: {
        href: 'https://journals.lww.com/ccmjournal/citation/2025/01001/1553__evaluation_of_machine_learning_model_drift.1506.aspx',
        position: { bottom: '5%', right: '40%' },
      },
    },
  },
  {
    left: { image: remo13Image, fullBleed: true },
    right: { image: remo14Image, fullBleed: true },
  },
  {
    left: { image: remo15Image, fullBleed: true },
    right: { image: remo16Image, fullBleed: true },
  },
  {
    left: { image: remo17Image, fullBleed: true },
    right: { image: remo18Image, fullBleed: true },
  },
  {
    left: { image: remo19Image, fullBleed: true },
    right: { image: remo20Image, fullBleed: true },
  },
  {
    left: { image: remo21Image, fullBleed: true },
    right: { image: remo22Image, fullBleed: true },
  },
];

/* ================= PAGE ================= */

const PageContent = React.memo(
  ({ page, goToPage, isActive, bookScale }) => {
    if (!page) return null;

    return (
      <div className="page-inner fullbleed">
        {page.video ? (
          <video
            className={`page-video${page.fullBleed ? ' fullbleed' : ''}`}            
            src={page.video}
            muted
            loop
            playsInline
            preload="metadata"
            ref={(el) => {
              if (!el) return;
              isActive ? el.play() : el.pause();
            }}
          />
        ) : (
          <img
            src={page.image}
            className={`page-image${page.fullBleed ? ' fullbleed' : ''}`}
            draggable="false"
            alt=""
          />
        )}

        {(page.buttons || (page.button ? [page.button] : [])).map(
          (btn, i) =>
            btn.pageIndex !== undefined ? (
              <button
                key={i}
                className="page-button"
                style={{ ...btn.position, '--btn-scale': bookScale }}
                onClick={() => goToPage(btn.pageIndex)}
              >
                {btn.label}
              </button>
            ) : (
              <a
                key={i}
                className="page-button"
                href={btn.href}
                target="_blank"
                rel="noreferrer"
                style={{ ...btn.position, '--btn-scale': bookScale }}
              >
                {btn.label || 'Read'}
              </a>
            )
        )}
      </div>
    );
  }
);

/* ================= BOOK ================= */




export default function OpenJournal({ onBack }) {
  const pages = useMemo(
    () => spreads.flatMap((s) => [s.left, s.right]),
    []
  );

  const [spread, setSpread] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [dir, setDir] = useState('');

  const frozenLeft = useRef(null);
  const frozenRight = useRef(null);

  const leftPage = pages[spread * 2];
  const rightPage = pages[spread * 2 + 1];
  const [bookScale, setBookScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const widthScale = window.innerWidth / 1400;
      const heightScale = window.innerHeight / 900;
      setBookScale(Math.max(0.6, Math.min(widthScale, heightScale, 1)));
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useEffect(() => {
    if (!flipping) {
      frozenLeft.current = leftPage;
      frozenRight.current = rightPage;
    }
  }, [flipping, leftPage, rightPage]);

  const goToPage = useCallback(
    (pageIndex) => {
      const target = Math.floor(pageIndex / 2);
      if (target === spread || flipping) return;
      setFlipping(true);
      setDir(target > spread ? 'next' : 'prev');
      setTimeout(() => {
        setSpread(target);
        setFlipping(false);
        setDir('');
      }, 900);
    },
    [spread, flipping]
  );

  const next = () => goToPage((spread + 1) * 2);
  const prev = () => goToPage((spread - 1) * 2);

  return (
    <div className="openjournal-container" style={{ '--book-scale': bookScale }}>
      <button className="back-link" onClick={onBack}>
        Back
      </button>

      <div className="open-book simple">
        <RibbonBookmarks
          chapters={[
            { icon: '1', label: 'About me', spread: 0, color: '#FF6D7A' },
            { icon: '2', label: 'Research', spread: 1, color: '#FFC84A' },
            { icon: '3', label: 'Projects', spread: 5, color: '#6AC7FF' },
            { icon: '4', label: 'Art', spread: 8, color: '#7DDE92' },
          ]}
          onSelect={(s) => goToPage(s * 2)}
        />

        {/* LEFT */}
        <div className="page left-simple">
          <div className="page-rect">
            <div className={`page-sheet${leftPage?.fullBleed ? ' fullbleed' : ''}`}>
              <PageContent
                page={leftPage}
                goToPage={goToPage}
                isActive={!flipping}
                bookScale={bookScale}
              />
            </div>

            {flipping && dir === 'prev' && (
              <div className={`page-sheet flip-left${leftPage?.fullBleed ? ' fullbleed' : ''}`} style={{ zIndex: 50 }}>
                <PageContent
                  page={frozenLeft.current}
                  goToPage={goToPage}
                  isActive={false}
                  bookScale={bookScale}
                />
              </div>
            )}
          </div>
        </div>


        <div className="spine-simple" />

        {/* RIGHT */}
        <div className="page right-simple">
          <div className="page-rect">
            <div className={`page-sheet${rightPage?.fullBleed ? ' fullbleed' : ''}`}>
              <PageContent
                page={rightPage}
                goToPage={goToPage}
                isActive={!flipping}
                bookScale={bookScale}
              />
            </div>

            {flipping && dir === 'next' && (
              <div className={`page-sheet flip-right${rightPage?.fullBleed ? ' fullbleed' : ''}`} style={{ zIndex: 50 }}>
                <PageContent
                  page={frozenRight.current}
                  goToPage={goToPage}
                  isActive={false}
                  bookScale={bookScale}
                />
              </div>
            )}
          </div>
        </div>

      </div>

      <div className="book-nav">
      <button
        className="book-nav-button"
        onClick={prev}
        disabled={spread === 0 || flipping}
      >
        Previous
      </button>

      <button
        className="book-nav-button"
        onClick={next}
        disabled={spread === spreads.length - 1 || flipping}
      >
        Next
      </button>
    </div>

    </div>
  );
}
