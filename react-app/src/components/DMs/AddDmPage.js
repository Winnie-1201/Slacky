import { useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import NavBarLoggedIn from "../NavBarLoggedIn";
import SideBar from "../SideBar/SideBar";
import AddDm from "./AddDm";
import "./AddDmPage.css";
import DmHistory from "./DmHistory";

const AddDmPage = () => {
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
        <div className="grid-main-view">
          <div className="dm-header-flex">
            <div className="header-detail-flex">
              <div className="header-text">Direct messages</div>
            </div>
          </div>
          <div className="dm-body-container-flex">
            <div className="dm-to">
              <div className="dm-to-flex">
                <span className="dm-to-text">To:</span>
                <AddDm />
              </div>
            </div>
            <DmHistory />
          </div>
        </div>
        <div className="grid-footer">
          <Footer />
        </div>
      </div>
    )
  );
};

export default AddDmPage;
