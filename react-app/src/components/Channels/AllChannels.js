import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import NavBarLoggedIn from "../NavBarLoggedIn";
import SideBar from "../SideBar/SideBar";
import Footer from "../Footer/Footer";
import { getAllChannel } from "../../store/channels";
import AllChannelsMap from "./AllChannelsMap";
import { getCurrentUserGroupsThunk } from "../../store/groups";

export default function AllChannels() {
  // console.log("--------All Channels Page--------");
  const user = useSelector((state) => state.session.user);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getAllChannel());
  //   // dispatch(getCurrentUserGroupsThunk(user.id));
  // }, []);

  return (
    <div className="landing-grid">
      <div className="grid-nav-top">
        <NavBarLoggedIn user={user} />
      </div>
      <div className="grid-sidebar">
        <SideBar user={user} />
      </div>
      <div className="grid-main-view">
        <div className="channel-banner-div">
          <div className="channel-name">All channels</div>
        </div>
        <AllChannelsMap />
      </div>
      <div className="grid-footer">
        <Footer />
      </div>
    </div>
  );
}
