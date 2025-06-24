
import React from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import style from './Feed.module.css'

const Feed = () => {
  return (
    <div className={style.feed}>
      <Navbar />
      <div style={{ padding: "10px" }}>
        <Outlet />
      </div> 
     
    </div>
  );
};

export default Feed;
