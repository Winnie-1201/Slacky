import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { createDmThunk, getAllMessageThunk } from "../store/dm";
import ScrollToBottom from "react-scroll-to-bottom";
import "./DirectMessage.css";
let socket;

const DirectMessage = () => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const { groupId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const group = user.groups.filter((group) => group.id === groupId);

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();

    socket.on("dm", (chat) => {
      setMessages((messages) => [...messages, chat]);
    });

    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, []);

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
      <div>
        <ScrollToBottom>
          <div>
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
                  <span className="msg-username">{message.user.username}</span>
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
        <form onSubmit={sendChat}>
          <input value={chatInput} onChange={updateChatInput} />
          <button type="submit">Send</button>
        </form>
      </div>
    )
  );
};

export default DirectMessage;
