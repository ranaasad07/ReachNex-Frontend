// import React, { useEffect, useState, useContext, useRef } from "react";
// import "./ProfileComponent.css";
// import { FaCamera, FaPen, FaUserAlt } from "react-icons/fa";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import io from "socket.io-client";

// import AuthenticationContext from "../../../components/Contexts/AuthenticationContext/AuthenticationContext";
// import useAuth from "../../../components/Authentication/useAuth/useAuth";

// function Popup({ children, onClose }) {
//   return (
//     <div className="popup-overlay" onClick={onClose}>
//       <div className="popup-box" onClick={(e) => e.stopPropagation()}>
//         {children}
//       </div>
//     </div>
//   );
// }

// export default function ProfileComponent() {
//   const { username } = useParams();
//   const navigate = useNavigate();
//   const { user, setUser } = useContext(AuthenticationContext);
//   const [perUser, setPerUser] = useState(null);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [showEditPopup, setShowEditPopup] = useState(false);
//   const [connectionCount, setConnectionCount] = useState(0);

//   const [editForm, setEditForm] = useState({
//     name: "",
//     profession: "",
//     location: "",
//   });
//   const id = useAuth();
//   const cloudinaryRef = useRef();
//   const widgetBannerRef = useRef();
//   const widgetAvatarRef = useRef();

//   const fetchUser = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/ReachNex/getuser/${id.id}`
//       );
//       if (!response.data) return alert("Failed to show user");
//       setPerUser(response.data.user);
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };

//   useEffect(() => {
//     if (id?.id) fetchUser();
//   }, []);

//   if (errorMsg) return <div>{errorMsg}</div>;

//   useEffect(() => {
//     cloudinaryRef.current = window.cloudinary;

//     // Banner widget
//     widgetBannerRef.current = cloudinaryRef.current.createUploadWidget(
//       {
//         cloudName: "dlhjpvfik",
//         uploadPreset: "image_upload",
//       },
//       async function (error, result) {
//         if (!error && result?.event === "success") {
//           try {
//             const { data } = await axios.put(
//               "http://localhost:5000/ReachNex/banner",
//               { image: result.info.secure_url },
//               {
//                 headers: {
//                   Authorization: "Bearer " + localStorage.getItem("token"),
//                 },
//               }
//             );
//             setUser(data);
//             setPerUser(data);
//           } catch (err) {
//             console.error("Banner update error:", err);
//           }
//         }
//       }
//     );

//     // Avatar widget
//     widgetAvatarRef.current = cloudinaryRef.current.createUploadWidget(
//       {
//         cloudName: "dlhjpvfik",
//         uploadPreset: "image_upload",
//       },
//       async function (error, result) {
//         if (!error && result?.event === "success") {
//           try {
//             const { data } = await axios.put(
//               "http://localhost:5000/ReachNex/avatar",
//               { image: result.info.secure_url },
//               {
//                 headers: {
//                   Authorization: "Bearer " + localStorage.getItem("token"),
//                 },
//               }
//             );
//             setUser(data);
//             setPerUser(data);
//           } catch (err) {
//             console.error("Avatar update error:", err);
//           }
//         }
//       }
//     );
//   }, []);

//   // ✅ Banner Upload
//   const uploadBannerViaWidget = () => {
//     openCloudinaryWidget(async (imageUrl) => {
//       try {
//         const { data } = await axios.put(
//           "http://localhost:5000/ReachNex/banner",
//           { image: imageUrl },
//           {
//             headers: {
//               Authorization: "Bearer " + localStorage.getItem("token"),
//             },
//           }
//         );
//         setUser(data);
//         setPerUser(data);
//       } catch (err) {
//         console.error("Banner update error:", err);
//       }
//     });
//   };

//   // ✅ Avatar Upload
//   const uploadAvatarViaWidget = () => {
//     openCloudinaryWidget(async (imageUrl) => {
//       try {
//         const { data } = await axios.put(
//           "http://localhost:5000/ReachNex/avatar",
//           { image: imageUrl },
//           {
//             headers: {
//               Authorization: "Bearer " + localStorage.getItem("token"),
//             },
//           }
//         );
//         // console.log("111111111111111111111111111", data)
//         setUser(data);
//         setPerUser(data); // ✅ Instantly update UI
//       } catch (err) {
//         console.error("Avatar update error:", err);
//       }
//     });
//   };

