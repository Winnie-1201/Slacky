import React, { useState } from 'react'
import {useSelector} from 'react-redux';
import EditChannel from './EditChannel';
import {Modal} from '../../context/Modal'

export default function DetailsAbout({channel}) {
  const user = useSelector(state => state.session.user);
  const organizer_id = channel.organizer_id
  // console.log(channel.organizer, channel.organizer_id)

  const [showModal, setShowModal] = useState(false);

  return (
    <div className='channel-detail-about'>
      <div className='channel-detail-sections'>
        <span style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>Channel name
          <span className='channel-detail-edit' onClick={() => {setShowModal(true)}}>
            {user.id === organizer_id ? 'Edit channel': ""}
          </span>
        </span>
        <span className='channel-detail-content'>{channel.name}</span>
      </div>      
      <div className='channel-detail-sections'>
        <span style={{'display':'flex', 'justifyContent':'space-between'}}>Topic</span>
        {/* <span className='channel-detail-edit'>Edit</span> */}
        {channel.topic ? <span className='channel-detail-content'>{channel.topic}</span> : <span className='channel-detail-content'>Add a description</span>}
      </div>
      <div className='channel-detail-sections'>
        <span style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>Description</span>
        {/* <span className='channel-detail-edit'>Edit</span> */}
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
      {showModal &&
        <Modal onClose={() => setShowModal(false)}>
          <EditChannel setShowModal={setShowModal} channel={channel} />
        </Modal>
      }
    </div>
  )
}
