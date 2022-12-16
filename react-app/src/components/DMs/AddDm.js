import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getCurrentUserGroupsThunk } from "../../store/groups";
import { getAllUser } from "../../store/session";
import "./AddDm.css";

function AddDm() {
  const dispatch = useDispatch();

  const [selectedUser, setSelectedUser] = useState("");
  const [selectFlag, setSelectFlag] = useState(false);
  const [sendTo, setSendTo] = useState("");
  const [dmGroup, setDmGroup] = useState("");

  const users = useSelector((state) => state.session.users);
  const currUser = useSelector((state) => state.session.user);
  const userGroups = useSelector((state) => state.group.userGroups);

  useEffect(
    () => async () => {
      await dispatch(getAllUser());
      await dispatch(getCurrentUserGroupsThunk());
    },
    [dispatch]
  );

  const handleSelect = (e) => {
    setSelectedUser(e.target.value);
  };

  const handleClick = (user) => {
    setSelectFlag(true);
    setSendTo(user);

    userGroups.forEach((group) => {
      group.users.forEach((u) => {
        if (u.username === user.username) {
          setDmGroup(group);
        }
      });
    });
  };

  if (!users.length > 0) return null;

  const flag =
    users.filter((user) =>
      user.username.toLowerCase().startsWith(selectedUser.toLowerCase())
    ).length > 0;

  return (
    <div className="dm-to-body">
      <input
        value={selectedUser}
        onChange={handleSelect}
        className="dm-to-input"
        placeholder="@somebody in the current workplace"
      />
      {selectedUser && (
        <div className="user-list">
          {flag ? (
            <ul className="list-items">
              {users
                .filter((user) =>
                  user.username
                    .toLowerCase()
                    .startsWith(selectedUser.toLowerCase())
                )
                .map((user) => (
                  <li
                    key={user.id}
                    onClick={() => handleClick(user)}
                    className="item-detail flex-row"
                  >
                    <span className="user-icon-container-sidebar user-list-icon">
                      <img src={user.image_url} className="user-icon-sidebar" />
                    </span>
                    <span className="user-list-name">
                      {currUser.username == user.username
                        ? currUser.username + " (you)"
                        : user.username}
                    </span>
                    <span
                      className={`user-active ${
                        user.is_online ? "is-active" : ""
                      }`}
                    ></span>
                  </li>
                ))}
            </ul>
          ) : (
            <>
              <div className="no-user">No member found</div>
            </>
          )}
        </div>
      )}
      {selectFlag && !dmGroup && sendTo && (
        <Redirect to={`/groups/draft/${sendTo.id}`} />
      )}
      {selectFlag && dmGroup && (
        <Redirect to={`/groups/${dmGroup.id}`} receiver={sendTo} />
      )}
    </div>
  );
}

export default AddDm;
