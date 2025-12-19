import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import geminiLeftImage from './Gemini_Generated_Image_ifhuo0ifhuo0ifhu (1).png';
import geminiCornerImage from './Gemini_Generated_Image_zcynrhzcynrhzcyn.png';
import geminiCornerRightImage from './Gemini_Generated_Image_yh34qhyh34qhyh34.png';
import geminiRightImage from './Gemini_Generated_Image_5ra4905ra4905ra4 (1).png';
import geminiTopRightImage from './Gemini_Generated_Image_bz1zyrbz1zyrbz1z.png';
import geminiBottomLeftImage from './Gemini_Generated_Image_7qd69a7qd69a7qd6.png';

// Snapshot of the original landing desk with diary button
const SiteV1 = () => {
  const baseRef = useRef(null);
  const knobRef = useRef(null);
  const isDragging = useRef(false);
  const [knobAngle, setKnobAngle] = useState(-30);

  const clampKnobAngle = (angle) => Math.min(Math.max(angle, 45), 315);
  const normalizeAngle = (angle) => ((angle % 360) + 360) % 360;

  const setLightingVars = (angle) => {
    const wrapped = ((angle % 360) + 360) % 360;
    const clamped = Math.min(Math.max(wrapped, 45), 315);
    const sweep = (clamped - 45) / (315 - 45);
    const intensity = Math.min(1, Math.max(0, sweep));
    const temperature = Math.min(1, Math.max(0, sweep));
    const hue = 36 + (50 - 36) * (1 - temperature);
    const lightness = 88 + (96 - 88) * intensity;
    const deskColor = `hsl(${hue} 80% ${lightness}%)`;
    document.documentElement.style.setProperty('--lamp-intensity', intensity.toFixed(3));
    document.documentElement.style.setProperty('--lamp-temperature', temperature.toFixed(3));
    document.documentElement.style.setProperty('--desk-light-strength', intensity.toFixed(3));
    document.documentElement.style.setProperty('--desk-light-color', deskColor);
  };

  const updateFromPointer = useCallback((event) => {
    if (!baseRef.current) return;
    const rect = baseRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rawAngle = (Math.atan2(event.clientY - cy, event.clientX - cx) * 180) / Math.PI;
    const target = normalizeAngle(rawAngle);

    setKnobAngle((previous) => {
      const current = normalizeAngle(previous);
      const delta = ((target - current + 540) % 360) - 180; // shortest turn direction
      return clampKnobAngle(current + delta);
    });
  }, []);

  const handlePointerMove = useCallback(
    (event) => {
      if (!isDragging.current) return;
      updateFromPointer(event);
    },
    [updateFromPointer]
  );

  const handlePointerUp = useCallback(
    (event) => {
      isDragging.current = false;
      knobRef.current?.releasePointerCapture(event.pointerId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    },
    [handlePointerMove]
  );

  const handlePointerDown = useCallback(
    (event) => {
      isDragging.current = true;
      knobRef.current?.setPointerCapture(event.pointerId);
      updateFromPointer(event);
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    },
    [handlePointerMove, handlePointerUp, updateFromPointer]
  );

  useEffect(() => {
    setLightingVars(knobAngle);
  }, [knobAngle]);

  useEffect(
    () => () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    },
    [handlePointerMove, handlePointerUp]
  );

  const handleDiaryClick = () => {
    window.location.hash = '#opening';
  };

  return (
    <div className="landing-page">
      <div className="desk-surface">
        <div className="desk-light" />
        <div className="paper-fibers" />
      </div>

      <div className="lamp-base" ref={baseRef} aria-label="Desk lamp base">
        <div className="lamp-base-inner" />
        <button
          className="lamp-knob"
          ref={knobRef}
          type="button"
          aria-label="Adjust lamp brightness"
          style={{
            transform: `translate(-50%, -50%) rotate(${knobAngle}deg) translateX(calc(50% + 18px)) rotate(${-knobAngle}deg)`,
          }}
          onPointerDown={handlePointerDown}
        >
          <span className="lamp-knob-mark" aria-hidden="true" />
        </button>
      </div>

      <img
        className="desk-gemini-corner"
        src={geminiCornerImage}
        alt="Gemini generated illustration"
        draggable="false"
      />

      <img
        className="desk-gemini-corner-right"
        src={geminiCornerRightImage}
        alt="Gemini generated illustration"
        draggable="false"
      />

      <img
        className="desk-gemini-bottomleft"
        src={geminiBottomLeftImage}
        alt="Gemini generated illustration"
        draggable="false"
      />

      <img
        className="desk-gemini-bottomright"
        src={geminiTopRightImage}
        alt="Gemini generated illustration"
        draggable="false"
      />

      <img
        className="desk-gemini-left"
        src={geminiLeftImage}
        alt="Gemini generated illustration"
        draggable="false"
      />

      <img
        className="desk-gemini-right"
        src={geminiRightImage}
        alt="Gemini generated illustration"
        draggable="false"
      />

      <button className="diary" onClick={handleDiaryClick} type="button">
        <div className="diary-edge" />
        <div className="diary-title">Somin's Diary</div>
        <div className="diary-bookmark" />
      </button>
    </div>
  );
};

export default SiteV1;