//   // ✅ Save name/profession/location
//   const handleTextSave = async () => {
//     try {
//       const { data } = await axios.put(
//         "http://localhost:5000/ReachNex/details",
//         editForm,
//         {
//           headers: {
//             Authorization: "Bearer " + localStorage.getItem("token"),
//           },
//         }
//       );
//       setUser(data);
//       setPerUser(data); // ✅ Instantly update UI
//     } catch (err) {
//       console.error("Details update error:", err);
//     }
//     setShowEditPopup(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <div className="profile-container">
//       <div className="banner">
//         {perUser?.bannerImage ? (
//           <img src={perUser.bannerImage} alt="Banner" className="banner-img" />
//         ) : (
//           <div className="banner-placeholder" />
//         )}
//         {!username && (
//           <button
//             className="edit-banner-btn"
//             onClick={() => widgetBannerRef.current.open()}
//           >
//             <FaCamera />
//           </button>
//         )}
//         <div
//           className="profile-pic-wrapper"
//           onClick={() => !username && widgetAvatarRef.current.open()}
//         >
//           {perUser?.profilePicture ? (
//             <img
//               src={perUser.profilePicture}
//               alt="Profile"
//               className="profile-img"
//             />
//           ) : (
//             <div className="profile-img placeholder">
//               <FaUserAlt />
//             </div>
//           )}
//           {!username && (
//             <span className="avatar-overlay">
//               <FaCamera />
//             </span>
//           )}
//         </div>
//       </div>

//       <div className="details">
//         <div className="name-row">
//           <h2>{perUser?.fullName}</h2>
//           {!username && (
//             <button
//               className="edit-name-btn"
//               onClick={() => {
//                 setEditForm({
//                   fullName: perUser?.fullName,
//                   profession: perUser?.profession,
//                   location: perUser?.location,
//                 });
//                 setShowEditPopup(true);
//               }}
//             >
//               <FaPen />
//             </button>
//           )}
//         </div>
//         <p>{perUser?.profession}</p>
//         <p>{perUser?.location}</p>
//         <p>{perUser?.connections} connections</p>

//         {!username && (
//           <div className="actions">
//             <button onClick={() => navigate("/jobs")}>Open to</button>
//             <button>Share profile</button>
//             <button>More</button>
//             <button className="logout" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         )}
//       </div>

//       {showEditPopup && (
//         <Popup onClose={() => setShowEditPopup(false)}>
//           <h3>Edit Details</h3>
//           <input
//             type="text"
//             placeholder="Name"
//             value={editForm.fullName}
//             onChange={(e) =>
//               setEditForm({ ...editForm, fullName: e.target.value })
//             }
//           />
//           <input
//             type="text"
//             placeholder="Profession"
//             value={editForm.profession}
//             onChange={(e) =>
//               setEditForm({ ...editForm, profession: e.target.value })
//             }
//           />
//           <input
//             type="text"
//             placeholder="Location"
//             value={editForm.location}
//             onChange={(e) =>
//               setEditForm({ ...editForm, location: e.target.value })
//             }
//           />
//           <div className="popup-actions">
//             <button onClick={handleTextSave}>Save</button>
//             <button onClick={() => setShowEditPopup(false)}>Cancel</button>
//           </div>
//         </Popup>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState, useContext, useRef } from "react";
import "./ProfileComponent.css";
import { FaCamera, FaPen } from "react-icons/fa";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { toast } from "react-toastify";

