import React, { useContext, useState } from "react";
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
  //  localStorage.setItem("token", token);
  let navigate = useNavigate();

  let tokenforlocalstorage = localStorage.getItem("token");
  console.log(tokenforlocalstorage);

  // ✅ Decode and set user
  const decoded = jwtDecode(tokenforlocalstorage);
  const { username, fullname, email, id } = decoded;
  console.log(id);
  // const { user } =" useContext(AuthenticationContext);
  if (id) {
    let formData = { id: id };
    async function a() {
      try {
        const res = await axios.post(
          "http://localhost:5000/ReachNex/verfiyloginuser",
          formData
        );

        // setUser({ username, fullname, email, id });

        // navigate("/feed");
      } catch (err) {
        console.log(err);
        console.log("Invalid credentials");
        navigate("/");
      }
    }
    a();
  }
  // console.log(user);
  const [user, setUser] = useState("");

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
