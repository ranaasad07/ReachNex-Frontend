import React from 'react';
import { Link } from 'react-router-dom';
import style from '../Navbar/Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faBriefcase, faEnvelope, faBell, faUserGroup, faUser } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  return (
    <div className={style.Main}>
      <div className={style.logo}>
        <h2>ReachNex</h2>
        <input type="text" placeholder='Search' />
      </div>
      <div className={style.icons}>
        <ul>
  <li>
    <Link to=""><FontAwesomeIcon icon={faHouseChimney} /><span>Home</span></Link>
  </li>
  <li>
    <Link to="/network"><FontAwesomeIcon icon={faUserGroup} /><span>My Network</span></Link>
  </li>
  <li>
    <Link to="/jobs"><FontAwesomeIcon icon={faBriefcase} /><span>Jobs</span></Link>
  </li>
  <li>
    <Link to="/messaging"><FontAwesomeIcon icon={faEnvelope} /><span>Messaging</span></Link>
  </li>
  <li>
    <Link to="/notifications"><FontAwesomeIcon icon={faBell} /><span>Notification</span></Link>
  </li>
  <li>
    <Link to="/profile"><FontAwesomeIcon icon={faUser} /><span>Me</span></Link>
  </li>
</ul>

      </div>
    </div>
  );
};

export default Navbar;
