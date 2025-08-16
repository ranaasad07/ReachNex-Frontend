import React, { useContext, useEffect, useState } from "react";
import SidebarProfile from "./Card/SidebarProfile";
import Feed from "./Card/Feed";
import RightSidebar from "./Card/RightSidebar";
import PostInputBox from "./Card/PostInputBox";
import style from "./Home.module.css";
import { jwtDecode } from "jwt-decode";
// import HomeAthentication from "../../components/Contexts/HomeAthuntication";
import HomeAthentication from "./HomeAthuntication";
import axios from "axios";
import { Navigate, NavigationType } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tokenforlocalstorage = localStorage.getItem("token");
    console.log(tokenforlocalstorage, "mmmmmmmmmmmmmmmmmmmmmmmmmmmm");

    if (!tokenforlocalstorage) {
      // No token, redirect to login
      navigate("/");
      alert("you need to login first");
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode(tokenforlocalstorage);
    } catch (err) {
      console.log("Invalid token:", err);
      navigate("/");
      return;
    }

    const { username, fullname, email, id } = decoded;
    console.log(id, "tttttttttt");

    if (!id) {
      navigate("/");
      return;
    }

    // Verify user by ID on backend
    const verifyUser = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/reachnex/verifyloginuser",
          { id }
        );

        // Assuming res.data.findUser contains user info
        setUser(res.data.findUser);
      } catch (err) {
        console.log(err);
        console.log("Invalid credentials");
        navigate("/");
      }
    };

    verifyUser();
  }, [navigate]);

  return (
    <HomeAthentication value={{ user, setUser }}>
      <div className={style.container}>
        <SidebarProfile />
        <div>
          <PostInputBox />
          <Feed />
        </div>
        <RightSidebar />
      </div>
    </HomeAthentication>
  );
};

export default Home;
