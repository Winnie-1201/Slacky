import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
let socket;

const SocketTest = () => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    // open socket connection
    // create websocket
    socket = io();

    socket.on("chat", (chat) => {
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

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { user: user.username, msg: chatInput });
    setChatInput();
  };

  return (
    user && (
      <div>
        <div>
          {messages.map((message, ind) => (
            <div key={ind}>{`${message.user}: ${message.msg}`}</div>
          ))}
        </div>
        <form onSubmit={sendChat}>
          <input value={chatInput} onChange={updateChatInput} />
          <button type="submit">Send</button>
        </form>
      </div>
    )
  );
};

export default SocketTest;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { io } from "socket.io-client";
// import { createDmThunk, getAllMessageThunk } from "../store/dm";
// let socket;

// const DirectMessage = () => {
//   console.log("go in");
//   const currentUser = useSelector((state) => state.session.user);
//   const { groupId } = useParams();
//   const dispatch = useDispatch();

//   const [currentMessage, setCurrentMessage] = useState("");
//   const [messagesList, setMessageList] = useState([]);

//   const group = currentUser.groups.filter((group) => group.id == groupId);
//   // const messagesList = group[0].group_messages;

//   const handleDirectMessage = async () => {
//     if (currentMessage !== "") {
//       const msgData = {
//         group: group,
//         sender: currentUser,
//         message: currentMessage,
//         time:
//           new Date(Date.now()).getHours() +
//           ":" +
//           new Date(Date.now()).getMinutes(),
//       };

//       // if (socket) {
//       await socket.emit("dm", msgData);
//       // }

//       const data = {
//         groupId,
//         content: msgData,
//       };

//       await dispatch(createDmThunk(data));
//       setCurrentMessage("");
//     }
//   };

//   console.log("goin two");
//   useEffect(() => {
//     socket = io();

//     socket.on("dm", (chat) => {
//       setMessageList((msg) => [...msg, chat]);
//     });

//     return () => socket.disconnect();
//   }, []);

//   return (
//     <div>
//       <div className="dm_header"></div>
//       <div className="dm_body">
//         {messagesList &&
//           messagesList.map((message) => (
//             <div key={message.id}>{message.content}</div>
//           ))}
//       </div>
//       <div className="dm_footer">
//         <form onSubmit={handleDirectMessage}>
//           <input
//             value={currentMessage}
//             type="text"
//             onChange={setCurrentMessage}
//           />
//           <button type="submit">Send</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default DirectMessage;
