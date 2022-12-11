import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from "react-redux";
import BannerName from './BannerName';
import BannerTopic from './BannerTopic';
import BannerMembers from './BannerMembers';
import './ChannelBanner.css';

export default function ChannelBanner() {
    // console.log(user)
    const user = useSelector(state => state.session.user);
    const [channel, setChannel] = useState(null)
    const [members, setMembers] = useState([])
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
              <BannerName channel={channel}/>
              <BannerTopic channel={channel} />
              <BannerMembers channel={channel} members={members} totalMembers={channel.number_of_members}/>
            </>
        }
    </div>
  )
}
