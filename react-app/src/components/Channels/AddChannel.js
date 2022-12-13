import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect} from 'react-router-dom';
import './AddChannel.css';
import { createChannel } from '../../store/channels';
import { getUser } from '../../store/session';
import ChannelModalHeader from './ChannelModalHeader';

export default function AddChannel({ setShowModal }) {
    const user = useSelector((state) => state.session.user);
    const new_channel = useSelector((state) => state.channels.channel);

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [is_public, setIsPublic] = useState(true);
    const [onSubmit, setOnSubmit] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState({});

    const onCreateChannel = async (e) => {
        e.preventDefault();
        setOnSubmit(true)
        if (Object.keys(errors).length) {
            // console.log('has errors', errors)
            return
        }

        // console.log('sending dispatch')
        const data = await dispatch(createChannel({
            name,
            description,
            is_public,
            organizer: user,
            users:`${user.id}`
        })).then(() => {
            setShowModal(false)
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
    
        // console.log('useEffect, validation error length', Object.keys(validationErros).length, validationErros)
        if (!Object.keys(validationErros).length) {
            // console.log('set disabled to false')
            setDisabled(false)
        } else {
            setDisabled(true)
        }
        // console.log('&&&&&&&&&', disabled)
    }, [name, description])

    if (new_channel) return (
        <Redirect push to={`/channels/${new_channel.id}`}/>
    )

  return (
    <div className='channel-create-div'>
          <ChannelModalHeader setShowModal={setShowModal} headerName='Create a channel' headerContent='Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.' />

        <form className='channel-create-form' onSubmit={onCreateChannel}>
            <div className='create-channel-inputs-div'>
                <div className="create-channel-labels-div">
                    <label>Name</label>
                    {onSubmit && errors.name && <span>{errors.name}</span>}
                </div>

                <input
                    type='text'
                    name='name'
                    onChange={e => setName(e.target.value)}
                    value={name}
                    placeholder='e.g. plan-budget'
                ></input>

            </div>
            <div className='create-channel-inputs-div'>
                <div className="create-channel-labels-div">
                    <label>Description <span className='optional-note-span'>(optional)</span></label>
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
                <div className="create-channel-labels-div">
                    <label>Make private</label>
                </div>
                <input
                    type='checkbox'
                    name='is_public'
                    onChange={e => setIsPublic(e.target.value)}
                    value={is_public}
                ></input>
            </div>
            <div className='create-channel-button-div'>
                <button type='submit' disabled={disabled}>Create</button>
                <div>
                    {errors.backend?.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
            </div>            
        </form>
    </div>
  )
}
