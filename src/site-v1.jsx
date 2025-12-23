import React from 'react';
import './App.css';
import frontPageImage from './frontPage.png';

const SiteV1 = () => {
  const handleDiaryClick = () => {
    window.location.hash = '#opening';
  };

  return (
    <div className="landing-page">
      <img className="landing-bg" src={frontPageImage} alt="" />
      <button className="diary" onClick={handleDiaryClick} type="button">
        <div className="diary-edge" />
        <div className="diary-title">Somin's Diary</div>
        <div className="diary-bookmark" />
      </button>
    </div>
  );
};

export default SiteV1;
