import { useEffect } from "react";

const ChannelMessageBlock = ({ cm }) => {
  console.log(cm.user.username);
  return (
    <div>
      <div>{`user:      ${cm.user.username}`}</div>
      <div>{`cm content:       ${cm.content}`}</div>
    </div>
  );
};

export default ChannelMessageBlock;
