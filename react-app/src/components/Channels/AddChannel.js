import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './AddChannel.css';

export default function AddChannel({ setShowModal }) {
    const user = useSelector((state) => state.session.user);

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [is_public, setIsPublic] = useState(true);
    const [onSubmit, setOnSubmit] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState({});

    const createChannel = async (e) => {
        e.preventDefault();
        setOnSubmit(true)

        // const data = await dispatch(signUp(username, email, password));
        // if (data) {
        //     setErrors(data)
        // }

    };

    useEffect(() => {
      if (name.length <= 0) {
        setDisabled(true)
        errors.name = "Don’t forget to name your channel."
      } else if (name.length > 80) {
        setDisabled(true)
        errors.name = "Channel names can’t be longer than 80 characters."
      } else {
        delete errors.name
      }

        if (description.length <= 0) {
            setDisabled(true)
            errors.description = "This field can’t be more than 250 characters."
        } else {
            delete errors.description
        }
    
        if (Object.keys(errors).length === 0) {
            setDisabled(false)
        }

    }, [name, description])
    

  return (
    <div className='channel-create-div'>
        <div className='channel-create-header'>
            <span>Create a channel</span>
            <span>X</span>
            <span>Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.</span>
        </div>

        <form className='channel-create-form'>
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
                    <label>Make private</label>
                </div>
                <input
                    type='checkbox'
                    name='is_public'
                    onChange={e => setDescription(e.target.value)}
                    value={is_public}
                ></input>
            </div>
            <div className='create-channel-button-div'>
                <button type='submit' disabled={disabled}>Create</button>
            </div>            
        </form>
    </div>
  )
}