import AuthenticationContext from "../../../components/Contexts/AuthenticationContext/AuthenticationContext";
import useAuth from "../../../components/Authentication/useAuth/useAuth";

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
  const [perUser, setPerUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [connectionCount, setConnectionCount] = useState(0);

  const [editForm, setEditForm] = useState({
    name: "",
    profession: "",
    location: "",
  });
  const id = useAuth();
  const cloudinaryRef = useRef();
  const widgetBannerRef = useRef();
  const widgetAvatarRef = useRef();

  const socket = io("http://localhost:5000");

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/ReachNex/getuser/${id.id}`
      );
      if (!response.data) return alert("Failed to show user");
      setPerUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchConnectionCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/ReachNex/user/connections",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setConnectionCount(res.data.count);
    } catch (err) {
      console.error("Failed to fetch connection count:", err);
    }
  };

  useEffect(() => {
    if (id?.id) {
      fetchUser();
      socket.emit("join", id.id);
      fetchConnectionCount();

      socket.on("connectionAccepted", () => {
        fetchConnectionCount();
      });

      return () => {
        socket.off("connectionAccepted");
      };
    }
  }, [id?.id]);

  if (errorMsg) return <div>{errorMsg}</div>;

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    // Banner widget
    widgetBannerRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dlhjpvfik",
        uploadPreset: "image_upload",
      },
      async function (error, result) {
        if (!error && result?.event === "success") {
          try {
            const { data } = await axios.put(
              "http://localhost:5000/ReachNex/banner",
              { image: result.info.secure_url },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );
            setUser(data);
            setPerUser(data);
          } catch (err) {
            console.error("Banner update error:", err);
          }
        }
      }
    );

    // Avatar widget
    widgetAvatarRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dlhjpvfik",
        uploadPreset: "image_upload",
      },
      async function (error, result) {
        if (!error && result?.event === "success") {
          try {
            const { data } = await axios.put(
              "http://localhost:5000/ReachNex/avatar",
              { image: result.info.secure_url },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );
            setUser(data);
            setPerUser(data);
          } catch (err) {
            console.error("Avatar update error:", err);
          }
        }
      }
    );
  }, []);

  // ✅ Banner Upload
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
        setUser(data);
        setPerUser(data);
      } catch (err) {
        console.error("Banner update error:", err);
      }
    });
  };

  // ✅ Avatar Upload
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
        setUser(data);
        setPerUser(data); // ✅ Instantly update UI
      } catch (err) {
        console.error("Avatar update error:", err);
      }
    });
  };

  // ✅ Save name/profession/location
  const handleTextSave = async () => {
    try {
      const { data } = await axios.put(
        "http://localhost:5000/ReachNex/details",
        editForm,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setUser(data);
      setPerUser(data); // ✅ Instantly update UI
    } catch (err) {
      console.error("Details update error:", err);
    }
    setShowEditPopup(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully! 👋");
    setUser(null);
    setTimeout(() => {
      navigate("/");
    }, 1500);
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
          <button
            className="edit-banner-btn"
            onClick={() => widgetBannerRef.current.open()}
          >
            <FaCamera />
          </button>
        )}
        <div
          className="profile-pic-wrapper"
          onClick={() => !username && widgetAvatarRef.current.open()}
        >
          {perUser?.profilePicture ? (
            <img
              src={
                perUser.profilePicture
              
              }
              alt="Profile"
              className="profile-img"
            />
          ) : (
            <div className="profile-img placeholder">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX-cskA2FbOzFi7ACNiGruheINgAXEqFL1TQ&s"/>
            </div>
          )}
          {!username && (
            <span className="avatar-overlay">
              <FaCamera />
            </span>
          )}
        </div>
      </div>

      <div className="details">
        <div className="name-row">
          <h2>{perUser?.fullName}</h2>
          {!username && (
            <button
              className="edit-name-btn"
              onClick={() => {
                setEditForm({
                  fullName: perUser?.fullName,
                  profession: perUser?.profession,
                  location: perUser?.location,
                });
                setShowEditPopup(true);
              }}
            >
              <FaPen />
            </button>
          )}
        </div>
        <p>{perUser?.profession}</p>
        <p>{perUser?.location}</p>
        <p className="connection" onClick={() => navigate("/connections/me")}>
          Connections ({connectionCount}){" "}
        </p>

        {!username && (
          <div className="actions">
            <button onClick={() => navigate("/jobs")}>Open to</button>
            <button>Share profile</button>
            <button>More</button>
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      {showEditPopup && (
        <Popup onClose={() => setShowEditPopup(false)}>
          <h3>Edit Details</h3>
          <input
            type="text"
            placeholder="Name"
            value={editForm.fullName}
            onChange={(e) =>
              setEditForm({ ...editForm, fullName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Profession"
            value={editForm.profession}
            onChange={(e) =>
              setEditForm({ ...editForm, profession: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Location"
            value={editForm.location}
            onChange={(e) =>
              setEditForm({ ...editForm, location: e.target.value })
            }
          />
          <div className="popup-actions">
            <button onClick={handleTextSave}>Save</button>
            <button onClick={() => setShowEditPopup(false)}>Cancel</button>
          </div>
        </Popup>
      )}
    </div>
  );
}
