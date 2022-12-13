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

  const currUser = useSelector((state) => state.session.user);

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
  };

  console.log("user", users);

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
                        user.is_active ? "is-active" : ""
                      }`}
                    ></span>
                  </li>
                ))}
          </ul>
        </div>
      )}
      {selectFlag && <Redirect user={sendTo} to="/groups/draft" />}
    </div>
  );
}

export default AddDm;
