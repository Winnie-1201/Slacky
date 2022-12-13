import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavBarLoggedIn from "../NavBarLoggedIn";
import SideBar from "../SideBar/SideBar";
import AddDm from "./AddDm";
import "./AddDmPage.css";
import DmHistory from "./DmHistory";

const AddDmPage = () => {
  // route: groups/all-dms
  // with Direct messages selected
  // const [users, setUsers] = useState([]);

  const user = useSelector((state) => state.session.user);

  // useEffect(() => {
  //   async function fetchData() {
  //     const response = await fetch("/api/users/");
  //     const responseData = await response.json();
  //     setUsers(responseData.users);
  //   }
  //   fetchData();
  // }, []);
  // const groups = user.groups;

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
        <div className="grid-main-view">
          <div className="dm-header-flex">
            <div className="header-detail-flex">
              <div className="header-text">Direct messages</div>
            </div>
          </div>
          <div className="dm-body-container-flex">
            <div className="dm-to">
              <div className="dm-to-flex">
                <span>To:</span>
                <AddDm />
                {/* <div className="dm-to-body">
                  <input
                    className="dm-to-input"
                    placeholder="@somebody in the current workplace"
                  />
                </div> */}
              </div>
            </div>
            <DmHistory />
          </div>
        </div>
      </div>
    )
  );
};

export default AddDmPage;
