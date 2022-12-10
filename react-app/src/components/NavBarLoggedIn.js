import React from 'react';
import LogoutButton from './auth/LogoutButton';

import './NavBarLoggedIn.css';

const NavBarLoggedIn = ({ user }) => {
    // console.log('is user', user)
    return (
        <nav className='logged-in-navbar'>
            <div>
                <input placeholder='search placeholder'/>
            </div>
            <div>
                <LogoutButton />
            </div>
        </nav>
    );
}

export default NavBarLoggedIn;
