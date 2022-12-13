import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import './AllChannelsMap.css'

export default function AllChannelsMap() {
    const user = useSelector((state) => state.session.user);
    const allChannelsObj = useSelector((state) => state.channels.allChannels);
    const [allChannels, setAllChannels] = useState([])

    useEffect(() => {
        if (allChannelsObj) setAllChannels(Object.values(allChannelsObj))
    }, [allChannelsObj])

  return (
    <div className="all-channels-div">
        {allChannels?.map((c, idx) => {
            return (
                <div key={`${idx}`} className='all-channles-single-div'>
                    <div className="all-channels-single-child-top">
                        <div>
                            {c.is_public ? <span><strong>#</strong></span> : <span><i className="fa-solid fa-lock"></i></span>}
                        </div>
                        <NavLink key={c.name} to={`/channels/${c.id}`}>{c.name}</NavLink>
                    </div>
                    <div className="all-channels-single-child-bottom">
                        {c.channel_members_ids?.includes(user.id) &&
                        <>
                            <i className="fa-solid fa-check" style={{'color': '#007a5a', 'fontSize': '10px'}}></i>
                            <span style={{ 'color': '#007a5a'}}>Joined</span>
                        </>
                        }
                        <span style={{ 'color': 'rgba(29,28,29,0.7)' }}>·</span>
                        <span style={{ 'color': 'rgba(29,28,29,0.7)' }}>{c.channel_members?.length} members</span>
                        {c.description?.length > 0 &&
                            <>
                                <span style={{ 'color': 'rgba(29,28,29,0.7)' }}>·</span>
                                <span style={{ 'color': 'rgba(29,28,29,0.7)' }} className="all-channels-description-span">{c.description}</span>
                            </>
                        }

                    </div>
                </div>
            )
        })}
    </div>
  )
}