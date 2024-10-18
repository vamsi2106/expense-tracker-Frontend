// // src/components/UserPanel/Navbar.tsx
// import React from "react";
// import { FaUser } from "react-icons/fa";
// import "./Navbar.css"; // Make sure to create the CSS file

// const Navbar1: React.FC = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <div className="navbar-content">
//           <div className="navbar-brand">
//             <h1 className="navbar-title">Expense Tracker</h1>
//           </div>
//           <div className="navbar-user">
//             <span className="navbar-username">John Doe</span>
//             <div className="navbar-avatar">
//               <FaUser className="avatar-icon" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar1;

import React from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "./Navbar.css"; // Make sure to create the CSS file
const Navbar1: React.FC = () => {
  const { username, profileImg } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <h1 className="navbar-title">Expense Tracker</h1>
          </div>
          <div className="navbar-user">
            <span className="navbar-username">{username}</span>
            <div className="navbar-avatar">
              {profileImg ? (
                <img
                  src={profileImg}
                  alt="User Avatar"
                  className="avatar-icon"
                />
              ) : (
                <FaUser className="avatar-icon" />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
