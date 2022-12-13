import React from "react";
import { useSelector } from "react-redux";
import NavBarLoggedIn from "../NavBarLoggedIn";
import SideBar from "../SideBar/SideBar";

function DmDraftPage() {
  const user = useSelector((state) => state.session.user);

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
      </div>
    )
  );
}

export default DmDraftPage;
