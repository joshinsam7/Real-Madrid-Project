import React from 'react';
import { Parallax } from 'react-scroll-parallax';

const Ending = () => {
  
  return (
    <Parallax translateY={[-20, 20]} style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: '0 20px',
        paddingTop: '200px' 
      }}>
        <div style={{
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '200px' 
        }}>
          <img 
            src={require('../img/prof.png')} 
            alt="Fairy" 
            style={{
              width: '220px',
              height: '220px',
              objectFit: 'contain',
              marginBottom: '20px',
              filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))'
            }}
          />
          
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.6)',
            marginBottom: '20px',
            textAlign: 'center',
            width: '100%'
          }}>
            <p style={{
              margin: '0 0 10px 0',
              fontSize: '1.8rem',
              fontStyle: 'italic',
              color: '#222',
              fontWeight: '500'
            }}>
              Finally, we have a surprise for you!
            </p>
          </div>
          
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.6)',
            marginBottom: '20px',
            textAlign: 'center',
            width: '100%'
          }}>
            <p style={{
              margin: 0,
              fontSize: '1.6rem',
              fontStyle: 'italic',
              color: '#222',
              lineHeight: '1.4'
            }}>
              Welcome to our <strong>Hall of Fame</strong> featuring Real Madrid legends! Explore the gallery and filter through the iconic players who have graced the Santiago Bernabéu and left their mark on the biggest stage of football.
            </p>
          </div>
          
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.6)',
            textAlign: 'center',
            width: '100%'
          }}>
            <p style={{
              margin: 0,
              fontSize: '1.8rem',
              fontStyle: 'italic',
              fontWeight: 'bold',
              color: '#222'
            }}>
              Thank you for experiencing our Real Madrid Scrollytelling journey.
            </p>
          </div>
        </div>
      </Parallax>
  );
};

export default Ending;