import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchChannelMessages } from "../../store/channelMessage";

const ChannelMessagePage = () => {
  const { channelId } = useParams();
  console.log("**************** channelId in ChannelMessagePage", channelId);
  const dispatch = useDispatch();
  const channelMessages = useSelector((state) => state.channelMessages);
  console.log(channelMessages);

  useEffect(() => {
    dispatch(fetchChannelMessages(channelId));
  }, [dispatch, channelId]);
  if (!channelId) return null;
  return <div>Hello</div>;
};

export default ChannelMessagePage;
