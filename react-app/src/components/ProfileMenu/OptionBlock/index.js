import LogoutButton from "../../auth/LogoutButton";
import "./index.css";

const OptionBlock = () => {
  return (
    <div className="profile-option-block">
      <div className="profile-block-divider">
        <div className="profile-option-box">
          <p>
            Set yourself as <span>away</span> - to come
          </p>
        </div>
        <div className="profile-option-box">
          <p>Pause notifications - to come</p>
        </div>
      </div>
      <div className="profile-block-divider">
        <div className="profile-option-box">
          <p>Profile - to come</p>
        </div>
        <div className="profile-option-box">
          <p>Preference - to come</p>
        </div>
      </div>
      <div className="profile-block-divider">
        <div className="profile-option-box">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default OptionBlock;
