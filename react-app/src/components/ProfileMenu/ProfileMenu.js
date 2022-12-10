import React from 'react';
import LogoutButton from '../auth/LogoutButton';
import ProfileBasic from './ProfileBasic';
import ProfileStatus from './ProfileStatus';

import './ProfileMenu.css'

export default function ProfileMenu({ user }) {
    console.log(user)
  return (
    <div className='profile-menu-div'>
        {user &&
            <>
              <div className='profile-menu-div-sub'>
                <ProfileBasic user={user} />
                <ProfileStatus user={user} />
                <span>Set active/away status placeholder</span>
                <div className='profile-buttons-div'>
                    <span>Profile button placeholder</span>
                </div>
                <div className='profile-buttons-div'>
                    <LogoutButton />
                </div>
              </div>
            </>
        }
    </div>
  )
}
