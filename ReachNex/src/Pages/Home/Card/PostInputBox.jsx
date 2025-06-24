import React from "react";
import style from "./PostInputBox.module.css";
import AuthenticationContext from "../../../components/Contexts/AuthenticationContext/AuthenticationContext";
import { useContext } from "react";
import VideocamIcon from '@mui/icons-material/Videocam';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import ArticleIcon from '@mui/icons-material/Article';
import { useNavigate } from "react-router-dom";

const PostInputBox = () => {
  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate()
  return (
    <div className={style.mainContainer}>
      <div className={style.postContainer}>
        <img
          className={style.profilePic}
          src={
            user?.profilePic !== "" && user?.profilePic !== undefined
              ? user?.profilePic
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"
          }
          alt="Profile image"
        />
        <button className={style.postButton} onClick={()=>navigate('/Post')}>Start Post</button>
        
      </div>
      <div className={style.icons}>
        <ul>
          <li><VideocamIcon/>Video</li>
          <li><AddAPhotoIcon/>Pic</li>
          <li><ArticleIcon/>Articel</li>
        </ul>
      </div>
    </div>
  );
};

export default PostInputBox;
