import React from 'react';
import { NavLink } from 'react-router-dom';
import './GroupIndex.css'

export default function GroupIndex({ user }) {
    const userGroups = user.user_groups
    return (
        <div className='groups-index-div'>
            <div className='sidebar-wrapper'>
                <div className='sidebar-icon-span'><i className="fa-solid fa-caret-down"></i></div>
                <span className='sidebar-text'>Direct messages</span>
            </div>
            {userGroups?.map(dm => {
                return (
                    <div key={dm.name} className='sidebar-wrapper'>
                        <div className='sidebar-icon-span'>#</div>
                        {/* <span className='sidebar-text'><NavLink key={dm.name} to={`/${dm.id}`}>{dm.name}</NavLink></span> */}
                    </div>
                )
            })}
            <div className='sidebar-wrapper'>
                <div className='sidebar-icon-span'>
                    <div className='plus-div'><span>+</span></div>
                </div>
                <span className='sidebar-text'>Add teammates</span>
            </div>
        </div>
    )
}
