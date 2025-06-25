import React, { useContext, useEffect, useState } from "react";
import style from "./PostInputBox.module.css";
import AuthenticationContext from "../../../components/Contexts/AuthenticationContext/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import VideocamIcon from "@mui/icons-material/Videocam";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ArticleIcon from "@mui/icons-material/Article";
import axios from "axios";
import socket from "../socket";

const PostInputBox = () => {
  const { user } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();

    socket.on("likeUpdated", ({ postId, likes }) => {
      console.log("📡 Received Like Update:", postId);
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId ? { ...post, likes } : post
        )
      );
    });

    socket.on("commentAdded", ({ postId, comment }) => {
      console.log("Received Comment Update:", postId);
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? { ...post, comments: [...(post.comments || []), comment] }
            : post
        )
      );
    });

    return () => {
      socket.off("likeUpdated");
      socket.off("commentAdded");
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/ReachNex/gettingAllPosts");
      setPosts(res.data.Posts || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const handleLike = async (postId) => {
    if (!user || !user.id) return alert("User not found");
    try {
      const res = await axios.post("http://localhost:5000/ReachNex/likePost", {
        postId: postId,
        userId: user.id || user._id,
      });
      console.log("Like Sent:", res.data);
    } catch (err) {
      console.error("Like Error:", err);
    }
  };

  const handleComment = async (postId, text) => {
    console.log(user,"........")
    if (!user || !user.id ) return alert("User not found");
    try {
      const res = await axios.post("http://localhost:5000/ReachNex/commentPost", {
        postId: postId,
        userId: user.id,
        text,
      });
      console.log("Comment Sent:", res.data);
    } catch (err) {
      console.error("Comment Error:", err);
    }
  };

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.postContainer}>
          <img
            className={style.profilePic}
            src={
              user?.profilePic ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"
            }
            alt="Profile"
          />
          <button
            className={style.postButton}
            onClick={() => navigate("/Post")}
          >
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

      <div className={style.feedSection}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className={style.postCard}>
              <div className={style.postUser}>
                <img
                  className={style.postProfile}
                  src={post.userId?.profilePicture || "https://i.pravatar.cc/300"}
                  alt="User"
                />
                <h4>{post.userId?.username || "User"}</h4>
              </div>
              <p>{post.caption}</p>
              {post.mediaUrl &&
                (post.mediaUrl.includes("video") ? (
                  <video controls className={style.postMedia} src={post.mediaUrl} />
                ) : (
                  <img className={style.postMedia} src={post.mediaUrl} alt="Post" />
                ))}

              <div className={style.actions}>
                <button onClick={() => handleLike(post._id)}>
                  Like ({post.likes?.length || 0})
                </button>
                <button
                  onClick={() => {
                    const text = prompt("Add your comment:");
                    if (text) handleComment(post._id, text);
                  }}
                >
                  Comment ({post.comments?.length || 0})
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            No posts found
          </p>
        )}
      </div>
    </>
  );
};

export default PostInputBox;
