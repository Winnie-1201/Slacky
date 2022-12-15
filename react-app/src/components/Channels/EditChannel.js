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
  const [onFocus, setOnFocus] = useState(false)
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState({});
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState('');
  const [topicError, setTopicError] = useState('');

  useEffect(() => {
    setName(channel.name)
    setTopic(channel.topic || '')
    setDescription(channel.description || '')

  }, [channel])

  const onEditChannel = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length) {
      return
    }

    const data = await dispatch(editChannel({
      id: channel.id,
      name,
      description,
      topic,
    }))

    if (data) {
      setErrors(data)
    } else {
      setShowEditModal(false)
      dispatch(getUser(user.id))
    }

  };

  useEffect(() => {
    const validationError = {}

    if (name.length <= 0) {
      setNameError("Don’t forget to name your channel.");
      setErrors(prev => {
        delete prev.name
        return prev
      })
      validationError.name = "Don’t forget to name your channel."
    } else if (name.length > 80) {
      setNameError("Channel names can’t be longer than 80 characters.");
      validationError.name = "Channel names can’t be longer than 80 characters."
    }
    else {
      setNameError("")
      delete validationError.name
    }

    if (description.length > 250) {
      setDescriptionError("This field can’t be more than 250 characters.");
      validationError.description = "This field can’t be more than 250 characters.";
    } else {
      setDescriptionError('')
      delete validationError.description
    }

    if (topic.length > 250) {
      setTopicError("This field can’t be more than 250 characters.");
      validationError.topic = "This field can’t be more than 250 characters.";
    } else {
      setTopicError('')
      delete validationError.topic
    }

    // console.log(validationError)
    if (Object.keys(validationError).length) {
      // console.log('set disabled to true')
      setDisabled(true)
    } else {
      // console.log('set disabled to false')
      setDisabled(false)
    }

  }, [name, description, topic])

  const handleNameChange = (e) => {
    setName(e.target.value)
    setOnFocus(true)
  }

  return (
    <div className='channel-create-div'>
      <ChannelModalHeader setShowModal={setShowEditModal} headerName='Edit a channel' headerContent='' />

      <form className='channel-create-form' onSubmit={onEditChannel}>
        <div className='create-channel-inputs-div'>
          <div className="create-channel-labels-div">
            <label htmlFor='name'>Name
              {onFocus && nameError.length > 0 && <span className='channel-form-error-span'>{nameError}</span>}
              {nameError.length === 0 && errors.name && <span className='channel-form-error-span'>{errors.name}</span>}
            </label>
          </div>

          <input
            type='text'
            name='name'
            onChange={handleNameChange}
            value={name}
          ></input>
        </div>

        <div className='create-channel-inputs-div'>
          <div className="create-channel-labels-div">
            <label htmlFor='name'>Topic
              <span className='optional-note-span'>(optional)</span>
              {topicError.length > 0 && <span className='channel-form-error-span'>{topicError}</span>}
            </label>
          </div>
          <input
            type='text'
            name='topic'
            onChange={(e) => setTopic(e.target.value)}
            value={topic}
          ></input>
          <span className='optional-note-span'>Let people know what #general is focused on right now (ex. a project milestone). Topics are always visible in the header.</span>
        </div>

        <div className='create-channel-inputs-div'>
          <div className="create-channel-labels-div">
            <label htmlFor='description'>Description
              <span className='optional-note-span'>(optional)</span>
              {descriptionError.length > 0 && <span className='channel-form-error-span'>{descriptionError}</span>}
            </label>
          </div>
          <input
            type='text'
            name='description'
            onChange={e => setDescription(e.target.value)}
            value={description}
          ></input>
          <span className='optional-note-span'>Let people know what this channel is for.</span>
        </div>
        
        <div className='create-channel-button-div'>
          <button className='modal-submit-button' type='submit' disabled={disabled}>Save</button>
        </div>
      </form>
    </div>
  )
}
