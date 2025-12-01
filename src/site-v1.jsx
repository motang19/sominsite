import React, { useEffect, useRef, useState } from 'react';
import './App.css';

// Snapshot of the original landing desk with diary button
const SiteV1 = () => {
  const baseRef = useRef(null);
  const knobRef = useRef(null);
  const isDragging = useRef(false);
  const [knobAngle, setKnobAngle] = useState(-30);

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

  const updateFromPointer = (event) => {
    if (!baseRef.current) return;
    const rect = baseRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rawAngle = (Math.atan2(event.clientY - cy, event.clientX - cx) * 180) / Math.PI;
    const wrapped = ((rawAngle % 360) + 360) % 360;
    const clamped = Math.min(Math.max(wrapped, 45), 315);
    setKnobAngle(clamped);
    setLightingVars(clamped);
  };

  const handlePointerMove = (event) => {
    if (!isDragging.current) return;
    updateFromPointer(event);
  };

  const handlePointerUp = (event) => {
    isDragging.current = false;
    knobRef.current?.releasePointerCapture(event.pointerId);
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  };

  const handlePointerDown = (event) => {
    isDragging.current = true;
    knobRef.current?.setPointerCapture(event.pointerId);
    updateFromPointer(event);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  useEffect(() => {
    setLightingVars(knobAngle);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [knobAngle]);

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

      <div className="sticky-note">
        <span className="sticky-pin" aria-hidden="true" />
        <p>모든 순간을 기록해 ✧</p>
      </div>

      <div className="desk-polaroid" aria-label="Polaroid photo">
        <div className="polaroid-photo">
          <span className="photo-sparkle" />
        </div>
        <div className="polaroid-caption">Weekend light study</div>
        <div className="polaroid-tape" aria-hidden="true" />
      </div>

      <div className="desk-pencil" aria-hidden="true">
        <div className="pencil-wood" />
        <div className="pencil-metal" />
        <div className="pencil-eraser" />
      </div>

      <button className="diary" onClick={handleDiaryClick} type="button">
        <div className="diary-edge" />
        <div className="diary-title">Somin's Diary</div>
        <div className="diary-bookmark" />
      </button>
    </div>
  );
};

export default SiteV1;
