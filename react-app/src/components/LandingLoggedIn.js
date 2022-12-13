import React from "react";
import NavBarLoggedIn from "./NavBarLoggedIn";
import SideBar from "./SideBar/SideBar";
import ChannelBanner from "./Channels/ChannelBanner";
import NavBarSearch from './NavBarSearch'
import "./LandingLoggedIn.css";
import DirectMessage from "./DerectMessage";

export default function LandingLoggedIn({ user }) {
  return (
    <div className="landing-grid">
      <div className="grid-nav-top"></div>
      <div className="grid-nav-top">
        <NavBarLoggedIn user={user} />
      </div>
      <div className="grid-sidebar">
        <SideBar user={user} />
      </div>
      <div className="grid-main-view">
        <ChannelBanner user={user} />
        {/* <DirectMessage /> */}
      </div>
      <div>
        <NavBarSearch />

      </div>
    </div>
  );
}
