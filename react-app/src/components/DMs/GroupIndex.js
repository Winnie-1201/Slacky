import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import {
  getAllGroupsThunk,
  getCurrentUserGroupsThunk,
} from "../../store/groups";
import "./GroupIndex.css";

export default function GroupIndex({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showDms, setShowDms] = useState(true);

  const userGroups = useSelector((state) => state.group.userGroups);

  useEffect(() => {
    dispatch(getAllGroupsThunk());
    dispatch(getCurrentUserGroupsThunk(user.id));
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    // setClick(true);
    history.push("/groups/all-dms");
  };

  return (
    <div className="groups-index-div">
      <div className="sidebar-wrapper">
        <div className="sidebar-icon-span" onClick={() => setShowDms(!showDms)}>
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
                  {group.users[0].username === user.username ?
                    (group.users[1].image_url ?
                      <img className="user-icon-sidebar" src={group.users[1].image_url} alt=''/>
                      :
                      <button className="user-con-sidebar-nourl"> <i className="fa-solid fa-user"></i></button>)
                    :
                    (group.users[0].image_url ?
                      <img className="user-icon-sidebar" src={group.users[0].image_url} alt='' />
                      :
                      <button> <i className="fa-solid fa-user"></i></button>)                    
                  }
                  {/* <img
                    className="user-icon-sidebar"
                    src={
                      group.users[0].username === user.username
                        ? group.users[1].image_url
                        : group.users[0].image_url
                    } alt=''
                  /> */}
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
        <div className="sidebar-icon-span cursor" onClick={handleClick}>
          <div className="plus-div cursor" onClick={handleClick}>
            <span className="cursor" onClick={handleClick}>
              +
            </span>
          </div>
        </div>
        <span className="sidebar-text cursor" onClick={handleClick}>
          Add teammates
        </span>
      </div>
    </div>
  );
}
