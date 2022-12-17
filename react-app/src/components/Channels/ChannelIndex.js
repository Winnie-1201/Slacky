import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './ChannelIndex.css';
import { Modal } from '../../context/Modal';
import AddChannel from './AddChannel';
import BrowseChannelIcon from './BrowseChannelIcon';

export default function ChannelIndex({user}) {
    const userChannels = user.user_channels

    const [showChannels, setShowChannels] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const handleAddChannelButton = (e) => {
        // console.log(e.target)
        // console.log(e.currentTarget)
        setShowModal(true)
    }

  return (
    <div className='channels-index-div'>
        <div className='sidebar-wrapper channel-wrapper-cursor'>
            <div  onClick={() => {setShowChannels(prev => !prev)}} className='sidebar-icon-span'><i className="fa-solid fa-caret-down"></i></div>
            <span onClick={() => { setShowChannels(prev => !prev) }} className='sidebar-text'>Channels</span>
        </div>
        
          {showChannels && userChannels?.map(c => {
            return (
                <div key={c.name} className='sidebar-wrapper'>
                    {/* {console.log(c.name, c)} */}
                    <div className='sidebar-icon-span'>
                        {c.is_public ? '#' : <span style={{'display':'flex', 'justifyContent': 'center', 'marginLeft': '5px'}}><i style={{'width': '20px'}} className="fa-solid fa-lock"></i></span>}
                    </div>
                    <span className='sidebar-text'><NavLink key={c.name} to={`/channels/${c.id}`}>{c.name}</NavLink></span>
                </div>
            )
        })}
        <div className='sidebar-wrapper channel-wrapper-cursor' onClick={handleAddChannelButton} >
            <div className='sidebar-icon-span'>
                <div className='plus-div'><span>+</span></div>
            </div>
            <span className='sidebar-text add-channels'>Add channels</span>
        </div>
        <div className='sidebar-wrapper channel-wrapper-cursor'>
            <NavLink to='/browse-channels' className='sidebar-icon-span-navlink' >
                {/* <div className='sidebar-icon-span'> */}
                    <div className='plus-div'>
                        <BrowseChannelIcon />
                    </div>
                {/* </div> */}
                <span className='sidebar-text all-channels'>All channels</span>
            </NavLink>
        </div>        
        {showModal &&
            <Modal onClose={() => setShowModal(false)}>
                <AddChannel onClose={() => setShowModal(true)} setShowModal={setShowModal}/>
            </Modal>
        }
    </div>
  )
}
