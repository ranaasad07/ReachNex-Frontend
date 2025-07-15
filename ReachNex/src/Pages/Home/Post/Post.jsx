import React, { useState, useRef, useEffect, useContext } from "react";
import AuthenticationContext from "../../../components/Contexts/AuthenticationContext/AuthenticationContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Post = () => {
  const { user } = useContext(AuthenticationContext);
  const [showTextarea, setShowTextarea] = useState(false);
  const [desc, setDesc] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const navigate = useNavigate();

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dlhjpvfik", // 🔁 Replace with your cloud name
        uploadPreset: "image_upload", // 🔁 Replace with your upload preset
      },
      function (error, result) {
        if (!error && result?.event === "success") {
          setMediaUrl(result.info.secure_url);
          console.log("Uploaded:", result.info.secure_url);
        }
        
      }
    );
  }, []);

  const handlePost = async () => {
    if (!desc && !mediaUrl) {
      return alert("Please add a description or upload media.");
    }

    try {
      const formData = {
        userId: user?._id || user?.id, // 👈 safest check
        mediaUrl,
        caption: desc,
      };
        console.log(formData)
      const res = await axios.post(
        "http://localhost:5000/ReachNex/uploadPost",
        formData
      );

      // alert("✅ Post created successfully!");
      toast.success("Post created successfully!", {
      autoClose: 1000,
      onClose: () => {
      // Reset
      setDesc("");
      setMediaUrl("");
      setShowTextarea(false);
      navigate("/feed");
      },
    });

 
    } catch (err) {
      alert(err?.response?.data?.message || "❌ Failed to upload post.");
      console.error(err);
    }
  };

  return (
    <div style={styles.card}>
      {/* User Info */}
      <div style={styles.user}>
        <img
          src={
            user?.profilePicture
              ? user.profilePicture
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"
          }
          alt="profile"
          style={styles.avatar}
        />
        <h3>{user?.fullName || "User"}</h3>
      </div>

      {/* Add Description */}
      <button style={styles.button} onClick={() => setShowTextarea(true)}>
        Add Description
      </button>

      {showTextarea && (
        <textarea
          style={styles.textarea}
          rows={5}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="What's on your mind?"
        />
      )}

      {/* Upload Media */}
      <button style={styles.button} onClick={() => widgetRef.current.open()}>
        Add Image / Video
      </button>

      {mediaUrl && (
        <div style={{ marginTop: 10 }}>
          {mediaUrl.includes("video") ? (
            <video src={mediaUrl} controls style={styles.preview} />
          ) : (
            <img src={mediaUrl} alt="Preview" style={styles.preview} />
          )}
        </div>
      )}

      {/* Post Buttons */}
      <div style={styles.actions}>
        <button onClick={() => navigate("/feed")} style={styles.cancel}>
          Cancel
        </button>
        <button onClick={handlePost} style={styles.post}>
          Post
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    maxWidth: 600,
    margin: "40px auto",
    padding: 24,
    background: "#fff",
    borderRadius: 12,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  user: { display: "flex", gap: 12, alignItems: "center" },
  avatar: { width: 50, height: 50, borderRadius: "50%" },
  button: {
    background: "#eee",
    padding: "8px 12px",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  textarea: {
    padding: 10,
    fontSize: 15,
    borderRadius: 8,
    border: "1px solid #ccc",
    resize: "vertical",
  },
  preview: {
    maxWidth: "100%",
    maxHeight: 250,
    borderRadius: 8,
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
  },
  cancel: {
    background: "#ccc",
    border: "none",
    padding: "8px 20px",
    borderRadius: 20,
    cursor: "pointer",
  },
  post: {
    background: "#0a66c2",
    color: "#fff",
    border: "none",
    padding: "8px 24px",
    borderRadius: 20,
    cursor: "pointer",
  },
};

export default Post;
