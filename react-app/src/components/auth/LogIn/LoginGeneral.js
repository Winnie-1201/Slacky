import React from 'react';
import { NavLink } from 'react-router-dom';
import './LoginGeneral.css';

export default function LoginGeneral() {
  return (
    <div className='login-general-div'>
          <NavLink to='/'>
            <img alt='slack-logo' src='https://a.slack-edge.com/bv1-10/slack_logo-ebd02d1.svg'></img>
          </NavLink>
          <h1>Welcome</h1>
          <span>Please login</span>
    </div>
  )
}
