import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelMessages } from "../../store/channelMessage";
import { getOneChannel } from "../../store/channels";

import ChannelMessageContainer from "./DisplayContainer";
import ChannelMessageInputContainer from "./InputContainer";

import NavBarLoggedIn from "../NavBarLoggedIn";
import SideBar from "../SideBar/SideBar";

import "./index.css";
import Footer from "../Footer/Footer";
import ChannelBanner from "../Channels/ChannelBanner";

const ChannelMessagePage = () => {
  // console.log('------1. Channel Message Page------')
  const { channelId } = useParams();
  const dispatch = useDispatch();
  const channelMessages = useSelector((state) => state.channelMessages);
  const user = useSelector((state) => state.session.user);
  const channel = useSelector((state) => state.channels.channel);

  useEffect(() => {
    dispatch(fetchChannelMessages(channelId));
    dispatch(getOneChannel(channelId));

  }, [dispatch, channelId]);

  if (!channelId) return null;

  return (
    <div className="landing-grid">
      <div className="grid-nav-top">
        <NavBarLoggedIn user={user} />
      </div>
      <div className="grid-sidebar">
        <SideBar user={user} />
      </div>
      <div className="grid-main-view">
        <div className="channel-message-page">
          <ChannelBanner channel={channel}/>
          <ChannelMessageContainer channelMessages={channelMessages} />
          <ChannelMessageInputContainer />
        </div>
      </div>
      <div className="grid-footer">
        <Footer />
      </div>
    </div>
  );
};

export default ChannelMessagePage;
