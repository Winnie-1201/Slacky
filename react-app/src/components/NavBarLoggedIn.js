import React, { useState, useRef, useEffect } from "react";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import SearchMessages from './SearchMessageModal/SearchFrom'

import "./NavBarLoggedIn.css";
import NavBarSearch from "./NavBarSearch";

const NavBarLoggedIn = ({ user }) => {
  // console.log('is user', user)
  const [showMenu, setShowMenu] = useState(false);
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const showMenuRef = useRef(null);
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (showMenuRef.current.contains(e.target)) return;
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <nav className="logged-in-navbar">
      <div>
       <NavBarSearch />
      </div>
      <div
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        <span className="profile-icon-span" onClick={openMenu}>
          <img
            src="https://ca.slack-edge.com/T04E7LXJV7B-U04DXFNDNDS-g7c68be6ff59-32"
            alt="profile-icon"
          ></img>
        </span>
        {showMenu && (
          <div ref={showMenuRef}>
            <ProfileMenu user={user} />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBarLoggedIn;
