import React from 'react';
import './SideBar.css'
import ChannelIndex from '../Channels/ChannelIndex'

export default function SideBar({user}) {
  return (
    <div className='sidebar-div'>
        <span>App Academy</span>
        <span>New Message Icon</span>
        <ChannelIndex user={user} />
    </div>
  )
}
