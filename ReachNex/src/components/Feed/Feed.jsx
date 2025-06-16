// Layout.jsx
import React from "react";
import Navbar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Feed = () => {
  return (
    <div>
      <Navbar />
      <div style={{ paddingTop: "60px" }}>
        {/* Where the pages like Home, Network, Jobs will be rendered */}
        <Outlet />
      </div>
    </div>
  );
};

export default Feed;
