import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelMessages } from "../../store/channelMessage";

import ChannelMessageContainer from "./DisplayContainer";
import ChannelMessageInputContainer from "./InputContainer";

import NavBarLoggedIn from "../NavBarLoggedIn";
import SideBar from "../SideBar/SideBar";

import "./index.css";

const ChannelMessagePage = () => {
  const { channelId } = useParams();
  const dispatch = useDispatch();
  const channelMessages = useSelector((state) => state.channelMessages);
  const user = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(fetchChannelMessages(channelId));
  }, [dispatch, channelId]);
  if (!channelId) return null;

  return (
    <div className="landing-grid">
      <div className="grid-nav-top"></div>
      <div className="grid-nav-top">
        <NavBarLoggedIn user={user} />
      </div>
      <div className="grid-sidebar">
        <SideBar user={user} />
      </div>
      <div className="grid-main-view">
        <div className="channel-message-page">
          <ChannelMessageContainer channelMessages={channelMessages} />
          <ChannelMessageInputContainer />
        </div>
      </div>
    </div>
  );
};

export default ChannelMessagePage;
