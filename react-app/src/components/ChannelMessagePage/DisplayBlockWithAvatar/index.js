import "./index.css";

const ChannelMessageBlockWithAvatar = ({ cm }) => {
  return (
    <div className="cm-block-avatar">
      <div>{`USER AVATAR      ${cm.user_id}`}</div>
      <div>{`cm content:       ${cm.content}`}</div>
    </div>
  );
};

export default ChannelMessageBlockWithAvatar;
