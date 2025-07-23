// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function PostDetail() {
//   const { postId } = useParams();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/ReachNex/posts/${postId}`);
//         setPost(res.data);
//       } catch (err) {
//         console.error("Error fetching post:", err);
//         setError("Failed to load post.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [postId]);

//   if (loading) return <div>Loading post...</div>;
//   if (error) return <div>{error}</div>;
//   if (!post) return <div>Post not found.</div>;

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Post Details</h2>
//       <div
//         style={{
//           border: "1px solid #ccc",
//           padding: 15,
//           borderRadius: 8,
//           marginBottom: 20,
//         }}
//       >
//         <p><strong>Posted By:</strong> {post.userId?.fullName || "Unknown"}</p>
//         <p><strong>Content:</strong> {post.text}</p>
//         <p><strong>Likes:</strong> {post.likes?.length || 0}</p>
//         <p><strong>Comments:</strong> {post.comments?.length || 0}</p>
//         <p><strong>Posted On:</strong> {new Date(post.createdAt).toLocaleString()}</p>
//       </div>

//       {/* Optionally render comments */}
//       <div>
//         <h3>Comments</h3>
//         {post.comments?.length ? (
//           <ul>
//             {post.comments.map((c) => (
//               <li key={c._id} style={{ marginBottom: 10 }}>
//                 <strong>{c.userId?.fullName || "User"}:</strong> {c.text}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No comments yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PostDetail;
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// function PostDetail() {
//   const { postId } = useParams();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/ReachNex/posts/${postId}`);
//         setPost(res.data);
//       } catch (err) {
//         console.error("Error fetching post:", err);
//         setError("Failed to load post.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [postId]);

//   if (loading) return <div style={styles.message}>Loading post...</div>;
//   if (error) return <div style={styles.message}>{error}</div>;
//   if (!post) return <div style={styles.message}>Post not found.</div>;

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.heading}>Post Details</h2>

//       <div style={styles.card}>
//         <p><strong>Posted By:</strong> {post.userId?.fullName || "Unknown"}</p>
//         {post.mediaUrl && (
//           <div style={styles.mediaWrapper}>
//             {post.mediaUrl.includes("video") ? (
//               <video src={post.mediaUrl} controls style={styles.media} />
//             ) : (
//               <img src={post.mediaUrl} alt="Post Media" style={styles.media} />
//             )}
//           </div>
//         )}
//         <p><strong>Content:</strong> {post.caption || post.text}</p>
//         <p><strong>Likes:</strong> {post.likes?.length || 0}</p>
//         <p><strong>Comments:</strong> {post.comments?.length || 0}</p>
//         <p><strong>Posted On:</strong> {new Date(post.createdAt).toLocaleString()}</p>
//       </div>

//       <div style={styles.commentSection}>
//         <h3 style={{ marginBottom: 10 }}>Comments</h3>
//         {post.comments?.length ? (
//           <ul style={styles.commentList}>
//             {post.comments.map((c) => (
//               <li key={c._id} style={styles.commentItem}>
//                 <strong>{c.userId?.fullName || "User"}:</strong> {c.text}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No comments yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: 700,
//     margin: "40px auto",
//     padding: 24,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//   },
//   heading: {
//     marginBottom: 20,
//     fontSize: 24,
//     borderBottom: "1px solid #ccc",
//     paddingBottom: 10,
//   },
//   card: {
//     padding: 16,
//     backgroundColor: "#f9f9f9",
//     borderRadius: 8,
//     marginBottom: 30,
//     lineHeight: 1.6,
//   },
//   mediaWrapper: {
//     margin: "15px 0",
//   },
//   media: {
//     width: "100%",
//     maxHeight: 400,
//     objectFit: "contain",
//     borderRadius: 8,
//   },
//   commentSection: {
//     padding: "16px",
//     backgroundColor: "#f1f1f1",
//     borderRadius: 8,
//   },
//   commentList: {
//     listStyle: "none",
//     padding: 0,
//     marginTop: 10,
//   },
//   commentItem: {
//     padding: "10px",
//     backgroundColor: "#fff",
//     borderRadius: 6,
//     marginBottom: 8,
//     boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
//   },
//   message: {
//     textAlign: "center",
//     marginTop: 60,
//     fontSize: 18,
//   },
// };

// export default PostDetail;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import style from "../Home/Card/PostInputBox.module.css"; // ✅ Reuse same styling as post card

function PostDetail() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/ReachNex/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <div style={{ textAlign: "center", padding: 20 }}>Loading post...</div>;
  if (error) return <div style={{ textAlign: "center", padding: 20 }}>{error}</div>;
  if (!post) return <div style={{ textAlign: "center", padding: 20 }}>Post not found.</div>;

  return (
    <div className={style.feedSection}>
      <div className={style.postCard}>
        <div className={style.postUser}>
          <img
            onClick={() => navigate(`/profile/${post.userId?.username}`)}
            className={style.postProfile}
            src={
              post.userId?.profilePicture ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"
            }
            alt="User"
          />
          <h4>{post.userId?.fullName || "User"}</h4>
        </div>

        <p>{post.caption || post.text}</p>

        {post.mediaUrl &&
          (post.mediaUrl.includes("video") ? (
            <video controls className={style.postMedia} src={post.mediaUrl} />
          ) : (
            <img className={style.postMedia} src={post.mediaUrl} alt="Post" />
          ))}

        <div className={style.actions}>
          <span>👍 Likes: {post.likes?.length || 0}</span>
          <span>💬 Comments: {post.comments?.length || 0}</span>
        </div>

        <div className={style.commentBox}>
          <h3 style={{ marginBottom: 10 }}>Comments</h3>
          <div className={style.commentList}>
            {post.comments?.length ? (
              post.comments.map((cmt) => (
                <div key={cmt._id} className={style.commentItem}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img
                      src={
                        cmt.userId?.profilePicture ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"
                      }
                      alt="user"
                      style={{ width: 32, height: 32, borderRadius: "50%" }}
                    />
                    <strong>{cmt.userId?.fullName || "User"}</strong>
                  </div>
                  <p style={{ marginLeft: 42 }}>{cmt.text}</p>

                  {cmt.replies?.map((reply, idx) => (
                    <div key={idx} style={{ marginLeft: 52 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <img
                          src={
                            reply.userId?.profilePicture ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"
                          }
                          style={{ width: 28, height: 28, borderRadius: "50%" }}
                          alt="reply-user"
                        />
                        <strong>{reply.userId?.fullName || "User"}</strong>
                      </div>
                      <p style={{ marginLeft: 36 }}>{reply.text}</p>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
