import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import ChannelDetails from './ChannelDetails';

export default function BannerName({channel}) {
    const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className='channel-name' onClick={() => setShowModal(true)}>
          # {channel.name}
          <svg viewBox="0 0 20 20" style={{ 'width': '18px' }}><path d="M5.72 7.47a.75.75 0 0 1 1.06 0L10 10.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-3.75 3.75a.75.75 0 0 1-1.06 0L5.72 8.53a.75.75 0 0 1 0-1.06Z"></path></svg>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <ChannelDetails setShowModal={setShowModal} channel={channel} />
        </Modal>
      )}
    </>
  )
}