import React from 'react'
import "./Profile.css"
import img from "../../assets/react.svg"
const Profile = () => {
  return (
    <div>
      <div className='Container'>
          <div className='MainDiv'>
            <div className='profile'>
                <img className='img' src='https://media.licdn.com/dms/image/v2/D4D22AQGP1y6mhK9vzg/feedshare-shrink_800/B4DZc5ysy8GgAg-/0/1749021292012?e=1753315200&v=beta&t=tTi0UUsi1dMytYg6i2D66q35C4cIGkDl1n4zsWb80IA'/>
                <div className='profileimg'>
                  <img className='profileimg1' src="https://media.licdn.com/dms/image/v2/D4E22AQGzdwFPF_HJvA/feedshare-shrink_800/B4EZd07dtcHIAo-/0/1750013435577?e=1753315200&v=beta&t=nT64i52Jwur_krzOPc6WutE2jVZ05WcSNAGaZOBzzMU" alt="" />
                </div>
                <div></div>
            </div>
            <div className='main'>
                <div >
                  <div className='name'>Muhammad Shazaib</div>
                  <div className='profession'>I am a Software engineer</div>
                  <div className='location'>Lahore, Pakistan</div>
                  <div className='connection'>4 Connection</div>

                  <div className='buttondiv'>
                    <div className='buttonmain'>
                      <div className='btn'>Open to</div>
                      <div className='btn'>Share</div>
                      <div className='btn'>Log out</div>
                    </div>
                    <div className='buttonmain'>
                      <div className='btn'>Message</div>
                      <div className='btn'>Connect</div>
                    </div>
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
