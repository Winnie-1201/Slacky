import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './AddMember.css';
import { editChannel } from '../../store/channels';
import { useDispatch } from 'react-redux';
import { getUser } from '../../store/session';

export default function AddMember({ setShowModal, channel }) {
    const user = useSelector((state) => state.session.user);
    const [users, setUsers] = useState([]);
    const [nonMembers, setNonMembers] = useState([]);
    const [errors, setErrors] = useState({});

    async function fetchAllUsers() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
    }

    const dispatch = useDispatch()
    const onAddMember = async (e) => {
        e.preventDefault()
        // console.log(e.currentTarget.value)
        const memberId = parseInt(e.currentTarget.value)
        const members = channel.channel_members;
        const memberIds = []
        for (const member of members) {
            memberIds.push(member.id)
        }
        memberIds.push(memberId)

        console.log('users string sending to backend:', memberIds)
        const edit_channel = {
            id: channel.id,
            name: channel.name,
            description: channel.description,
            topic: channel.topic,
            is_public: channel.is_public,
            users: memberIds.join(',')
        }
        console.log('edit channel sending to backend', edit_channel, channel)


        const data = await dispatch(editChannel(edit_channel)).then(() => {
            // setShowModal(false)
            dispatch(getUser(user.id))
        })

        if (data) {
            setErrors(errors => {
                errors.backend = data
                return errors
            })
        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, []);

    // console.log(memberIds)

    useEffect(() => {
        const members = channel.channel_members;
        const member_ids = []
        for (const member of members) {
            member_ids.push(member.id)
        }
        
        const diff = []
        for (const user of users) {
            if (!(member_ids.includes(user.id))) {
                diff.push(user)
            }
        }

        setNonMembers([...diff])
    }, [channel, users, user]);

  return (
    <div className='add-member-div'>
        <div className='add-member-header'>
            <span>Add people to {`${channel.name}`}</span>
            <span>X</span>
        </div>
        {nonMembers.length === 0 &&
            <div>All users are part of this channel.</div>
        }
        {nonMembers?.map(user => {
            return (
                <div className='channel-detail-member-div' key={`${user.id}`}>
                    {user.image_url ?
                        <span style={{ 'height': '36px', 'width': '36px', 'borderRadius': '4px', 'overflow': 'hidden' }}>
                            <img style={{ 'height': '36px', 'width': '36px', 'borderRadius': '4px', 'overflow': 'hidden', 'objectFit': 'cover' }} src={`${user.image_url}`} alt={`${user.name}`}></img>
                        </span>
                        :
                        <span>{user.name.slice(0)}</span>
                    }
                    <span>{user.username}</span>

                    {user.is_active && <i className="fa-solid fa-circle" style={{ 'color': '#007a5a', 'width': '15px', 'height': 'auto', 'fontSize': '10px' }}></i>}
                    {!user.is_active && <i className="fa-regular fa-circle" style={{ 'width': '15px', 'height': 'auto', 'fontSize': '10px' }}></i>}

                    <button onClick={onAddMember} value={`${user.id}`}>Add</button>
                </div>
            )
        })}
    </div>
  )
}
