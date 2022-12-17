import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect} from 'react-router-dom';
import './AddChannel.css';
import { createChannel } from '../../store/channels';
import { getUser } from '../../store/session';
import ChannelModalHeader from './ChannelModalHeader';

export default function AddChannel({ setShowModal }) {
    // console.log('---------- AddChannel Component -----------')
    const user = useSelector((state) => state.session.user);
    const [newChannel, setNewChannel] = useState({});
    
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [onFocus, setOnFocus] = useState(false)
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState({});
    const [nameError, setNameError] = useState("Don’t forget to name your channel.");
    const [descriptionError, setDescriptionError] = useState('');
    
    // console.log('is public', isPublic)
    const onCreateChannel = async (e) => {
        e.preventDefault();
        if (nameError || descriptionError) {
            return
        }
        
        const data = await dispatch(createChannel({
            name,
            description,
            is_public: isPublic ? "True" : "False",
            organizer: user,
            users:`${user.id}`
        }))
        
        if (data.newChannel) {
            setNewChannel(data.newChannel)
            dispatch(getUser(user.id))
            setShowModal(false)
        } else {
            setErrors(data)
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
    
        // console.log(validationError)
        if (Object.keys(validationError).length) {
            // console.log('set disabled to true')
            setDisabled(true)
        } else {
            // console.log('set disabled to false')
            setDisabled(false)
        }

        return () => {
            setNameError('')
            setDescriptionError('')
        }

    }, [name, description])

    
    const handleNameChange = (e) => {
        setName(e.target.value)
        setOnFocus(true)
    }

    if (newChannel.id) {
        return (
            <Redirect push to={`/channels/${newChannel.id}`} />
        )
    }

  return (
    <div className='channel-create-div'>
          <ChannelModalHeader setShowModal={setShowModal} headerName='Create a channel' headerContent='Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.' />

        <form className='channel-create-form' onSubmit={onCreateChannel}>
            <div className='create-channel-inputs-div'>
                <div className="create-channel-labels-div">
                    <label htmlFor='name'>Name
                        {onFocus && nameError.length > 0 && <span className='channel-form-error-span'>{nameError}</span>}
                        {nameError.length === 0 && errors.name && <span className='channel-form-error-span'>{errors.name}</span> }
                    </label>
                </div>

                <input
                    type='text'
                    name='name'
                    onChange={handleNameChange}
                    value={name}
                    placeholder='e.g. plan-budget'
                ></input>

            </div>
            <div className='create-channel-inputs-div'>
                <div className="create-channel-labels-div">
                    <label htmlFor='description'>Description 
                        <span className='optional-note-span'>(optional)
                        </span>
                        {descriptionError.length > 0 && <span className='channel-form-error-span'>{descriptionError}</span>}
                    </label>
                </div>
                <input
                    type='text'
                    name='description'
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                ></input>
                <span className='optional-note-span'>What’s this channel about?</span>
            </div>
            <div className='create-channel-inputs-div'>
                <div className="create-channel-labels-div">
                    <span>Make private</span>
                </div>
                <div className='create-channel-privacy-div'>
                    {isPublic ?
                        <span>When a channel is set to private, it can only be viewed or joined by invitation.</span>
                        :
                        <span><b>This can’t be undone.</b> A private channel cannot be made public later on.</span>
                    }
                    <label className='privacy-slider-switch'>
                        <input
                            type='checkbox'
                            name='isPublic'
                            onChange={() => setIsPublic(prev => !prev)}
                            value={isPublic}
                            checked={!isPublic}
                        ></input>
                        <span className='privacy-slider'></span>
                    </label>
                </div>
            </div>
            <div className='create-channel-button-div'>
                <button className='modal-submit-button' type='submit' disabled={disabled}>Create</button>
            </div>            
        </form>
    </div>
  )
}
