import { useState } from "react";

import "./index.css";

const StatusBlock = ({ user }) => {
  const [laugh, setLaugh] = useState(false);
  return (
    <div className="profile-status-block profile-block">
      <div
        className="profile-status-box"
        onMouseEnter={() => setLaugh(true)}
        onMouseLeave={() => setLaugh(false)}
      >
        <div className="profile-status-icon">
          <i
            className={`fa-regular ${laugh ? "fa-face-laugh" : "fa-face-smile"}`}
          ></i>
        </div>
        <div className="profile-status-text">
          <p>Update your status - to come</p>
        </div>
      </div>
    </div>
  );
};

export default StatusBlock;
