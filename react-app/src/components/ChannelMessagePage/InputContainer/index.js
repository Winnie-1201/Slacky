import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchCreateChannelMessage,
  fetchEditChannelMessage,
} from "../../../store/channelMessage";
import "./index.css";
const ChannelMessageInputContainer = ({ cmId, edit, setEdit, cm }) => {
  const { channelId } = useParams();
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (cm) setContent(cm.content);
    if (setEdit) return () => setEdit(false);
  }, [cm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const message = { content };

    return dispatch(
      edit
        ? fetchEditChannelMessage(cmId, message)
        : fetchCreateChannelMessage(channelId, { content })
    )
      .then(() => {
        if (setEdit) setEdit(false);
      })
      .then(() => setContent(""))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  return (
    <div className="cm-input-container">
      <div className="cm-input-block">
        <form onSubmit={handleSubmit} className="cm-form" onKeyUp={handleEnter}>
          {/* <div className="cm-error-box">
            <ul>
              {errors.map((error, idx) => (
                <li key={`cmError-${idx + 1}`}>{error}</li>
              ))}
            </ul>
          </div> */}
          {/* <div className="cm-input-top">
            <div className="cm-input-top-box">
              <i className="fa-solid fa-bold"></i>
            </div>
            <div className="cm-input-top-box">
              <i className="fa-solid fa-italic"></i>
            </div>
            <div className="cm-input-top-box">
              <i className="fa-solid fa-strikethrough"></i>
            </div>
          </div> */}
          <div className="cm-input-box">
            <textarea
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="cm-input"
            />
          </div>
          <div className="cm-input-bottom">
            <div className="cm-input-botton-left"></div>
            <div className="cm-submit-box">
              {edit && (
                <button className={`cm-cancel-button`} onClick={handleCancel}>
                  Cancel
                </button>
              )}
              {edit ? (
                <button
                  type="submit"
                  className={`cm-submit-button cm-submit-button-highlight-true`}
                >
                  Send
                </button>
              ) : (
                <button
                  type="submit"
                  className={`cm-submit-button cm-submit-button-highlight-${
                    content != ""
                  }`}
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChannelMessageInputContainer;
