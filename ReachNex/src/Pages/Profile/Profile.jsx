// src/components/Profile.jsx
import React, { useEffect, useState } from "react";
import "./Profile.css";
import { FaCamera, FaPen, FaUserAlt } from "react-icons/fa";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Popup({ children, onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
} 

export default function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [showBannerPopup, setShowBannerPopup] = useState(false);
  const [showAvatarPopup, setShowAvatarPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);

  const [editForm, setEditForm] = useState({ name: "", profession: "", location: "" });
  const [bannerFile, setBannerFile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
  // Temporarily skip API call, use dummy data
  setProfile({
    name: "",
    profession: "",
    location: "",
    profileImage: "",
    bannerImage: "",
    connections: 123
  });
}, []);


  if (errorMsg) return <div>{errorMsg}</div>;
  if (!profile) return <div>Loading…</div>;

  const handleBannerFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerFile(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const saveBanner = async () => {
  if (!bannerFile) return;
  const formData = new FormData();
  formData.append("image", bannerFile);

  try {
    const { data } = await axios.put("http://localhost:5000/ReachNex/banner", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setProfile(data);
  } catch (err) {
    console.error("Banner upload error:", err);
  }

  setBannerFile(null);
  setBannerPreview(null);
  setShowBannerPopup(false);
};


  const handleAvatarFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

const saveAvatar = async () => {
  if (!avatarFile) return;
  const formData = new FormData();
  formData.append("image", avatarFile);

  try {
    const { data } = await axios.put("http://localhost:5000/ReachNex/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    setProfile(data);
  } catch (err) {
    console.error("Avatar upload error:", err);
  }

  setAvatarFile(null);
  setAvatarPreview(null);
  setShowAvatarPopup(false);
};


 const handleTextSave = async () => {
  try {
    let token = localStorage.getItem("token")
    const { data } = await axios.put("http://localhost:5000/ReachNex/details", editForm, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setProfile(data);
  } catch (err) {
    console.error("Details update error:", err);
  }
  setShowEditPopup(false);
};

  return (
    <div className="profile-container">
      <div className="banner">
        {profile.bannerImage ? (
          <img src={profile.bannerImage} alt="Banner" className="banner-img" />
        ) : (
          <div className="banner-placeholder" />
        )}
        {!username && (
          <button className="edit-banner-btn" title="Change cover photo" onClick={() => setShowBannerPopup(true)}>
            <FaCamera />
          </button>
        )}
        <div className="profile-pic-wrapper" onClick={() => !username && setShowAvatarPopup(true)}>
          {profile.profileImage ? (
            <img src={profile.profileImage} alt="Profile" className="profile-img" />
          ) : (
            <div className="profile-img placeholder"><FaUserAlt /></div>
          )}
          {!username && <span className="avatar-overlay"><FaCamera /></span>}
        </div>
      </div>

      <div className="details">
        <div className="name-row">
          <h2>{profile.name}</h2>
          {!username && (
            <button className="edit-name-btn" onClick={() => { setEditForm({ name: profile.name, profession: profile.profession, location: profile.location }); setShowEditPopup(true); }}>
              <FaPen />
            </button>
          )}
        </div>
        <p>{profile.profession}</p>
        <p>{profile.location}</p>
        <p>{profile.connections} connections</p>
        {!username && (
          <div className="actions">
            <button onClick={() => navigate("/jobs")}>Open to</button>
            <button>Share profile</button>
            <button>More</button>
          </div>
        )}
      </div>

      {showBannerPopup && (
        <Popup onClose={() => setShowBannerPopup(false)}>
          <h3>Upload Cover Photo</h3>
          <input type="file" accept="image/*" onChange={handleBannerFile} />
          {bannerPreview && <img src={bannerPreview} className="popup-preview" alt="Preview" />}
          <div className="popup-actions">
            <button onClick={saveBanner}>Save</button>
            <button onClick={() => setShowBannerPopup(false)}>Cancel</button>
          </div>
        </Popup>
      )}

      {showAvatarPopup && (
        <Popup onClose={() => setShowAvatarPopup(false)}>
          <h3>Upload Profile Photo</h3>
          <input type="file" accept="image/*" onChange={handleAvatarFile} />
          {avatarPreview && <img src={avatarPreview} className="popup-preview" alt="Preview" />}
          <div className="popup-actions">
            <button onClick={saveAvatar}>Save</button>
            <button onClick={() => setShowAvatarPopup(false)}>Cancel</button>
          </div>
        </Popup>
      )}

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
