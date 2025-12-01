import React, { useEffect, useState } from 'react';
import SiteV1 from './site-v1.jsx';
import OpenJournal from './OpenJournal.jsx';

const App = () => {
  const [hash, setHash] = useState(typeof window !== 'undefined' ? window.location.hash : '');

  useEffect(() => {
    const handleHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const goLanding = () => {
    window.location.hash = '';
    setHash('');
  };

  if (hash === '#opening') {
    return <OpenJournal onBack={goLanding} />;
  }
  return <SiteV1 />;
};

export default App;
