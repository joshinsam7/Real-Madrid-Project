import React, { useEffect, useState } from 'react';
import '../App.css';
import logo from '../img/real-madrid-logo.png';

const SplashScreen = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 0); 
     
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 0);  

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <img 
          src={logo} 
          alt="Real Madrid Logo" 
          className="splash-logo"
        />
        <div className="splash-title" style={madridStyle.title}>THE REAL MADRID EXPERIENCE</div>
        <div className="splash-subtitle" style={madridStyle.subtitle}>¡HALA MADRID!</div>
      </div>
    </div>
  );
};

const madridStyle = {
  title: {
    fontFamily: "'Montserrat', 'Arial', sans-serif",
    fontSize: '1.8rem',
    letterSpacing: '2px',
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#00529F', 

    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
    marginTop: '15px'
  },
  subtitle: {
    fontFamily: "'Montserrat', 'Arial', sans-serif",
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#FDB912', 
    marginTop: '10px',
    letterSpacing: '1px'
  }
};

export default SplashScreen;
