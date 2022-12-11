import React from 'react';
import { NavLink } from 'react-router-dom';
import './ChannelIndex.css'

export default function ChannelIndex({user}) {
    const userChannels = user.user_channels
  return (
    <div className='channels-index-div'>
        <div className='sidebar-wrapper'>
            <div className='sidebar-icon-span'><i className="fa-solid fa-caret-down"></i></div>
            <span className='sidebar-text'>Channels</span>
        </div>
        {userChannels?.map(c => {
            return (
                <div key={c.name} className='sidebar-wrapper'>
                    <div className='sidebar-icon-span'>#</div>
                    <span className='sidebar-text'><NavLink key={c.name} to={`/${c.id}`}>{c.name}</NavLink></span>
                </div>
            )
        })}
        <div className='sidebar-wrapper'>
            <div className='sidebar-icon-span'>
                <div className='plus-div'><span>+</span></div>
            </div>
            <span className='sidebar-text'>Add channels</span>
        </div>
    </div>
  )
}
