import { useDispatch, useSelector } from "react-redux";
import { fetchDeleteChannelMessage } from "../../../store/channelMessage";
import { useState } from "react";
import "./index.css";

const ChannelMessageBlock = ({ cm, avatar }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);

  const createdAt = new Date(cm.created_at);
  const hour = createdAt.getHours() % 12;
  const minute = createdAt.getMinutes();
  const time = `${hour > 10 ? hour : hour ? "0" + hour : 12}:${
    minute < 10 ? "0" + minute : minute
  }`;

  const handleDelete = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(fetchDeleteChannelMessage(cm.id)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };
  return (
    <div
      className={`cm-block ${avatar ? "cm-with-avatar" : "cm-without-avatar"}`}
    >
      <div className="cm-block-left">
        {avatar ? (
          <img src={cm.user.image_url} className="cm-avatar"></img>
        ) : (
          <p>{time}</p>
        )}
      </div>
      <div className="cm-block-right">
        {avatar ? (
          <div>
            <div className="cm-user-block">
              <div className="cm-name-box">
                <p>{cm.user.username}</p>
              </div>
              <div className="cm-time-box">
                <p>{`${time}  ${createdAt.getHours() > 12 ? "PM" : "AM"}`}</p>
              </div>
            </div>
            <div className="cm-content-box">
              <p>{cm.content}</p>
            </div>
          </div>
        ) : (
          <div className="cm-content-box">
            <p>{cm.content}</p>
          </div>
        )}
      </div>
      {user.id === cm.user_id && (
        <div>
          <button onClick={handleDelete}>
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChannelMessageBlock;
