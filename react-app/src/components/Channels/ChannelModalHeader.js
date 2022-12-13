import React from 'react';
import './ChannelModalHeader.css';

export default function ChannelModalHeader({headerName, headerContent, setShowModal}) {
  return (
      <div className='channel-modal-header'>
        <div className='channel-modal-header-top'>
            <h2 style={{'margin':'unset'}}>{headerName}</h2>
            <button className='modal-exit-button' onClick={() => setShowModal(false)}>
                <svg viewBox="0 0 20 20" style={{ 'width': '20px' }}>
                    <path d="M15.303 4.697a.75.75 0 0 1 0 1.06L11.061 10l4.242 4.243a.75.75 0 0 1-1.06 1.06L10 11.061l-4.243 4.242a.75.75 0 0 1-1.06-1.06L8.939 10 4.697 5.757a.75.75 0 0 1 1.06-1.06L10 8.939l4.243-4.242a.75.75 0 0 1 1.06 0Z"></path>
                </svg>
            </button>
        </div>
        <span className='channel-modal-header-bottom'>{headerContent}</span>
      </div>
  )
}
