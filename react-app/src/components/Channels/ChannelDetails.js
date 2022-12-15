import React from 'react';
import { useState, useEffect } from 'react';
import './ChannelDetails.css';
import DetailsName from './DetailsName';
import DetailsContent from './DetailsContent';

export default function ChannelDetails({ setShowModal, channel, active, setActive }) {
    // const [name, setName] = useState('')

    // useEffect(() => {
    //   if (channel) setName(channel.name)
    
    // }, [channel])
    

  return (
    <div className='channel-details-div'>
      <DetailsName setShowModal={setShowModal} channel={channel} />
        <DetailsContent setShowModal={setShowModal} channel={channel} active={active} setActive={setActive}/>
    </div>
  )
}
