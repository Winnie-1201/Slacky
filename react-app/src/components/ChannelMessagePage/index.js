import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelMessages } from "../../store/channelMessage";

import ChannelMessageContainer from "./DisplayContainer";
import ChannelMessageInputContainer from "./InputContainer";

const ChannelMessagePage = () => {
  const { channelId } = useParams();
  const dispatch = useDispatch();
  const channelMessages = useSelector((state) => state.channelMessages);
  useEffect(() => {
    dispatch(fetchChannelMessages(channelId));
  }, [dispatch, channelId]);
  if (!channelId) return null;
  return (
    <div className="channel-message-page">
      <ChannelMessageContainer channelMessages={channelMessages} />
      <ChannelMessageInputContainer />
    </div>
  );
};

export default ChannelMessagePage;
