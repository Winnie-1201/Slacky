import React from "react";
import NavBarLoggedIn from "./NavBarLoggedIn";
import SideBar from "./SideBar/SideBar";
import "./LandingLoggedIn.css";
import ChannelMessagePage from "./ChannelMessagePage";

export default function LandingLoggedIn({ user }) {
  return (
    <div className="landing-grid">
      <div className="grid-nav-top">
        <NavBarLoggedIn user={user} />
      </div>
      <div className="grid-sidebar">
        <SideBar user={user} />
      </div>
      <div className="grid-main-view">
        <ChannelMessagePage />
      </div>
    </div>
  );
}
