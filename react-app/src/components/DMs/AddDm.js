import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./AddDm.css";

function AddDm() {
  const [selectedUser, setSelectedUser] = useState("");
  //   const history = useHistory();
  //   const [onFocus, setFocus] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectFlag, setSelectFlag] = useState(false);
  const [sendTo, setSendTo] = useState("");
  const [dmGroup, setDmGroup] = useState("");

  const currUser = useSelector((state) => state.session.user);
  const userGroups = currUser.groups;

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const handleSelect = (e) => {
    // setFocus(true);
    setSelectedUser(e.target.value);
  };

  const handleClick = (user) => {
    setSelectFlag(true);
    setSendTo(user);

    userGroups.forEach((group) => {
      // console.log("group users", group.users, user, group.users.includes(user));
      group.users.forEach((u) => {
        // console.log(u.username, user.username)
        if (u.username === user.username) {
          setDmGroup(group);
        }
      });
    });
  };

  // console.log("user groups", userGroups);
  // console.log("user", dmGroup);
  // console.log("sendto,", sendTo);

  // if (!sendTo) return null;

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
          <ul className="list-items">
            {users &&
              users
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
        </div>
      )}
      {selectFlag && !dmGroup && sendTo && (
        <Redirect to={`/groups/draft/${sendTo.id}`} />
        // <Redirect
        //   to={{
        //     pathname: "/groups/draft",
        //     state: { receiver: sendTo },
        //   }}
        // />
      )}
      {selectFlag && dmGroup && (
        <Redirect to={`/groups/${dmGroup.id}`} receiver={sendTo} />
      )}
    </div>
  );
}

export default AddDm;
