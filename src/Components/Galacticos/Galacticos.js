import React, { useEffect, useRef } from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import ParallaxComp from '../Parallax/Parallax';



const Galacticos = () => {
  
  return (
    <Parallax translateY={[-20, 20]} style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
      }}>
         <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '15px',
              marginTop: '-200px',
              alighnItems: 'center',
              borderRadius: '10px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.58)',
              maxWidth: '600px',
            }}>
              <p style={{
                margin: 0,
                fontSize: '1.5rem',
                fontStyle: 'italic',
                alignContent: 'center',
                color: '#333'
              }}>
                <p>....But then a fresh change . Florentino Perez became club's president</p>
                <p>Pérez’s first move stunned the world — he brought legends of the game to his club in 2000s.</p>
              </p>
            </div>
      </Parallax>
  );
};

export default Galacticos;