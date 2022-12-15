import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllGroupsThunk } from "../../store/groups";
import "./GroupIndex.css";

export default function GroupIndex({ user }) {
  const dispatch = useDispatch();

  const userGroups = useSelector((state) => state.group.userGroups);

  const [showDms, setShowDms] = useState(true);

  useEffect(() => {
    dispatch(getAllGroupsThunk());
  }, [dispatch]);

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
                {/* <div key={group.id} onClick={joinRoom(group.id)}>
                  {group.users[0].username === user.username
                    ? group.users[1].username
                    : group.users[0].username}
                </div> */}
                {/* <Link key={group.id} to={{
                  pathname: `/groups/${group.id}`,
                  prop: {
                    socket: socket,
                    room: group.id
                  }
                  }}>
                  {group.users[0].username === user.username
                    ? group.users[1].username
                    : group.users[0].username}
                </Link> */}
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
