import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

function AddDm() {
  const [selectedUser, setSelectedUser] = useState("");
  //   const history = useHistory();
  //   const [onFocus, setFocus] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectFlag, setSelectFlag] = useState(false);
  const [sendTo, setSendTo] = useState("");

  //   const user = useSelector((state) => state.session.user);

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

    //   setSelectedUser(e.target.value);
    // console.log("user", user);

    // return this.props.history.push({
    //   pathname: "/groups/draft",
    //   state: { user: user },
    // });
    // return <Redirect to="/groups/draft" user={user} />;
  };

  //   console.log("all users", users);
  return (
    <div className="dm-to-body">
      <input
        value={selectedUser}
        onChange={handleSelect}
        className="dm-to-input"
        placeholder="@somebody in the current workplace"
      />
      {selectedUser && (
        <div>
          <ul>
            {users &&
              users
                .filter((user) =>
                  user.username
                    .toLowerCase()
                    .startsWith(selectedUser.toLowerCase())
                )
                .map((user) => (
                  <li key={user.id} onClick={() => handleClick(user)}>
                    {user.username}
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
