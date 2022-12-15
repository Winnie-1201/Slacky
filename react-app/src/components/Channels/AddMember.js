import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./EditChannel.css";
import { addUserChannel, getOneChannel } from "../../store/channels";
import { useDispatch } from "react-redux";
import { getUser } from "../../store/session";
import ChannelModalHeader from "./ChannelModalHeader";

export default function AddMember({ setShowModal, channel }) {
  const user = useSelector((state) => state.session.user);
  const [users, setUsers] = useState([]);
  const [nonMembers, setNonMembers] = useState([]);
  const [errors, setErrors] = useState({});

  async function fetchAllUsers() {
    const response = await fetch("/api/users/");
    const responseData = await response.json();
    setUsers(responseData.users);
  }

  const dispatch = useDispatch();
  const onAddMember = async (e) => {
    e.preventDefault();

    const data = await dispatch(
      addUserChannel({
        user_id: e.currentTarget.value,
        channel_id: channel.id,
      })
    ).then(() => {
      // setShowModal(false)
      dispatch(getUser(user.id));
      dispatch(getOneChannel(channel.id));
    });

    if (data) {
      setErrors((errors) => {
        errors.backend = data;
        return errors;
      });
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  // console.log(memberIds)

  useEffect(() => {
    const members = channel?.channel_members || [];
    const member_ids = [];
    for (const member of members) {
      member_ids.push(member.id);
    }

    const diff = [];
    for (const user of users) {
      if (!member_ids.includes(user.id)) {
        diff.push(user);
      }
    }

    setNonMembers([...diff]);
  }, [channel, users, user]);

  return (
    <div className="add-member-div">
      <ChannelModalHeader
        setShowModal={setShowModal}
        headerName={`Add people to ${channel?.name}`}
        headerContent=""
      />
      {nonMembers.length === 0 && (
        <div style={{ paddingLeft: "24px" }}>
          All users are part of this channel.
        </div>
      )}
      <div className="channel-detail-members">
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
      </div>
    </div>
  );
}
