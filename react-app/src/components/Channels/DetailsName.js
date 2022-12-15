import React from 'react';
import './ChannelDetails.css';

export default function DetailsName({ setShowModal, channel}) {
  
  return (
    <div className='channel-details-header'>
        <div className='channel-name-inmodal'>
          {channel?.is_public ? <span>#</span> : <span style={{ 'display': 'flex', 'justifyContent': 'center', 'marginLeft': '5px' }}><i style={{ 'width': '20px' }} className="fa-solid fa-lock"></i></span>}
          {channel?.name}
        </div>
        <button className='modal-exit-button' onClick={() => setShowModal(false)}>
          <svg viewBox="0 0 20 20" style={{'width':'20px'}}>
              <path d="M15.303 4.697a.75.75 0 0 1 0 1.06L11.061 10l4.242 4.243a.75.75 0 0 1-1.06 1.06L10 11.061l-4.243 4.242a.75.75 0 0 1-1.06-1.06L8.939 10 4.697 5.757a.75.75 0 0 1 1.06-1.06L10 8.939l4.243-4.242a.75.75 0 0 1 1.06 0Z"></path>
          </svg>
        </button>
    </div>

  )
}
