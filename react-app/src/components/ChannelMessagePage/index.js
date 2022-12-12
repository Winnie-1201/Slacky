import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelMessages } from "../../store/channelMessage";
import ChannelMessageBlock from "./ChannelMessageBlock";

const ChannelMessagePage = () => {
  const { channelId } = useParams();
  console.log("**************** channelId in ChannelMessagePage", channelId);
  const dispatch = useDispatch();
  const channelMessages = useSelector((state) => state.channelMessages);

  console.log(
    "**************** channelMessagesArr in ChannelMessagePage",
    channelMessages
  );

  useEffect(() => {
    dispatch(fetchChannelMessages(channelId));
  }, [dispatch, channelId]);
  if (!channelId) return null;
  return (
    <div className="channel-message-container">
      {channelMessages &&
        Object.keys(channelMessages).map((cm) => (
          <ChannelMessageBlock key={`cmId: ${cm}`} cm={channelMessages[cm]} />
        ))}
    </div>
  );
};

export default ChannelMessagePage;
