import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./DmHistory.css";
import { dateTransfer, sameDay, formateDate } from "./dateTransfer";

function DmHistory() {
  const user = useSelector((state) => state.session.user);
  const groups = useSelector((state) => state.group.userGroups);

  let obj = {};
  for (let i = 0; i < groups.length; i++) {
    const userInfo =
      groups[i].users[0].username === user.username
        ? groups[i].users[1]
        : groups[i].users[0];
    const msg = groups[i].group_messages[groups[i].group_messages.length - 1];
    const date = msg.updated_at;
    const senderId = msg.userId;

    const obj_value = {
      userInfo,
      msg,
      senderId,
      date,
    };

    const theDate = formateDate(date);
    if (obj[theDate]) {
      obj[theDate].push(obj_value);
    } else {
      obj[theDate] = [obj_value];
    }
  }

  let order_msg = {};
  const sorted_key = Object.keys(obj).sort(function (a, b) {
    return new Date(b) - new Date(a);
  });
  sorted_key.forEach(function (key) {
    order_msg[key] = obj[key];
  });

  const msg_arr = Object.values(order_msg);

  return (
    <div className="dm-history">
      <div className="dm-history-scroll flex-column">
        {msg_arr.map((msgs, idx) => (
          <div className="dm-block flex-column" key={idx}>
            <div className="dm-sameblock-date">
              {sameDay(msgs[0].date, new Date(Date.now()))
                ? "Today"
                : dateTransfer("day", msgs[0].date) +
                  ", " +
                  dateTransfer("month", msgs[0].date) +
                  dateTransfer("date", msgs[0].date)}
            </div>
            {msgs.map((msg, idx) => (
              <NavLink
                key={idx}
                to={`/groups/${msg.msg.groupId}`}
                className={`dm-sameblock-group flex-row ${
                  idx == 0 ? "top-left-right" : ""
                } ${idx == msgs.length - 1 ? "bottom-left-right" : ""}`}
              >
                <div className="dm-user-icon flex-row">
                  <span>
                    <img
                      className="dm-user-icon-img"
                      src={msg.userInfo.image_url}
                    />
                  </span>
                </div>
                <div className="dm-username-msg">
                  <div className="dm-username flex-row">
                    <div>{msg.userInfo.username}</div>
                  </div>
                  <div className="dm-msg">
                    <span className="dm-msg-detail">
                      {msg.userInfo.username}: {msg.msg.content}
                    </span>
                  </div>
                </div>
                <div className="dm-time">
                  {dateTransfer("hour", msg.date)}:
                  {dateTransfer("min", msg.date)} {dateTransfer("am", msg.date)}
                </div>
              </NavLink>
            ))}
            <div className="dm-group-container flex-column"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DmHistory;
