import React, { useEffect, useRef } from 'react';
import TopPlayers from './TopPlayers';
import {Parallax } from 'react-scroll-parallax';
import uclTable from '../img/ucl_table.png'
import ParallaxComp from './Parallax/Parallax';

const Studio = () => {
    return (
        <div className='studio' style={{
            position: 'relative',
            width:'100%', 
            height: '100vh', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center'
        }}>
            <ParallaxComp>
                <TopPlayers />
            </ParallaxComp>
        </div>
    );
};

export default Studio;