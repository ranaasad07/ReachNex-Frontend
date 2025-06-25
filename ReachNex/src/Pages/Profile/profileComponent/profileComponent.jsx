import React, { useEffect, useState, useContext } from "react";
import "../Profile.css";
import { FaCamera, FaPen, FaUserAlt } from "react-icons/fa";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AuthenticationContext from "../../../components/Contexts/AuthenticationContext/AuthenticationContext";
import useAuth from '../../../components/Authentication/useAuth/useAuth';


function Popup({ children, onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default function ProfileComponent() {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthenticationContext);

  const [profile, setProfile] = useState(null);
   const [perUser, setPerUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", profession: "", location: "" });

  const id = useAuth()

    useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/ReachNex/getuser/${id.id}`);
        if (!response.data) {
          alert("Failed to show user");
          return;
        }
        setPerUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (id?.id) {
      fetchUser();
    }
  }, []);
  
  if (errorMsg) return <div>{errorMsg}</div>;

  const openCloudinaryWidget = (callback) => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "dlhjpvfik",
        uploadPreset: "image_upload",
        sources: ["local", "url", "camera"],
        cropping: false,
        multiple: false,
        folder: "profile_uploads",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          callback(result.info.secure_url);
        } else if (error) {
          console.error("Cloudinary Error:", error);
        }
      }
    );
  };

  const uploadBannerViaWidget = () => {
    openCloudinaryWidget(async (imageUrl) => {
      try {
        const { data } = await axios.put(
          "http://localhost:5000/ReachNex/banner",
          { image: imageUrl },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
// console.log("Logged in user:", user);
// console.log("JWT token:", localStorage.getItem("token"));


        if (data && data._id) {
          setProfile(data);
          setUser(data);
        } else {
          console.error("Invalid profile response:", data);
        }
      } catch (err) {
        console.error("Banner update error:", err);
      }
    });
  };

  const uploadAvatarViaWidget = () => {
    openCloudinaryWidget(async (imageUrl) => {
      try {
        const { data } = await axios.put(
          "http://localhost:5000/ReachNex/avatar",
          { image: imageUrl },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setProfile(data);
        setUser(data);
      } catch (err) {
        console.error("Avatar update error:", err);
      }
    });
  };

  const handleTextSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.put("http://localhost:5000/ReachNex/details", editForm, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setProfile(data);
      setUser(data);
    } catch (err) {
      console.error("Details update error:", err);
    }
    setShowEditPopup(false);
  };

  return (
    <div className="profile-container">
      <div className="banner">
        {perUser?.bannerImage ? (
          <img src={perUser.bannerImage} alt="Banner" className="banner-img" />
        ) : (
          <div className="banner-placeholder" />
        )}
        {!username && (
          <button className="edit-banner-btn" title="Change cover photo" onClick={uploadBannerViaWidget}>
            <FaCamera />
          </button>
        )}
        <div className="profile-pic-wrapper" onClick={() => !username && uploadAvatarViaWidget()}>
          {perUser?.profilePicture ? (
            <img src={perUser.profilePicture} alt="Profile" className="profile-img" />
          ) : (
            <div className="profile-img placeholder"><FaUserAlt /></div>
          )}
          {!username && <span className="avatar-overlay"><FaCamera /></span>}
        </div>
      </div>

      <div className="details">
        <div className="name-row">
          <h2>{perUser?.fullName}</h2>
          {!username && (
            <button className="edit-name-btn" onClick={() => {
              setEditForm({
                fullName: perUser?.fullName,
                profession: perUser?.profession,
                location: perUser?.location,
              });
              setShowEditPopup(true);
            }}>
              <FaPen />
            </button>
          )}
        </div>
        <p>{perUser?.profession}</p>
        <p>{perUser?.location}</p>
        <p>{perUser?.connections} connections</p>

        {!username && (
          <div className="actions">
            <button onClick={() => navigate("/jobs")}>Open to</button>
            <button>Share profile</button>
            <button>More</button>
          </div>
        )}
      </div>

      {showEditPopup && (
        <Popup onClose={() => setShowEditPopup(false)}>
          <h3>Edit Details</h3>
          <input type="text" placeholder="Name" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
          <input type="text" placeholder="Profession" value={editForm.profession} onChange={e => setEditForm({ ...editForm, profession: e.target.value })} />
          <input type="text" placeholder="Location" value={editForm.location} onChange={e => setEditForm({ ...editForm, location: e.target.value })} />
          <div className="popup-actions">
            <button onClick={handleTextSave}>Save</button>
            <button onClick={() => setShowEditPopup(false)}>Cancel</button>
          </div>
        </Popup>
      )}
    </div>
  );
}
