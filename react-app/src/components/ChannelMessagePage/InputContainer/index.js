import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCreateChannelMessage } from "../../../store/channelMessage";

const ChannelMessageInputContainer = () => {
  const { channelId } = useParams();
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  console.log("*************** CM INPUT channelId", channelId);
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(fetchCreateChannelMessage(channelId, { content }))
      .then(() => setContent(""))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };
  return (
    <div className="cm-input-block">
      <form onSubmit={handleSubmit}>
        <div className="cm-error-box">
          <ul>
            {errors.map((error, idx) => (
              <li key={`cmError-${idx + 1}`}>{error}</li>
            ))}
          </ul>
        </div>
        <div className="cm-input-box">
          <textarea
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="cm-submit-box">
          <button type="submit" className="cm-submit-button">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChannelMessageInputContainer;
