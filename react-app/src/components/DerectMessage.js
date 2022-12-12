import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { createDmThunk, getAllMessageThunk } from "../store/dm";
let socket;

const DirectMessage = () => {
  console.log("go in");
  const currentUser = useSelector((state) => state.session.user);
  const { groupId } = useParams();
  const dispatch = useDispatch();

  const [currentMessage, setCurrentMessage] = useState("");

  const group = currentUser.groups.filter((group) => group.id == groupId);
  const messagesList = group[0].group_messages;

  const handleDirectMessage = async () => {
    if (currentMessage !== "") {
      const msgData = {
        group: group,
        sender: currentUser,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      socket = io();

      if (socket) {
        await socket.emit("dm", msgData);
      }

      const data = {
        groupId,
        content: msgData,
      };

      await dispatch(createDmThunk(data));
      setCurrentMessage("");
    }
  };

  console.log("goin two");
  useEffect(() => {
    socket = io();
    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <div className="dm_header"></div>
      <div className="dm_body">
        {messagesList &&
          messagesList.map((message) => (
            <div key={message.id}>{message.content}</div>
          ))}
      </div>
      <div className="dm_footer">
        <form onSubmit={handleDirectMessage}>
          <input
            value={currentMessage}
            type="text"
            onChange={setCurrentMessage}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default DirectMessage;
