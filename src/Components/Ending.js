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
        paddingTop: '300px'
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            padding: '20px',
            justifyContent: 'flex-start',
            width: '55%',
          }}>
            <img 
              src={require('../img/prof.png')} 
              alt="Fairy" 
              style={{
                width: '200px',
                height: '200px',
                marginTop: '-200px',
                objectFit: 'contain',
                marginRight: '15px',
              }}
            />
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '15px',
              marginTop: '-200px',
              borderRadius: '10px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.58)',
              maxWidth: '600px',
            }}>
              <p style={{
                margin: 0,
                fontSize: '1.5rem',
                fontStyle: 'italic',
                color: '#333'
              }}>
               End Here </p>
            </div>
          </div>

         
        </div>
      </Parallax>
  );
};

export default Ending;