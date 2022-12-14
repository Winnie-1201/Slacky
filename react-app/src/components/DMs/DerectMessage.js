import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { createDmThunk, getAllMessageThunk } from "../../store/dm";
import ScrollToBottom from "react-scroll-to-bottom";
import "./DirectMessage.css";
import NavBarLoggedIn from "../NavBarLoggedIn";
import SideBar from "../SideBar/SideBar";
import DmBanner from "./DmBanner";
import { getAllGroupsThunk } from "../../store/groups";
import { getUser } from "../../store/session";
let socket;

const DirectMessage = () => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const { groupId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  const group = user.groups.filter((group) => group.id == groupId)[0];
  const all_msgs = group?.group_messages;

  // const newGroup = useSelector((state) => state.group.group);
  const user_groups = useSelector((state) => state.group.userGroups);

  const receiver =
    group?.users[0].username === user.username
      ? group?.users[1]
      : group?.users[0];

  useEffect(() => {
    dispatch(getAllMessageThunk(groupId));
    dispatch(getAllGroupsThunk());
    socket = io();

    socket.on("dm", (chat) => {
      setMessages((messages) => [...messages, chat]);
    });

    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    dispatch(getAllMessageThunk(groupId));
    dispatch(getAllGroupsThunk());
    dispatch(getUser(user.id));
    setMessages([]);
  }, [groupId]);

  const sendChat = async (e) => {
    e.preventDefault();
    if (chatInput !== "") {
      const msgData = {
        content: chatInput,
        groupId: groupId,
      };

      const inputUser = {
        image_url: user.image_url,
        username: user.username,
      };

      const newDm = await dispatch(createDmThunk(msgData));

      const msg = {
        content: newDm.direct_message.content,
        created_at: newDm.direct_message.created_at,
        updated_at: newDm.direct_message.updated_at,
        user: inputUser,
      };

      socket.emit("dm", {
        msg: msg,
        // user: inputUser,
        room: groupId,
      });

      setChatInput("");
    }
  };

  if (!group)
    return (
      <div className="loading-dm">
        <p>Loading...</p>
      </div>
    );

  return (
    user && (
      <div className="landing-grid">
        <div className="grid-nav-top"></div>
        <div className="grid-nav-top">
          <NavBarLoggedIn user={user} />
        </div>
        <div className="grid-sidebar">
          <SideBar user={user} />
        </div>
        <div className="grid-main-view">
          <DmBanner receiver={receiver} />
          <div className="all-msg-container">
            {/* <div className="chat-body"> */}
            <ScrollToBottom className="chat-body">
              <div className="history-msg">
                {all_msgs?.map((message, ind) => (
                  <div key={ind} className="flex-msg-container">
                    <div className="user-icon-container">
                      <img
                        className="user-icon"
                        src={message.user.image_url}
                        alt="user icon"
                      />
                    </div>
                    <div className="msg-text-container">
                      {/* change the username to button later */}
                      <span className="msg-username">
                        {message.user.username}
                      </span>
                      &nbsp;&nbsp;
                      <span className="msg-sendtime">
                        {new Date(message.created_at).getHours()}:
                        {new Date(message.created_at).getMinutes()}{" "}
                        {new Date(message.created_at).getHours() > 12
                          ? "PM"
                          : "AM"}
                      </span>
                      <div className="msg-detail-container">
                        <div className="msg-detail">{message.content}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="new-msg-container">
                {messages.map((message, ind) => (
                  <div key={ind} className="flex-msg-container">
                    <div className="user-icon-container">
                      <img
                        className="user-icon"
                        src={message.user.image_url}
                        alt="user icon"
                      />
                    </div>
                    <div className="msg-text-container">
                      {/* change the username to button later */}
                      <span className="msg-username">
                        {message.user.username}
                      </span>
                      &nbsp;&nbsp;
                      <span className="msg-sendtime">
                        {new Date(message.created_at).getHours()}:
                        {new Date(message.created_at).getMinutes()}{" "}
                        {new Date(message.created_at).getHours() > 12
                          ? "PM"
                          : "AM"}
                      </span>
                      <div className="msg-detail-container">
                        <div className="msg-detail">{message.content}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* <div key={ind}>{`${message.user}: ${message.msg}`}</div> */}
              </div>
            </ScrollToBottom>
            <div className="cm-input-container">
              <div className="cm-input-block">
                <form onSubmit={sendChat} className="cm-form">
                  {/* <div className="cm-error-box">
            <ul>
              {errors.map((error, idx) => (
                <li key={`cmError-${idx + 1}`}>{error}</li>
              ))}
            </ul>
          </div> */}
                  <div className="cm-input-top">
                    <div className="cm-input-top-box">
                      <i className="fa-solid fa-bold"></i>
                    </div>
                    <div className="cm-input-top-box">
                      <i className="fa-solid fa-italic" />
                    </div>
                    <div className="cm-input-top-box">
                      <i className="fa-solid fa-strikethrough" />
                    </div>
                  </div>
                  <div className="cm-input-box">
                    <textarea
                      rows={3}
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      required
                      className="cm-input"
                    />
                  </div>
                  <div className="cm-input-bottom">
                    <div className="cm-input-botton-left"></div>
                    <div className="cm-submit-box">
                      <button
                        type="submit"
                        className={`cm-submit-button-highlight-${
                          chatInput != ""
                        }`}
                      >
                        <i className="fa-solid fa-paper-plane fa-lg"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* <div className="chat-footer-container">
              <div className="chat-footer">
                <div className="form-top-flex"></div>
                <div className="form-middle">
                  <input
                    className="form-input"
                    placeholder={`Message ${
                      group.users[0].username === user.username
                        ? group.users[1].username
                        : group.users[1].username
                    }`}
                    value={chatInput}
                    onChange={updateChatInput}
                  />
                </div>
                <div className="form-bottom">
                  <i className="fa-solid fa-paper-plane" onClick={sendChat} />
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    )
  );
};

export default DirectMessage;
