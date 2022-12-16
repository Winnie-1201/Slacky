import React from "react";
import "./SideBar.css";
import ChannelIndex from "../Channels/ChannelIndex";
import GroupIndex from "../DMs/GroupIndex";
import { useHistory } from "react-router-dom";

export default function SideBar({ user }) {
  // const [click, setClick] = useState(false);

  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    // setClick(true);
    history.push("/groups/all-dms");
  };

  return (
    <div className="sidebar-div">
      <div className="sidebar-header">
        <span style={{ fontWeight: "600", fontSize: "18px" }}>App Academy</span>
        <button onClick={handleClick}>
          <i className="fa-regular fa-pen-to-square" onClick={handleClick}></i>
        </button>
      </div>
      <div className="sidebar-index">
        {/* {click && <Redirect to="/groups/all-dms" />} */}
        <ChannelIndex user={user} />
        <GroupIndex user={user} />
      </div>
    </div>
  );
}
