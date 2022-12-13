import ChannelMessageBlock from "../DisplayBlock";
import "./index.css";

const ChannelMessageContainer = ({ channelMessages }) => {
  const cmKeys = Object.keys(channelMessages);
  if (!channelMessages) return null;
  return (
    <div className="channel-message-container">
      {channelMessages &&
        cmKeys.map((cm, idx) => {
          if (
            idx > 0 &&
            channelMessages[cmKeys[idx]].user_id ===
              channelMessages[cmKeys[idx - 1]].user_id
          )
            return (
              <ChannelMessageBlock
                key={`cmId: ${cm}`}
                cm={channelMessages[cm]}
                avatar={false}
              />
            );
          else {
            return (
              <ChannelMessageBlock
                key={`cmId: ${cm}`}
                cm={channelMessages[cm]}
                avatar={true}
              />
            );
          }
        })}
    </div>
  );
};

export default ChannelMessageContainer;
