import "./index.css";

const ChannelMessageBlock = ({ cm }) => {
  return (
    <div className="cm-block">
      <div>{`cm content:       ${cm.content}`}</div>
    </div>
  );
};

export default ChannelMessageBlock;
