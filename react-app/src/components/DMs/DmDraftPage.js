import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { createDmThunk } from "../../store/dm";
import { CreateGroupThunk, getAllGroupsThunk } from "../../store/groups";
import { getAllUser, getReceiver, getUser } from "../../store/session";
import Footer from "../Footer/Footer";
import NavBarLoggedIn from "../NavBarLoggedIn";
import SideBar from "../SideBar/SideBar";
import DmBanner from "./DmBanner";
import "./DmDraftPage.css";

function DmDraftPage() {
  // const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { receiverId } = useParams();

  const user = useSelector((state) => state.session.user);
  let receiver = useSelector((state) => state.session.users);
  // const users = useSelector((state) => state.session.users);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    dispatch(getReceiver(receiverId));
  }, [dispatch]);

  const sendChat = async (e) => {
    e.preventDefault();
    const groupInfo = {
      users: `${user.id}` + "," + `${receiver.id}`,
    };

    await dispatch(CreateGroupThunk(groupInfo)).then((data) => {
      const msgData = {
        content: chatInput,
        groupId: data.id,
      };

      dispatch(createDmThunk(msgData)).then(() => {
        dispatch(getAllGroupsThunk());
        history.push(`/groups/${data.id}`);
      });
    });
  };

  // let receiver;

  // if (users) {
  //   receiver = users.filter((user) => user.id == receiverId)[0];
  // }

  if (!receiver) return null;

  return (
    user &&
    receiver && (
      <div className="landing-grid">
        <div className="grid-nav-top"></div>
        <div className="grid-nav-top">
          <NavBarLoggedIn user={user} />
        </div>
        <div className="grid-sidebar">
          <SideBar user={user} />
        </div>
        <div className="grid-main-view">
          <DmBanner receiver={receiver} new_receiver={true} />
          <div className="draft-box flex-column">
            <div className="plr-20 mb-20">
              <div className="draft-receiver flex-row">
                <span className="user-icon-container">
                  <img className="user-icon-img" src={receiver.image_url} />
                </span>
                <div className="user-name-status flex-row">
                  <span className="user-name">{receiver.username}</span>
                  <span
                    className={`user-active ${
                      receiver.is_online ? "is-active" : ""
                    }`}
                  ></span>
                </div>
              </div>
              <div className="none">
                This conversation is just between the two of you. Here you can
                send messages with @{receiver.username}
              </div>
            </div>
            <div className="cm-input-container">
              <div className="cm-input-block">
                <form onSubmit={sendChat} className="cm-form">
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
        </div>
        <div className="grid-footer">
          <Footer />
        </div>
      </div>
    )
  );
}

export default DmDraftPage;
