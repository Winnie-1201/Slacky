import React from 'react';
import ProfileMenu from './ProfileMenu/ProfileMenu';

import './NavBarLoggedIn.css';

const NavBarLoggedIn = ({ user }) => {
    // console.log('is user', user)
    return (
        <nav className='logged-in-navbar'>
            <div>
                <input placeholder='search placeholder'/>
            </div>
            <div style={{'position':'relative'}}>
                <span className='profile-icon-span'>
                    <img src='https://ca.slack-edge.com/T04E7LXJV7B-U04DXFNDNDS-g7c68be6ff59-32' alt='profile-icon'></img>
                </span>
                <ProfileMenu user={user}/>
            </div>
        </nav>
    );
}

export default NavBarLoggedIn;
