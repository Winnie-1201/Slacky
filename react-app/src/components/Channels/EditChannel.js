import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './AddChannel.css';
import { editChannel } from '../../store/channels';
import { getUser } from '../../store/session';
import ChannelModalHeader from './ChannelModalHeader';

export default function EditChannel({ setShowEditModal, channel}) {
  const user = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [onSubmit, setOnSubmit] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setName(channel.name)
    setTopic(channel.topic || '')
    setDescription(channel.description || '')

  }, [channel])

  const onCreateChannel = async (e) => {
    e.preventDefault();
    setOnSubmit(true)
    if (Object.keys(errors).length) {
      // console.log('has errors', errors)
      return
    }

    const members = channel.channel_members;
    const memberIds = []
    for (const member of members) {
      memberIds.push(member.id)
    }

    // console.log('sending dispatch')
    const data = await dispatch(editChannel({
      id: channel.id,
      name,
      description,
      topic,
      users: memberIds.join(',')
    })).then(() => {
      setShowEditModal(false)
      dispatch(getUser(user.id))
    })

    if (data) {
      setErrors(errors => {
        errors.backend = data
        return errors
      })
    }

  };

  useEffect(() => {
    const validationErros = {}

    if (name.length <= 0) validationErros.name = "Don’t forget to name your channel.";
    else if (name.length > 80) validationErros.name = "Channel names can’t be longer than 80 characters.";
    else delete errors.name

    if (description.length > 250) validationErros.description = "This field can’t be more than 250 characters.";
    else delete errors.description

    if (topic.length > 250) validationErros.topic = "This field can’t be more than 250 characters.";
    else delete errors.topic

    // console.log('useEffect, validation error length', Object.keys(validationErros).length, validationErros)
    if (!Object.keys(validationErros).length) {
      // console.log('set disabled to false')
      setDisabled(false)
    } else {
      setDisabled(true)
    }
    // console.log('&&&&&&&&&', disabled)
  }, [name, description, topic])

  // console.log('Edit channel component, ', showMo)

  return (
    <div className='channel-create-div'>
      <ChannelModalHeader setShowModal={setShowEditModal} headerName='Edit a channel' headerContent='' />

      <form className='channel-create-form' onSubmit={onCreateChannel}>
        <div>
          {errors.backend?.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className='create-channel-inputs-div'>
          <div>
            <label>Name</label>
            {onSubmit && errors.name && <span>{errors.name}</span>}
          </div>
          <input
            type='text'
            name='name'
            onChange={e => setName(e.target.value)}
            value={name}
          ></input>
        </div>

        <div className='create-channel-inputs-div'>
          <div>
            <label>Description</label>
            {onSubmit && errors.description && <span>{errors.description}</span>}
          </div>
          <input
            type='text'
            name='description'
            onChange={e => setDescription(e.target.value)}
            value={description}
          ></input>
        </div>

        <div className='create-channel-inputs-div'>
          <div>
            <label>Topic</label>
            {onSubmit && errors.topic && <span>{errors.topic}</span>}
          </div>
          <input
            type='text'
            name='topic'
            onChange={e => setTopic(e.target.value)}
            value={topic}
          ></input>
        </div>

        <div className='create-channel-button-div'>
          <button type='submit' disabled={disabled}>Update</button>
        </div>
      </form>
    </div>
  )
}
