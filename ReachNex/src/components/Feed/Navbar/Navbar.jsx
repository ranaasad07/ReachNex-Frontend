import React from "react";
import { useNotifications } from "../../Contexts/notificationContext";
import { Link } from "react-router-dom";
import style from "../Navbar/Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../Authentication/useAuth/useAuth";
import {
  faHouseChimney,
  faBriefcase,
  faEnvelope,
  faBell,
  faUserGroup,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  // const { unreadCount } = useNotifications();
  const { unreadCount, unreadMessageCount } = useNotifications();

  const username = useAuth();
  console.log(username);

  return (
    <div className={style.Main}>
      <div className={style.logo}>
        <h2>
          <Link to="/feed"> ReachNex </Link>
        </h2>
        <input type="text" placeholder="Search" />
      </div>
      <div className={style.icons}>
        <ul>
          <li>
            <Link to="/feed">
              <FontAwesomeIcon icon={faHouseChimney} />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/network">
              <FontAwesomeIcon icon={faUserGroup} />
              <span>My Network</span>
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <FontAwesomeIcon icon={faBriefcase} />
              <span>Jobs</span>
            </Link>
          </li>
          {/* <li>
            <Link to="/messaging">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>Messaging</span>
            </Link>
          </li> */}
          <li style={{ position: "relative" }}>
            <Link to="/messaging">
              <FontAwesomeIcon icon={faEnvelope} />
              <span>Messaging</span>
              {unreadMessageCount > 0 && (
                <span className={style.badge}>{unreadMessageCount}</span>
              )}
            </Link>
          </li>
          {/* <li>
            <Link to="/notifications">
              <FontAwesomeIcon icon={faBell} />
              <span>Notification</span>
            </Link>
          </li> */}
          <li style={{ position: "relative" }}>
            <Link to="/notifications">
              <FontAwesomeIcon icon={faBell} />
              <span>Notification</span>
              {unreadCount > 0 && (
                <span className={style.badge}>{unreadCount}</span>
              )}
            </Link>
          </li>
          <li>
            <Link to="/profile/me">
              <FontAwesomeIcon icon={faUser} />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
