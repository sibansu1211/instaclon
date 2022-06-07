import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className='land-container'>
      <div className='land-image'>
        <img src='/images/landing.jpg' alt='' />
      </div>
      <div className='title'>
        <div className='txtLand'>
          <p>WELCOME</p>
        </div>
        <div className='btnWrapper'>
          <Link className='lBtn' to='/postview'>
            <button id='landBtn'>ENTER</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
