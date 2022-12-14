import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {Redirect} from 'react-router-dom';
import EditChannel from './EditChannel';
import {Modal} from '../../context/Modal';
import { deleteOneChannel, deleteUserChannel } from '../../store/channels';
import { getUser } from '../../store/session';

export default function DetailsAbout({ channel, setShowModal}) {
  const user = useSelector(state => state.session.user);
  const member_ids = channel?.channel_members_ids;
  const organizer_id = channel?.organizer_id;
  // console.log(channel.organizer, channel.organizer_id)
  console.log(channel)
  
  const [showEditModal, setShowEditModal] = useState(false);

  const dispatch = useDispatch()
  const handleDeleteChannel = () => {
    dispatch(deleteOneChannel(channel.id))
    .then(() => {
      console.log('success delete')
      setShowModal(false)
      dispatch(getUser(user.id))
    })
  }

  const handleLeaveChannel = () => {
    dispatch(deleteUserChannel({'channel_id': channel.id, 'user_id': user.id}))
      .then(() => {
        console.log('success leave')
        setShowModal(false)
        dispatch(getUser(user.id))
      })    
  }

  if (!channel) {
    return <Redirect to='/channels/1'></Redirect>
  }

  return (
    <div className='channel-detail-about'>
      <div className='channel-detail-sections'>
        <span style={{ 'display': 'flex', 'justifyContent': 'space-between' }}>Channel name
          <span className='channel-detail-edit' onClick={() => { setShowEditModal(true)}}>
            {(member_ids.includes(user.id)) ? 'Edit channel': ""}
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
      {(user.id === organizer_id && channel.id !== 1) &&
        <div className='channel-detail-sections last'><span className='channel-delete-leave' onClick={handleDeleteChannel}>Delete channel</span></div>
      }
      {(user.id !== organizer_id && member_ids.includes(user.id) && channel.id !== 1) &&
        <div className='channel-detail-sections last'><span className='channel-delete-leave' onClick={handleLeaveChannel}>Leave channel</span></div>
      }
      {showEditModal &&
        <Modal onClose={() => setShowEditModal(false)}>
          <EditChannel setShowEditModal={setShowEditModal} channel={channel} />
        </Modal>
      }
    </div>
  )
}
