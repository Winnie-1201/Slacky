import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './ChannelIndex.css';
import { Modal } from '../../context/Modal';
import AddChannel from './AddChannel';

export default function ChannelIndex({user}) {
    const userChannels = user.user_channels

    const [showChannels, setShowChannels] = useState(true);
    const [showModal, setShowModal] = useState(false);

  return (
    <div className='channels-index-div'>
        <div className='sidebar-wrapper'>
            <div  onClick={() => {setShowChannels(prev => !prev)}} className='sidebar-icon-span'><i className="fa-solid fa-caret-down"></i></div>
            <span onClick={() => { setShowChannels(prev => !prev) }} className='sidebar-text'>Channels</span>
        </div>
          {showChannels && userChannels?.map(c => {
            return (
                <div key={c.name} className='sidebar-wrapper'>
                    <div className='sidebar-icon-span'>#</div>
                    <span className='sidebar-text'><NavLink key={c.name} to={`/channels/${c.id}`}>{c.name}</NavLink></span>
                </div>
            )
        })}
        <div className='sidebar-wrapper' onClick={() => setShowModal(true)}>
            <div className='sidebar-icon-span'>
                <div className='plus-div'><span>+</span></div>
            </div>
            <span className='sidebar-text'>Add channels</span>
        </div>
        {showModal &&
            <Modal onClose={() => setShowModal(false)}>
                <AddChannel onClose={() => setShowModal(true)} setShowModal={setShowModal}/>
            </Modal>
        }
    </div>
  )
}
