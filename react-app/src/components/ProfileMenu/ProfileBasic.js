import React from "react";
import { useSelector } from "react-redux";

export default function ProfileBasic({ user }) {
  return (
    <div className="profile-basic-div">
      <span className="profile-icon-span-menu">
        <img
          src="https://ca.slack-edge.com/T04E7LXJV7B-U04DXFNDNDS-g7c68be6ff59-32"
          alt="profile-icon"
        ></img>
      </span>
      <div className="profile-basic-sub-div">
        <span style={{ fontSize: "15px", fontWeight: "800" }}>
          {user.username}
        </span>
        <span style={{ fontSize: "13px", fontWeight: "300" }}>
          {user.is_online && (
            <i
              className="fa-solid fa-circle"
              style={{
                color: "#007a5a",
                width: "15px",
                height: "auto",
                fontSize: "10px",
              }}
            ></i>
          )}
          {!user.is_online && (
            <i
              className="fa-regular fa-circle"
              style={{ width: "15px", height: "auto", fontSize: "10px" }}
            ></i>
          )}
          {user.is_online ? "Active" : "Away"}
        </span>
      </div>
    </div>
  );
}
