import "./index.css";

const UserBlock = ({ user }) => {
  return (
    <div className="profile-user-block profile-block">
      <div className="profile-user-block-left">
        {user.image_url ? (
          <img src={user.image_url} alt="avatar" className="profile-avatar" />
        ) : (
          <img
            className="profile-avatar"
            src="https://ca.slack-edge.com/T04E7LXJV7B-U04DXFNDNDS-g7c68be6ff59-32"
            alt="avatar"
          />
        )}
      </div>
      <div className="profile-user-block-right">
        <div className="profile-username-box">{user.username}</div>
        <div className="profile-online-box">
          <div className="profile-online-circle">
            <i
              className={`${"Active" ? "fa-solid" : "fa-regular"} fa-circle fa-2xs`}
            ></i>
          </div>
          <div className="profile-online-text">
            <p>Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBlock;
