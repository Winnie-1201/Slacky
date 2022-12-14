import React, { useState, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import BannerName from './BannerName';
import BannerTopic from './BannerTopic';
import BannerMembers from './BannerMembers';
import ChannelDetails from './ChannelDetails';
import { Modal } from '../../context/Modal';
import './ChannelBanner.css';
import { getOneChannel } from '../../store/channels';


export default function ChannelBanner() {
  console.log('-------- 2. ChannelBanner component --------')
  const channel = useSelector((state) => state.channels.channel)
  // const [members, setMembers] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState('About')
  const { channelId } = useParams()
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneChannel(channelId))
  }, [channelId])

  console.log('channel', channel)
  console.log('showModal', showModal)
  console.log('active', active)
  console.log('channelId', channelId)
  console.log('------------------before ChannelBanner returns ------------------')


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
