import React, { useContext, useEffect, useState } from "react";
import style from "./PostInputBox.module.css";
import AuthenticationContext from "../../../components/Contexts/AuthenticationContext/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import VideocamIcon from "@mui/icons-material/Videocam";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ArticleIcon from "@mui/icons-material/Article";
import axios from "axios";

const PostInputBox = () => {
  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/ReachNex/gettingAllPosts");
      setPosts(res.data.Posts || []); // ✅ Posts with capital P
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  return (
    <>
      {/* Start Post UI */}
      <div className={style.mainContainer}>
        <div className={style.postContainer}>
          <img
            className={style.profilePic}
            src={
              user?.profilePic
                ? user.profilePic
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"
            }
            alt="Profile image"
          />
          <button className={style.postButton} onClick={() => navigate("/Post")}>
            Start Post
          </button>
        </div>
        <div className={style.icons}>
          <ul>
            <li><VideocamIcon /> Video</li>
            <li><AddAPhotoIcon /> Pic</li>
            <li><ArticleIcon /> Article</li>
          </ul>
        </div>
      </div>

      {/* Show Posts */}
      <div className={style.feedSection}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className={style.postCard}>
              <div className={style.postUser}>
                <img
                  className={style.postProfile}
                  src={
                    post.userId?.profilePicture
                      ? post.userId.profilePicture
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"
                  }
                  alt="User"
                />
                <h4>{post.userId?.username || "User"}</h4>
              </div>
              <p>{post.caption}</p>
              {post.mediaUrl && (
                post.mediaUrl.includes("video") ? (
                  <video
                    controls
                    className={style.postMedia}
                    src={post.mediaUrl}
                  />
                ) : (
                  <img
                    className={style.postMedia}
                    src={post.mediaUrl}
                    alt="Post"
                  />
                )
              )}
              {/* ✅ Like & Comment buttons */}
    <div className={style.actions}>
      <button className={style.likeBtn}>👍 Like</button>
      <button className={style.commentBtn}>💬 Comment</button>
    </div>

            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            No posts found ❌
          </p>
        )}
      </div>
    </>
  );
};

export default PostInputBox;
