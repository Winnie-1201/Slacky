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
import {
  getAllGroupsThunk,
  getCurrentUserGroupsThunk,
} from "../../store/groups";
import { getUser } from "../../store/session";
import Footer from "../Footer/Footer";
import { dateTransfer } from "./dateTransfer";
let socket;

const DirectMessage = () => {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const { groupId } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);
  const [newRoom, setNewRoom] = useState("");

  // const group = user.groups.filter((group) => group.id == groupId)[0];

  // const newGroup = useSelector((state) => state.group.group);
  const user_groups = useSelector((state) => state.group.userGroups);
  const all_groups = useSelector((state) => state.group.allGroups);
  const group = user_groups.filter((group) => group.id == groupId)[0];
  // let all_msgs = group?.group_messages;
  const all_msgs = Object.values(useSelector((state) => state.dm));
  // console.log("gorup", group);

  // console.log("all_groups lengthdd----", all_groups.length);
  const receiver =
    group?.users[0].username === user.username
      ? group?.users[1]
      : group?.users[0];

  useEffect(() => {
    socket = io();

    // socket.emit("join", { user: user, room: groupId });

    socket.on("dm", async () => {
      await dispatch(getCurrentUserGroupsThunk());
      await dispatch(getAllMessageThunk(groupId));
      // setMessages((messages) => [...messages, chat]);
    });

    // when component unmounts, disconnect
    return () => {
      socket.emit("leave", { room: groupId, user: user });
      // socket.off("dm");
      socket.disconnect();
    };
  }, [groupId]);

  useEffect(async () => {
    socket.emit("join", { user: user, room: groupId });
    await dispatch(getAllMessageThunk(groupId));
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
      // dispatch(getAllMessageThunk(groupId));
      // dispatch(getAllGroupsThunk());
      // await dispatch(getCurrentUserGroupsThunk());

      const msg = {
        content: newDm.direct_message.content,
        created_at: newDm.direct_message.created_at,
        updated_at: newDm.direct_message.updated_at,
        user: inputUser,
      };

      // socket.emit("join", ms);

      socket.emit("dm", {
        msg: msg,
        room: groupId,
      });

      setChatInput("");
      // setNewRoom(false);
    }
  };

  if (!group)
    return (
      <div className="loading-dm">
        <p>Loading...</p>
      </div>
    );

  console.log("room", newRoom);
  // console.log("messages", messages);
  // console.log("all messages", all_msgs);

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
          {/* <div className="chat-body"> */}
          <ScrollToBottom className="chat-body">
            <div className="all-msg-container flex-column">
              {/* <div className="history-msg"> */}
              {all_msgs?.map((message, ind) => (
                <>
                  {ind === 0 ||
                  (ind > 0 &&
                    ind < all_msgs.length &&
                    all_msgs[ind].user.username !==
                      all_msgs[ind - 1].user.username) ? (
                    <>
                      <div
                        key={ind}
                        className={`flex-msg-container ${
                          ind < all_msgs.length - 1 &&
                          all_msgs[ind].user.username ===
                            all_msgs[ind + 1].user.username
                            ? ""
                            : "with-mb-24"
                        }`}
                      >
                        <div className="user-icon-container-dm">
                          <img
                            className="user-icon-dm"
                            // src={message.user.image_url}
                            src={message.user.image_url}
                          />
                        </div>
                        <div className="msg-text-container">
                          {/* change the username to button later */}
                          <span className="msg-username">
                            {message.user.username}
                          </span>
                          &nbsp;&nbsp;
                          <span className="msg-sendtime">
                            {dateTransfer("hour", message.created_at)}:
                            {dateTransfer("min", message.created_at)}{" "}
                            {dateTransfer("am", message.created_at)}
                          </span>
                          <div className="msg-detail-container">
                            <div className="msg-detail">{message.content}</div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        key={ind}
                        className="flex-msg-container-without-icon"
                      >
                        <div className="msg-detail-container-without-icon">
                          <div className="msg-detail-without-icon">
                            {message.content}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ))}
              {/* {messages.length > 0 &&
                messages[0] &&
                messages.map((message, ind) => (
                  <>
                    {ind === 0 ||
                    (ind > 0 &&
                      ind < messages.length &&
                      messages[ind].user.username !==
                        messages[ind - 1].user.username) ? (
                      <>
                        <div
                          key={ind}
                          className={`flex-msg-container ${
                            ind < messages.length - 1 &&
                            messages[ind].user.username ===
                              messages[ind + 1].user.username
                              ? ""
                              : "with-mb-24"
                          }`}
                        >
                          <div className="user-icon-container-dm">
                            <img
                              className="user-icon-dm"
                              src={message.user.image_url}
                            />
                          </div>
                          <div className="msg-text-container">
                            <span className="msg-username">
                              {message.user.username}
                            </span>
                            &nbsp;&nbsp;
                            <span className="msg-sendtime">
                              {dateTransfer("hour", message.created_at)}:
                              {dateTransfer("min", message.created_at)}{" "}
                              {dateTransfer("am", message.created_at)}
                            </span>
                            <div className="msg-detail-container">
                              <div className="msg-detail">
                                {message.content}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          key={ind}
                          className="flex-msg-container-without-icon"
                        >
                          <div className="msg-detail-container-without-icon">
                            <div className="msg-detail-without-icon">
                              {message.content}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ))} */}
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
        </div>
        <div className="grid-footer">
          <Footer />
        </div>
      </div>
    )
  );
};

export default DirectMessage;
