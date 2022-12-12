import React from 'react';
import { useState, useEffect } from 'react';
import './ChannelDetails.css';
import DetailsName from './DetailsName';
import DetailsContent from './DetailsContent';

export default function ChannelDetails({ setShowModal, channel }) {
    const [name, setName] = useState('')

    useEffect(() => {
      setName(channel.name)
    
    }, [channel])
    

  return (
    <div className='channel-details-div'>
        <DetailsName setShowModal={setShowModal} name={name} />
        <DetailsContent channel={channel} />
    </div>
  )
}
