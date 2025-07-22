// import React, { useEffect } from 'react';
// import './NetworkPage.css';
// import { useNavigate } from 'react-router-dom';

// const suggested = [
//   {
//     id: 1,
//     name: "Ali Khan",
//     title: "Frontend Developer",
//     mutuals: "3 mutual connections",
//     image: "https://www.w3schools.com/howto/img_avatar.png",
//   },
//   {
//     id: 2,
//     name: "Sara Ali",
//     title: "Product Manager",
//     mutuals: "2 mutual connections",
//     image: "https://www.w3schools.com/howto/img_avatar2.png",
//   },
//   {
//     id: 3,
//     name: "Zoya Sheikh",
//     title: "UI/UX Designer",
//     mutuals: "5 mutual connections",
//     image: "https://www.w3schools.com/howto/img_avatar2.png",
//   },
//   {
//     id: 4,
//     name: "Hamza Yousaf",
//     title: "Backend Engineer",
//     mutuals: "1 mutual connection",
//     image: "https://www.w3schools.com/howto/img_avatar.png",
//   },
// ];

// const Network = () => {
//   const navigate = useNavigate();

//      useEffect(() => {
//     const tokenforlocalstorage = localStorage.getItem("token");
//     console.log(tokenforlocalstorage, "mmmmmmmmmmmmmmmmmmmmmmmmmmmm");

//     if (!tokenforlocalstorage) {
//       // No token, redirect to login
//       // navigate("/");
//       alert("you need to login first")
//       navigate("/")
//       return;
//     }

//     let decoded;
//     try {
//       decoded = jwtDecode(tokenforlocalstorage);
//     } catch (err) {
//       console.log("Invalid token:", err);
//       // navigate("/");
//       return;
//     }

//     const { username, fullname, email, id } = decoded;
//     console.log(id, "tttttttttt");

//     if (!id) {
//       // navigate("/");
//       return;
//     }

//     // Verify user by ID on backend
//     const verifyUser = async () => {
//       try {
//         const res = await axios.post(
//           "http://localhost:5000/reachnex/verifyloginuser",
//           { id }
//         );

//         // Assuming res.data.findUser contains user info
//         // setUser(res.data.findUser);
//       } catch (err) {
//         console.log(err);
//         console.log("Invalid credentials");
//         // navigate("/");
//       }
//     };

//     verifyUser();
//   }, [navigate]);
//   return (
//     <div className="network-layout">
//       <aside className="network-sidebar">
//         <h3>Manage my network</h3>
//         <ul>
//           <li>Connections</li>
//           <li>Contacts</li>
//           <li>Following & Followers</li>
//           <li>Groups</li>
//           <li>Events</li>
//           <li>Pages</li>
//         </ul>
//       </aside>

//       <main className="network-main">
//         <h2>People you may know</h2>
//         <div className="suggestion-grid">
//           {suggested.map((person) => (
//             <div key={person.id} className="suggestion-card">
//               <img src={person.image} alt={person.name} />
//               <h4>{person.name}</h4>
//               <p>{person.title}</p>
//               <span>{person.mutuals}</span>
//               <button>Connect</button>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Network;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import jwtDecode from 'jwt-decode';
// import Suggestions from './Suggestions';
// import PendingRequests from './PendingRequests';
// import ConnectionsList from './ConnectionsList';

// const NetworkPage = () => {
//   const [token, setToken] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const tkn = localStorage.getItem('token');
//     if (!tkn) {
//       alert('Please log in.');
//       return navigate('/');
//     }
//     try {
//       jwtDecode(tkn); // optionally verify exp/fields
//       setToken(tkn);
//     } catch {
//       alert('Invalid token');
//       return navigate('/');
//     }
//   }, [navigate]);

//   if (!token) return null;

//   return (
//     <div className="network-page">
//       <aside>
//         <h2>Manage My Network</h2>
//         <ul>
//           <li><a href="#suggestions">Suggestions</a></li>
//           <li><a href="#pending">Pending Requests</a></li>
//           <li><a href="#connections">Connections</a></li>
//         </ul>
//       </aside>
//       <main>
//         <section id="suggestions"><Suggestions token={token} /></section>
//         <section id="pending"><PendingRequests token={token} /></section>
//         <section id="connections"><ConnectionsList token={token} /></section>
//       </main>
//     </div>
//   );
// };

// export default NetworkPage;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Suggestions from './Suggestions';
import PendingRequests from './PendingRequests';
import ConnectionsList from './ConnectionsList';
import './NetworkPage.css';

const NetworkPage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      alert('Please login first');
      return navigate('/');
    }
    try {
      const decoded = jwtDecode(storedToken);
      if (!decoded.id) throw new Error('Invalid token');
      setToken(storedToken);
    } catch {
      alert('Invalid session');
      navigate('/');
    }
  }, [navigate]);

  if (!token) return null;

  return (
    <div className="network-layout">
      <aside className="network-sidebar">
        <h3>Manage My Network</h3>
        <ul>
          <li><a href="#suggestions">Suggestions</a></li>
          <li><a href="#pending">Pending Requests</a></li>
          <li><a href="#connections">Connections</a></li>
        </ul>
      </aside>
      <main className="network-main">
        <Suggestions token={token} />
        <PendingRequests token={token} />
        <ConnectionsList token={token} />
      </main>
    </div>
  );
};

export default NetworkPage;
