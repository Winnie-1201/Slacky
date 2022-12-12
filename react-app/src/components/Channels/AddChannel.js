import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './AddChannel.css';
import { createChannel } from '../../store/channel';

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
        if (Object.keys(errors).length) {
            console.log('has errors', errors)
            return
        }

        const data = await dispatch(createChannel({
            name,
            description,
            is_public,
            organizer: user
        }));

        if (data) {
            setErrors(errors => {
                errors.backend = data
                return errors
            })
        }

    };

    console.log('error:', errors)
    console.log('name', name)

    useEffect(() => {
      if (name.length <= 0) {
        setErrors(errors => {
            errors.name = "Don’t forget to name your channel."
            return errors
        })
      } else if (name.length > 80) {
        setErrors(errors => {
            errors.name = "Channel names can’t be longer than 80 characters."
            return errors
        })
      } else {
        setErrors(errors => {
            delete errors.name
            return errors
        })
      }

        // if (description.length > 250) {
        //     setErrors(errors => {
        //         errors.description = "This field can’t be more than 250 characters."
        //         return errors
        //     })      
        // } else {
        //     setErrors(errors => {
        //         delete errors.description
        //         return errors
        //     })
        // }
    
        console.log(Object.keys(errors).length, errors)
        if (!Object.keys(errors).length) {
            console.log('set disabled to false')
            setDisabled(false)
        }
        console.log('&&&&&&&&&', disabled)
    }, [name, description])

  return (
    <div className='channel-create-div'>
        <div className='channel-create-header'>
            <span>Create a channel</span>
            <span>X</span>
            <span>Channels are where your team communicates. They’re best when organized around a topic — #marketing, for example.</span>
        </div>

        <form className='channel-create-form'>
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
            </div>            
        </form>
    </div>
  )
}
