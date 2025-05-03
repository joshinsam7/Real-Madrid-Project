import React, { useEffect, useRef } from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import coachImage from '../img/coach.png';

const RealMadridToday = () => {
  
  return (
    <Parallax translateY={[-20, 20]} style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 0,
        paddingTop: '100px'
      }}>
        <div style={{
          width: '70%',
          height: '100%',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>NEXT... CREATE YOUR OWN TEAM</h2>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
            <img 
              src={coachImage} 
              alt="Coach" 
              style={{ 
                width: '180px', 
                height: 'auto',
                borderRadius: '50%',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }} 
            />
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '30px', 
            width: '100%',
            margin: '0 auto',
          }}>
            <div style={{ 
              padding: '15px',
              backgroundColor: 'rgba(248, 249, 250, 0.8)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3>Create Your Own Playing XI</h3>
            </div>
            
            <div style={{ 
              padding: '15px',
              backgroundColor: 'rgba(248, 249, 250, 0.8)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3>Node Connections represents number of years played together.</h3>
            </div>
            
            <div style={{ 
              padding: '15px',
              backgroundColor: 'rgba(248, 249, 250, 0.8)',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <h3>Make Substitutions by clicking players</h3>
            </div>
            
            <div style={{ 
              padding: '15px',
              backgroundColor: 'rgba(241, 248, 255, 0.8)',
              borderRadius: '8px',
              textAlign: 'center',
              borderLeft: '4px solid #4285f4'
            }}>
              <h3>Be The Manager!</h3>
            </div>
          </div>
        </div>
      </Parallax>
  );
};

export default RealMadridToday;