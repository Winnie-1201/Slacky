import React from 'react'
import {useSelector} from 'react-redux'

export default function DetailsAbout({channel}) {
  const user = useSelector(state => state.session.user);
  const organizer_id = channel.organizer_id
  // console.log(channel.organizer, channel.organizer_id)

  return (
    <div className='channel-detail-about'>
      <div className='channel-detail-sections'>
        <span style={{'display':'flex', 'justifyContent':'space-between'}}>Topic<span className='channel-detail-edit'>Edit</span></span>
        {channel.topic ? <span className='channel-detail-content'>{channel.topic}</span> : <span className='channel-detail-content'>Add a description</span>}
      </div>
      <div className='channel-detail-sections'>
        <span style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>Description<span className='channel-detail-edit'>Edit</span></span>
        {channel.description ? <span className='channel-detail-content'>{channel.description}</span> : <span className='channel-detail-content'>Add a description</span>}
      </div>
      <div className='channel-detail-sections'>
        <span>Created by</span>
        <span className='channel-detail-content'>{channel.organizer.username} on {channel.created_at}</span>
      </div>
      {user.id === organizer_id ?
        <div className='channel-detail-sections last'><span className='channel-delete-leave'>Delete channel</span></div>
        :
        <div className='channel-detail-sections last'><span className='channel-delete-leave'>Leave channel</span></div>
      }
    </div>
  )
}
