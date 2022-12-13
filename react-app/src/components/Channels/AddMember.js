import React, { useState, useEffect } from 'react';
import './AddMember.css';

export default function AddMember({ setShowModal, channel }) {
    const [users, setUsers] = useState([]);
    const [memberIds, setMembersIds] = useState('')
    const [nonMembers, setNonMembers] = useState([]);

    async function fetchAllUsers() {
        const response = await fetch('/api/users/');
        const responseData = await response.json();
        setUsers(responseData.users);
    }

    const onAddMember = (e) => {
        e.preventDefault()
        // console.log(e.currentTarget.value)
        const memberId = parseInt(e.currentTarget.value)
        setMembersIds(prev => [...prev, memberId])

        
    }

    useEffect(() => {
        fetchAllUsers();
    }, []);

    console.log(memberIds)

    useEffect(() => {
        const members = channel.channel_members;
        const member_ids = []
        for (const member of members) {
            member_ids.push(member.id)
        }
        
        setMembersIds([...member_ids])

        const diff = []
        for (const user of users) {
            if (!(member_ids.includes(user.id))) {
                diff.push(user)
            }
        }

        setNonMembers([...diff])
    }, [channel, users]);

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
