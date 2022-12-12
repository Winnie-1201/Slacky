import React from 'react';
import './SideBar.css'
import ChannelIndex from '../Channels/ChannelIndex';
import GroupIndex from '../DMs/GroupIndex';

export default function SideBar({user}) {
  return (
    <div className='sidebar-div'>
        <div className='sidebar-header'>
            <span style={{'fontWeight': '600', 'fontSize': '18px'}}>App Academy</span>
            <button>
                <i className="fa-regular fa-pen-to-square"></i>
            </button>
        </div>
        <ChannelIndex user={user} />
        <GroupIndex user={user} />
    </div>
  )
}
