import React from "react";
import "./SideBar.css";
import ChannelIndex from "../Channels/ChannelIndex";
import GroupIndex from "../DMs/GroupIndex";
import { useState } from "react";
import { Redirect } from "react-router-dom";

export default function SideBar({ user }) {
  const [click, setClick] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setClick(true);
  };

  return (
    <div className="sidebar-div">
      <div className="sidebar-header">
        <span style={{ fontWeight: "600", fontSize: "18px" }}>App Academy</span>
        <button>
          <i className="fa-regular fa-pen-to-square" onClick={handleClick}></i>
        </button>
      </div>
      <div className="sidebar-index">
        {click && <Redirect to="/groups/all-dms" />}
        <ChannelIndex user={user} />
        <GroupIndex user={user} />
      </div>
    </div>
  );
}
