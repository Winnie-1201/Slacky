import "./index.css";

const ChannelMessageBlock = ({ cm, avatar }) => {
  return (
    <div className="cm-block">
      <div className="cm-avatar-box">
        {avatar && <img src={cm.user.image_url}></img>}
      </div>
      <div className="cm-content-box">{`cm content:       ${cm.content}`}</div>
    </div>
  );
};

export default ChannelMessageBlock;
