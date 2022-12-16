import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./EditChannel.css";
import { addUserChannel, getOneChannel } from "../../store/channels";
import { useDispatch } from "react-redux";
import { getUser } from "../../store/session";
import ChannelModalHeader from "./ChannelModalHeader";
import MemberSearchRow from "./MemberSearchRow";
import './AddMember.css'

export default function AddMember({ setShowModal, channel }) {
  const user = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.session.users);
  const [matchedUsers, setMatchedUsers] = useState([])
  const [searchUsername, setSearchUsername] = useState("");
  const [selectedUser, setSelectedUser] = useState({});
  const [selected, setSelected] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const onAddMember = async (e) => {
    e.preventDefault();

    const data = await dispatch(
      addUserChannel({
        user_id: e.currentTarget.value,
        channel_id: channel.id,
      })
    );

    if (data) {
      setErrors((errors) => {
        errors.backend = data;
        return errors;
      });
    } else {
      setShowModal(false)
      dispatch(getUser(user.id));
      dispatch(getOneChannel(channel.id));
    }
  };


  useEffect(() => {
    if (!searchUsername.length) {
      setSelected(false)
    }

    let matched = []
    // console.log('userinput', searchUsername)
    // console.log('all users', users)
    if (users?.length && searchUsername.length) {
      matched = users.filter((user) => {
        // console.log('user.username.length', searchUsername.length)
        return user.username.toLowerCase().startsWith(searchUsername.toLowerCase())
      })
    }
    
    // console.log('setting matched users', matched)
    setMatchedUsers([...matched])

    // console.log('useEffect end')

  }, [searchUsername, users])

  const handleClick = (user) => {
    // console.log('handle click----------', user)
    setSearchUsername(user.username)
    setSelectedUser(user)
    setSelected(true)
  };

  return (
    <div className="add-member-div">
      <ChannelModalHeader setShowModal={setShowModal} headerName={`Add people to ${channel?.name}`} headerContent=""/>
      <div className="add-member-div-sub">
        <input
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
          className="member-search-input"
          placeholder="@somebody in the current workplace"
          />
        {/* {console.log(selected)}
        {console.log(matchedUsers)} */}
        {/* {console.log(selected)} */}

        {matchedUsers.length > 0 && !selected &&
          <div className="search-result-div">
            {matchedUsers?.length &&
              matchedUsers.map((user) => {
                return (
                  channel?.channel_members_ids?.includes(user.id) ?
                    <div key={`${user.username}`} className="member-search-row-div">
                      <MemberSearchRow user={user} />
                      <span>Already a member.</span>
                    </div> : 
                    <div key={`${user.username}`} onClick={() => handleClick(user)} className="member-search-row-div">
                      <MemberSearchRow user={user} />
                    </div>
                )
              })
            }
          </div>
        }
        <div className='create-channel-button-div'>
          <button className='modal-submit-button' type='submit' onClick={onAddMember} value={`${selectedUser.id}`}>Add</button>
        </div>
      </div>
      {/* {nonMembers.length === 0 && (
        <div style={{ paddingLeft: "24px" }}>
          All users are part of this channel.
        </div>
      )} */}
      {/* <div className="channel-detail-members">
        {nonMembers?.map((user) => {
          return (
            <div className="channel-detail-member-div" key={`${user.id}`}>
              {user.image_url ? (
                <span
                  style={{
                    height: "36px",
                    width: "36px",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    style={{
                      height: "36px",
                      width: "36px",
                      borderRadius: "4px",
                      overflow: "hidden",
                      objectFit: "cover",
                    }}
                    src={`${user.image_url}`}
                    alt={`${user.name}`}
                  ></img>
                </span>
              ) : (
                <span>
                  <button
                    style={{
                      height: "36px",
                      width: "36px",
                      borderRadius: "4px",
                      overflow: "hidden",
                      border: "none",
                    }}
                  >
                    <i className="fa-solid fa-user"></i>
                  </button>
                </span>
              )}

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

              <button onClick={onAddMember} value={`${user.id}`}>
                Add
              </button>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}
