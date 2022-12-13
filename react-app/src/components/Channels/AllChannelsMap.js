import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import './AllChannelsMap.css'

export default function AllChannelsMap() {
    const user = useSelector((state) => state.session.user);
    const allChannels = useSelector((state) => state.channels.allChannels);
    console.log('------ allChannels -----', allChannels)

  return (
    <div className="all-channels-div">
        {allChannels?.map((c, idx) => {
            return (
                <div key={`${idx}`}>
                    <span>
                        <div>
                            {c.is_public ? '#' : <span><i style={{ 'width': '20px' }} className="fa-solid fa-lock"></i></span>}
                        </div>
                        <NavLink key={c.name} to={`/channels/${c.id}`}>{c.name}</NavLink>
                    </span>
                    {console.log(c)}
                    {console.log(c.channel_members_ids.includes(user.id))}
                    {c.channel_members_ids?.includes(user.id) &&
                    <span>Joined</span>
                    }
                    <span>  ·  {c.channel_members?.length} members  ·  </span>
                    <span>{c.description}</span>
                </div>
            )
        })}
    </div>
  )
}
