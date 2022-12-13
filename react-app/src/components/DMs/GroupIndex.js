import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./GroupIndex.css";

export default function GroupIndex({ user }) {
  const userGroups = user.groups;

  const [showDms, setShowDms] = useState(true);

  return (
    <div className="groups-index-div">
      <div className="sidebar-wrapper">
        <div className="sidebar-icon-span">
          <i
            className="fa-solid fa-caret-down cursor"
            onClick={() => setShowDms(!showDms)}
          ></i>
        </div>
        <span
          className="sidebar-text cursor"
          onClick={() => setShowDms(!showDms)}
        >
          Direct messages
        </span>
      </div>
      {showDms &&
        userGroups?.map((group) => {
          return (
            <div key={group.id} className="sidebar-wrapper">
              <div className="sidebar-icon-span">
                <span className="user-icon-container-sidebar">
                  <img
                    className="user-icon-sidebar"
                    src={
                      group.users[0].username === user.username
                        ? group.users[1].image_url
                        : group.users[0].image_url
                    }
                  />
                </span>
              </div>
              <span className="sidebar-text">
                <NavLink key={group.id} to={`/groups/${group.id}`}>
                  {group.users[0].username === user.username
                    ? group.users[1].username
                    : group.users[0].username}
                </NavLink>
              </span>
            </div>
          );
        })}
      <div className="sidebar-wrapper">
        <div className="sidebar-icon-span">
          <div className="plus-div">
            <span>+</span>
          </div>
        </div>
        <span className="sidebar-text">Add teammates</span>
      </div>
    </div>
  );
}
