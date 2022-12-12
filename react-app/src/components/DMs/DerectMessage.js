import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { createDmThunk, getAllMessageThunk } from "../../store/dm";
import ScrollToBottom from "react-scroll-to-bottom";
import "./DirectMessage.css";
import NavBarLoggedIn from "../NavBarLoggedIn";
import SideBar from "../SideBar/SideBar";
import ChannelBanner from "../Channels/ChannelBanner";
let socket;

const DirectMessage = () => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const { groupId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const group = user.groups.filter((group) => group.id == groupId)[0];
  const all_msgs = group.group_messages;

  useEffect(() => {
    dispatch(getAllMessageThunk(groupId));
    // open socket connection
    // create websocket
    socket = io();
    socket.emit("join_room", group);

    socket.on("dm", (chat) => {
      setMessages((msg) => [...msg, chat]);
    });

    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("dm", (chat) => {
  //       setMessages((messages) => [...messages, chat]);
  //     });
  //   }
  //   return () => {
  //     socket.off("dm", (data) => {
  //       console.log("data event was remove");
  //     });
  //   };
  // }, [socket, messages]);

  const updateChatInput = (e) => {
    setChatInput(e.target.value);
  };

  const sendChat = async (e) => {
    e.preventDefault();
    if (chatInput !== "") {
      const msgData = {
        content: chatInput,
        groupId: groupId,
      };

      const newDm = await dispatch(createDmThunk(msgData));
      // console.log("newDm", newDm);
      socket.emit("dm", { user: user, msg: newDm.direct_message });
      setChatInput("");
    }
  };

  return (
    // define the size of the show message area
    // set scroll hidden properties
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
          <ChannelBanner user={user} />
          <div className="all-msg-container">
            {/* <div className="chat-body"> */}
            <ScrollToBottom className="chat-body">
              <div className="history-msg">
                {all_msgs.map((message, ind) => (
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
                        {new Date(message.msg.created_at).getHours()}:
                        {new Date(message.msg.created_at).getMinutes()}{" "}
                        {new Date(message.msg.created_at).getHours() > 12
                          ? "PM"
                          : "AM"}
                      </span>
                      <div className="msg-detail-container">
                        <div className="msg-detail">{message.msg.content}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* <div key={ind}>{`${message.user}: ${message.msg}`}</div> */}
              </div>
            </ScrollToBottom>

            <div className="chat-footer-container">
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
                  {/* <button onSubmit={sendChat}>Send</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    )
  );
};

export default DirectMessage;
