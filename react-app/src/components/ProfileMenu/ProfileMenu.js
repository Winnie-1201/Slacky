import React from "react";
import { useSelector } from "react-redux";
// import LogoutButton from "../auth/LogoutButton";
// import ProfileBasic from "./ProfileBasic";
// import ProfileStatus from "./ProfileStatus";

import "./ProfileMenu.css";
import UserBlock from "./UserBlock";
import StatusBlock from "./StatusBlock";
import OptionBlock from "./OptionBlock";

export default function ProfileMenu() {
  const user = useSelector((state) => state.session.user);
  // console.log("*******************PROFILE USER", user);
  return (
    <>
      {user && (
        <div className="profile-menu-div">
          <UserBlock user={user} />
          <StatusBlock user={user} />
          <OptionBlock user={user} />
        </div>
      )}
    </>
  );
}
// export default function ProfileMenu() {
//   const user = useSelector((state) => state.session.user);
//   console.log("*******************PROFILE USER", user);
//   return (
//     <div className="profile-menu-div">
//       {user && (
//         <>
//           <div className="profile-menu-div-sub">
//             <ProfileBasic user={user} />
//             <ProfileStatus user={user} />
//             <span>Set active/away status placeholder</span>
//             <div className="profile-buttons-div">
//               <span>Profile button placeholder</span>
//             </div>
//             <div className="profile-buttons-div">
//               <LogoutButton />
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
