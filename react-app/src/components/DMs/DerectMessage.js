import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { createDmThunk } from "../../store/dm";
import ScrollToBottom from "react-scroll-to-bottom";
import "./DirectMessage.css";
import NavBarLoggedIn from "../NavBarLoggedIn";
import SideBar from "../SideBar/SideBar";
import DmBanner from "./DmBanner";
import {
  getCurrentUserGroupsThunk,
  getOneGroupThunk,
} from "../../store/groups";
import Footer from "../Footer/Footer";
import { dateTransfer } from "./dateTransfer";
import { useSocket } from "../../context/SocketContext";

const DirectMessage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const socket = useSocket();
  const { groupId } = useParams();

  const user = useSelector((state) => state.session.user);
  const currGroup = useSelector((state) => state.group.currGroup);

  const all_msgs = currGroup?.group_messages;
  const receiver =
    currGroup?.users[0].username === user?.username
      ? currGroup?.users[1]
      : currGroup?.users[0];

  useEffect(async () => {
    await dispatch(getOneGroupThunk(groupId));

    socket.on("dm", async (chat) => {
      setMessages((messages) => [...messages, chat]);
    });

    // when component unmounts, disconnect
    return () => {
      socket.emit("leave", { room: groupId, user: user });
      // socket.disconnect();
    };
  }, []);

  useEffect(async () => {
    socket.emit("join", { user: user, room: groupId });
    setMessages([]);

    await dispatch(getOneGroupThunk(groupId));
    // await dispatch(getCurrentUserGroupsThunk(user.id));
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
        room: groupId,
      });

      setChatInput("");
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendChat(e);
    }
  };

  if (!currGroup)
    return (
      <div className="loading-dm">
        <p>Loading...</p>
      </div>
    );

  if (!user) {
    history.push("/");
  }

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
          <ScrollToBottom className="chat-body">
            <div className="all-msg-container flex-column">
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
              {messages.length > 0 &&
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
                ))}
            </div>
          </ScrollToBottom>
          <div className="cm-input-container">
            <div className="cm-input-block">
              <form
                onSubmit={sendChat}
                className="cm-form"
                onKeyUp={handleEnter}
              >
                {/* <div className="cm-input-top">
                  <div className="cm-input-top-box">
                    <i className="fa-solid fa-bold"></i>
                  </div>
                  <div className="cm-input-top-box">
                    <i className="fa-solid fa-italic" />
                  </div>
                  <div className="cm-input-top-box">
                    <i className="fa-solid fa-strikethrough" />
                  </div>
                </div> */}
                <div className="cm-input-box">
                  <textarea
                    rows={3}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    required
                    className="cm-input"
                    // onKeyPress={onkeyup}
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
