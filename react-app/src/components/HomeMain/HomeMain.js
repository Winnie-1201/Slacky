import React from 'react';
import { NavLink } from 'react-router-dom';
import './HomeMain.css';
import landing_pic from '../../pictures/landing_pic.webp'

export default function HomeMain() {
  return (
    <div className='home-main-div'>
        <h1>Welcome</h1>
      <img alt='main-view' src={landing_pic}></img>
        <h3>Make work life simpler, more pleasant and more productive.</h3>
        <NavLink to='/login'>
          <button>Try for free</button>
        </NavLink>
    </div>
  )
}
