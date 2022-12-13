import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChannelBanner from "../Channels/ChannelBanner";
import NavBarLoggedIn from "../NavBarLoggedIn";
import SideBar from "../SideBar/SideBar";
import "./AddDm.css";
import { dateTransfer, sameDay } from "./dateTransfer";

const AddDm = () => {
  // route: groups/all-dms
  // with Direct messages selected
  //   const [users, setUsers] = useState([]);

  const user = useSelector((state) => state.session.user);
  const groups = user.groups;

  //   let msg_obj = {};
  //   for (let i = 0; i < groups.length; i++) {
  //     const userInfo =
  //       groups[i].users[0].username === user.username
  //         ? groups[i].users[1]
  //         : groups[i].users[0];
  //     const msg = groups[i].group_messages[groups[i].group_messages.length - 1];
  //     const date = msg.updated_at;
  //     const senderId = msg.userId;

  //     msg_obj[date] = {
  //       userInfo,
  //       msg,
  //       senderId,
  //     };
  //   }
  let msg_arr = [];
  for (let i = 0; i < groups.length; i++) {
    const userInfo =
      groups[i].users[0].username === user.username
        ? groups[i].users[1]
        : groups[i].users[0];
    const msg = groups[i].group_messages[groups[i].group_messages.length - 1];
    const date = msg.updated_at;
    const senderId = msg.userId;

    const obj = {
      userInfo,
      msg,
      senderId,
      date,
    };
    msg_arr.push(obj);
  }

  //   let order_msg = {};
  //   const sorted_key = Object.keys(msg_obj).sort(function (a, b) {
  //     return new Date(b) - new Date(a);
  //   });
  //   sorted_key.forEach(function (key) {
  //     order_msg[key] = msg_obj[key];
  //   });

  msg_arr.sort((a, b) => new Date(b.date) - new Date(a.date));

  //   console.log("message object, ", Object.values(msg_obj));
  //   console.log("sorted msg", Object.values(order_msg));
  console.log("sorted arr, ", dateTransfer("day", msg_arr[0].date));
  console.log("sorted arr, ", msg_arr);

  return (
    user && (
      <div className="landing-grid">
        <div className="grid-nav-top"></div>
        <div className="grid-nav-top">
          <NavBarLoggedIn user={user} />
        </div>
        <div className="grid-sidebar">
          <SideBar user={user} />
        </div>
        <div className="grid-main-view">
          <div className="dm-header-flex">
            <div className="header-detail-flex">
              <div className="header-text">Direct messages</div>
            </div>
          </div>
          <div className="dm-body-container-flex">
            <div className="dm-to">
              <div className="dm-to-flex">
                <span>To:</span>
                <div className="dm-to-body">
                  <input
                    className="dm-to-input"
                    placeholder="@somebody in the current workplace"
                  />
                </div>
              </div>
            </div>
            <div className="dm-history">
              <div className="dm-history-scroll flex-column">
                {/* get all the dms, map them by dates */}
                {msg_arr.map((msg) => (
                  <div className="dm-block" key={msg.msg.id}>
                    <div className="dm-block-date flex-row">
                      {sameDay(msg.date, new Date(Date.now()))
                        ? "Today"
                        : dateTransfer("day", msg.date) +
                          ", " +
                          dateTransfer("month", msg.date) +
                          dateTransfer("date", msg.date)}
                    </div>
                    <div className="dm-group-container flex-column"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AddDm;
