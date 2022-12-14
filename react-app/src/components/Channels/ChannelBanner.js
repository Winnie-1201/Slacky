import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import BannerName from './BannerName';
import BannerTopic from './BannerTopic';
import BannerMembers from './BannerMembers';
import ChannelDetails from './ChannelDetails';
import { Modal } from '../../context/Modal';
import './ChannelBanner.css';


export default function ChannelBanner({ channel }) {
  // console.log('-------- 2. ChannelBanner component --------')
  // console.log(channel)
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState('About')

  return (
    <div className='channel-banner-div'>
      {channel &&
          <>
            <BannerName channel={channel} setShowModal={setShowModal} setActive={setActive}/>
            <BannerTopic channel={channel} />
            <BannerMembers setShowModal={setShowModal} channel={channel} setActive={setActive} />
          </>
      }
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ChannelDetails setShowModal={setShowModal} channel={channel} active={active} setActive={setActive}/>
        </Modal>
      )}
    </div>
  )
}
