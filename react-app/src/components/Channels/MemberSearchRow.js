import React from 'react'
import './MemberSearchRow.css'

export default function MemberSearchRow({user}) {
  // console.log(user)
  // console.log(user.id)
  return (
    <>
    {user.image_url ? (
      <span className='member-search-row-span'>
        <img src={`${user.image_url}`} alt={`${user.name}`}></img>
      </span>
    ) : (
      <span className='member-search-row-span'>
        <button> <i className="fa-solid fa-user"></i></button>
      </span>
    )}
    {/* {console.log(user)} */}
    <span>{user.username}</span>

    {user.is_online && (
      <i
        className="fa-solid fa-circle"
        style={{
          color: "#007a5a",
          width: "15px",
          height: "auto",
          fontSize: "10px",
        }}
      ></i>
    )}
    {!user.is_online && (
      <i
        className="fa-regular fa-circle"
        style={{ width: "15px", height: "auto", fontSize: "10px" }}
      ></i>
    )}

    </>
  )
}
