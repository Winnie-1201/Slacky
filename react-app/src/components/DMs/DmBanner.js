import React from "react";
import "./DmBanner.css";

function DmBanner({ receiver, new_receiver }) {
  return (
    <>
      {new_receiver && (
        <>
          <div className="dm-header-flex">
            <div className="header-detail-flex">
              <div className="header-text">Direct messages</div>
            </div>
          </div>
          <div>
            <div className="dm-to">
              <div className="dm-to-flex">
                <span className="dm-to-text">To:</span>
                <span className="dm-to-user">{receiver.username}</span>
              </div>
            </div>
          </div>
        </>
      )}
      {!new_receiver && (
        <div className="channel-banner-div">
          <div className="dm-header flex-row">
            <div className="dm-header-icon flex-row">
              <span>
                <img
                  src={receiver.image_url}
                  className="dm-header-icon-detail"
                />
              </span>
              <div
                className={`user-active-circle ${
                  receiver.is_online ? "is_online" : ""
                }`}
              ></div>
            </div>
            <div className="dm-header-name">{receiver.username}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default DmBanner;
