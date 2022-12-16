import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  getAllGroupsThunk,
  getCurrentUserGroupsThunk,
} from "../../store/groups";
import "./GroupIndex.css";
import { useSocket } from "../../context/SocketContext";

export default function GroupIndex({ user }) {
  // console.log("socket in gorup index", socket);
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.session.user);
  const userGroups = useSelector((state) => state.group.userGroups);
  const socket = useSocket();
  console.log("socket in groupindex", socket);

  const [showDms, setShowDms] = useState(true);
  // const [newRoom, setNewRoom] = useState("");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    dispatch(getAllGroupsThunk());
    dispatch(getCurrentUserGroupsThunk(user.id));
  }, [dispatch]);

  useEffect(() => {
    // setGroups(userGroups);
    socket.on("invite", (chat) => {
      console.log("chat-----", chat);
      // setNewRoom(chat.room);
      dispatch(getAllGroupsThunk());
      // setGroups((groups) => [...groups, chat]);
    });
  }, []);

  useEffect(() => {
    setGroups(userGroups);
  }, [userGroups]);

  console.log("groups in group idex", groups);

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
