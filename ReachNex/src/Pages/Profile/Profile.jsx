import React, { useEffect, useState } from 'react'
import './Profile.css'
import { FaCamera, FaPen, FaUserAlt } from 'react-icons/fa'
import axios from 'axios'

/**
 * LinkedIn‑style Profile  ─ now starts with empty banner & avatar
 * User uploads first‑time images via camera‑icon pop‑ups
 */

const dummyProfile = {
  name: 'Muhammad Shazaib',
  profession: 'Software Engineer',
  location: 'Lahore, Pakistan',
  connections: 4,
  profileImage: '',        // ← empty initially
  bannerImage: '',         // ← empty initially
}

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const [showBannerPopup, setShowBannerPopup] = useState(false)
  const [showAvatarPopup, setShowAvatarPopup] = useState(false)
  const [showEditPopup, setShowEditPopup] = useState(false)

  const [editForm, setEditForm] = useState({})
  const [bannerPreview, setBannerPreview] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)

  /* ───────────────────────── Fetch once ───────────────────────── */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/profile')
        setProfile(data)
      } catch (_) {
        console.warn('Using dummy data')
        setProfile(dummyProfile)
      }
    }
    fetchProfile()
  }, [])

  if (!profile) return <div>Loading…</div>

  /* ───────────────────────── Handlers ───────────────────────── */
  const handleTextSave = () => {
    setProfile({ ...profile, ...editForm })
    setShowEditPopup(false)
  }

  const fileToBase64 = (file, cb) => {
    const reader = new FileReader()
    reader.onloadend = () => cb(reader.result)
    reader.readAsDataURL(file)
  }

  const handleBannerFile = (e) => {
    const file = e.target.files[0]
    if (file) fileToBase64(file, setBannerPreview)
  }

  const handleAvatarFile = (e) => {
    const file = e.target.files[0]
    if (file) fileToBase64(file, setAvatarPreview)
  }

  const saveBanner = () => {
    if (bannerPreview) setProfile({ ...profile, bannerImage: bannerPreview })
    setBannerPreview(null)
    setShowBannerPopup(false)
  }

  const saveAvatar = () => {
    if (avatarPreview) setProfile({ ...profile, profileImage: avatarPreview })
    setAvatarPreview(null)
    setShowAvatarPopup(false)
  }

  /* ───────────────────────── JSX ───────────────────────── */
  return (
    <div className="profile-container">
      {/* ▌ Banner */}
      <div className="banner">
        {profile.bannerImage ? (
          <img src={profile.bannerImage} alt="Banner" className="banner-img" />
        ) : (
          <div className="banner-placeholder" />
        )}
        <button
          className="edit-banner-btn"
          title="Change cover photo"
          onClick={() => setShowBannerPopup(true)}
        >
          <FaCamera />
        </button>

        {/* ▌ Avatar */}
        <div
          className="profile-pic-wrapper"
          title="Change profile photo"
          onClick={() => setShowAvatarPopup(true)}
        >
          {profile.profileImage ? (
            <img src={profile.profileImage} alt="Profile" className="profile-img" />
          ) : (
            <div className="profile-img placeholder"><FaUserAlt /></div>
          )}
          <span className="avatar-overlay"><FaCamera /></span>
        </div>
      </div>

      {/* ▌ Details */}
      <div className="details">
        <div className="name-row">
          <h2>{profile.name}</h2>
          <button
            className="edit-name-btn"
            onClick={() => {
              setEditForm({
                name: profile.name,
                profession: profile.profession,
                location: profile.location,
              })
              setShowEditPopup(true)
            }}
          >
            <FaPen />
          </button>
        </div>
        <p>{profile.profession}</p>
        <p>{profile.location}</p>
        <p>{profile.connections} connections</p>
        <div className="actions">
          <button>Open to</button>
          <button>Share profile</button>
          <button>More</button>
        </div>
      </div>

      {/* ▌ Popups */}
      {showBannerPopup && (
        <Popup onClose={() => setShowBannerPopup(false)}>
          <h3>Upload or Add your cover photo</h3>
          <input type="file" accept="image/*" onChange={handleBannerFile} />
          {bannerPreview && <img src={bannerPreview} className="popup-preview" alt="preview" />}
          <div className="popup-actions">
            <button onClick={saveBanner}>Save</button>
            <button onClick={() => setShowBannerPopup(false)}>Cancel</button>
          </div>
        </Popup>
      )}

      {showAvatarPopup && (
        <Popup onClose={() => setShowAvatarPopup(false)}>
          <h3>Upload or Add your profile photo</h3>
          <input type="file" accept="image/*" onChange={handleAvatarFile} />
          {avatarPreview && <img src={avatarPreview} className="popup-preview" alt="preview" />}
          <div className="popup-actions">
            <button onClick={saveAvatar}>Save</button>
            <button onClick={() => setShowAvatarPopup(false)}>Cancel</button>
          </div>
        </Popup>
      )}

      {showEditPopup && (
        <Popup onClose={() => setShowEditPopup(false)}>
          <h3>Edit Information</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          />
          <input
            type="text"
            name="profession"
            placeholder="Profession"
            value={editForm.profession}
            onChange={(e) => setEditForm({ ...editForm, profession: e.target.value })}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={editForm.location}
            onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
          />
          <div className="popup-actions">
            <button onClick={handleTextSave}>Save</button>
            <button onClick={() => setShowEditPopup(false)}>Cancel</button>
          </div>
        </Popup>
      )}
    </div>
  )
}

/* ───────────────────────── Reusable Popup ───────────────────────── */
function Popup({ children, onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

/*************************************************************************
   Additional CSS tweaks (append to Profile.css)
**************************************************************************/
