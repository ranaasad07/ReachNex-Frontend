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
  const [openCommentBox, setOpenCommentBox] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [replyInputs, setReplyInputs] = useState({});

  useEffect(() => {
    fetchPosts();

    socket.on("likeUpdated", ({ postId, likes }) => {
      setPosts((prev) =>
        prev.map((post) => (post._id === postId ? { ...post, likes } : post))
      );
    });

    socket.on("commentAdded", ({ postId, comment }) => {
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? { ...post, comments: [...(post.comments || []), comment] }
            : post
        )
      );
    });

    socket.on("replyAdded", ({ postId, commentId, reply }) => {
      setPosts((prev) =>
        prev.map((post) => {
          if (post._id !== postId) return post;
          const updatedComments = post.comments.map((cmt) =>
            cmt._id === commentId
              ? { ...cmt, replies: [...(cmt.replies || []), reply] }
              : cmt
          );
          return { ...post, comments: updatedComments };
        })
      );
    });

    return () => {
      socket.off("likeUpdated");
      socket.off("commentAdded");
      socket.off("replyAdded");
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/ReachNex/gettingAllPosts"
      );
      setPosts(res.data.Posts || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const handleLike = async (postId) => {
    if (!user || !user.id) return alert("User not found");
    try {
      await axios.post("http://localhost:5000/ReachNex/likePost", {
        postId,
        userId: user.id || user._id,
      });
    } catch (err) {
      console.error("Like Error:", err);
    }
  };

  const handleComment = async (postId) => {
    const text = commentInputs[postId];
    if (!text) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/ReachNex/commentPost",
        {
          postId,
          userId: user.id || user._id,
          text,
        }
      );

      if (res.status === 200) {
        setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
        setOpenCommentBox(null);
      }
    } catch (err) {
      console.error("Comment Error:", err);
    }
  };

  const handleReply = async (postId, commentId) => {
    const replyText = replyInputs[commentId];
    if (!replyText) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/ReachNex/replyComment",
        {
          postId,
          commentId,
          userId: user.id || user._id,
          text: replyText,
        }
      );

      if (res.status === 200) {
        setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
      }
    } catch (err) {
      console.error("Reply Error:", err);
    }
  };

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.postContainer}>
          <img
            className={style.profilePic}
            src={
              user?.profilePicture ||
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
            <li>
              <VideocamIcon /> Video
            </li>
            <li>
              <AddAPhotoIcon /> Pic
            </li>
            <li>
              <ArticleIcon /> Article
            </li>
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
                  src={
                    post.userId?.profilePicture || "https://i.pravatar.cc/300"
                  }
                  alt="User"
                />
                <h4>{post.userId?.username || "User"}</h4>
              </div>
              <p>{post.caption}</p>
              {post.mediaUrl &&
                (post.mediaUrl.includes("video") ? (
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
                ))}

              <div className={style.actions}>
                <button onClick={() => handleLike(post._id)}>
                  👍 Like ({post.likes?.length || 0})
                </button>
                <button onClick={() => setOpenCommentBox(post._id)}>
                  💬 Comment ({post.comments?.length || 0})
                </button>
              </div>

              {openCommentBox === post._id && (
                <div className={style.commentBox}>
                  <div className={style.commentBoxHeader}>
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentInputs[post._id] || ""}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({
                          ...prev,
                          [post._id]: e.target.value,
                        }))
                      }
                      className={style.commentInput}
                    />
                    <button
                      onClick={() => setOpenCommentBox(null)}
                      className={style.closeBtn}
                    >
                      ❌
                    </button>
                    <button
                      onClick={() => handleComment(post._id)}
                      className={style.commentBtn}
                    >
                      Post
                    </button>
                  </div>

                  <div className={style.commentList}>
                    {post.comments?.map((cmt, i) => (
                      <div key={i} className={style.commentItem}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <img
                            src={
                              cmt.userId?.profilePicture ||
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"
                            }
                            alt="user"
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                            }}
                          />
                          <strong>{cmt.userId?.username || "User"}</strong>
                        </div>
                        <p style={{ marginLeft: 42 }}>{cmt.text}</p>

                        <div className={style.replySection}>
                          {cmt.replies?.map((reply, rIdx) => (
                            <div key={rIdx} style={{ marginLeft: 52 }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                }}
                              >
                                <img
                                  src={
                                    reply.userId?.profilePicture ||
                                    "https://i.pravatar.cc/30"
                                  }
                                  style={{
                                    width: 28,
                                    height: 28,
                                    borderRadius: "50%",
                                  }}
                                  alt="reply-user"
                                />
                                <strong>
                                  {reply.userId?.username || "User"}
                                </strong>
                              </div>
                              <p style={{ marginLeft: 36 }}>{reply.text}</p>
                            </div>
                          ))}

                          <div style={{ marginLeft: 42, marginTop: 6 }}>
                            <input
                              type="text"
                              placeholder="Write a reply..."
                              value={replyInputs[cmt._id] || ""}
                              onChange={(e) =>
                                setReplyInputs((prev) => ({
                                  ...prev,
                                  [cmt._id]: e.target.value,
                                }))
                              }
                              className={style.commentInput}
                            />
                            <button
                              onClick={() => handleReply(post._id, cmt._id)}
                              className={style.commentBtn}
                            >
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
