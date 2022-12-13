import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from "react-redux";
import BannerName from './BannerName';
import BannerTopic from './BannerTopic';
import BannerMembers from './BannerMembers';
import ChannelDetails from './ChannelDetails';
import { Modal } from '../../context/Modal';
import './ChannelBanner.css';


export default function ChannelBanner() {
    // console.log(user)
    const user = useSelector(state => state.session.user);
    const [channel, setChannel] = useState(null)
    const [members, setMembers] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [active, setActive] = useState('About')
    const match = useRouteMatch('/channels/:id')
    
    useEffect(() => {
        const channels = user.user_channels_dict
        const channelId = match ? match.params.id: null
        const channel = channels[channelId]

        setChannel(channel)
    }, [user, match])

    useEffect(() => {
        const members = channel ? channel.channel_members: []
        setMembers(members.slice(3))        
    }, [channel])

  return (
    <div className='channel-banner-div'>
      {channel &&
          <>
            <BannerName channel={channel} setShowModal={setShowModal} setActive={setActive}/>
            <BannerTopic channel={channel} />
        <BannerMembers setShowModal={setShowModal} channel={channel} members={members} totalMembers={channel.number_of_members} setActive={setActive} />
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
