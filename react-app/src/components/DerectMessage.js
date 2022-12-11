import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
let socket;

const DirectMessage = () => {
  const currentUser = useSelector((state) => state.session.user);
  const { groupId } = useParams();

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const group = useSelector((state) => state.dm);
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
      if (socket) {
        socket.emit("dm", msgData);
      }

      //   dispatch the data
    }
  };

  useEffect(() => {
    socket = io();
    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <div className="dm_header"></div>
      <div className="dm_body"></div>
      <div className="dm_footer"></div>
    </div>
  );
};

export default DirectMessage;
