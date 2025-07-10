import React, { useEffect } from 'react';
import './NetworkPage.css';
import { useNavigate } from 'react-router-dom';

const suggested = [
  {
    id: 1,
    name: "Ali Khan",
    title: "Frontend Developer",
    mutuals: "3 mutual connections",
    image: "https://www.w3schools.com/howto/img_avatar.png",
  },
  {
    id: 2,
    name: "Sara Ali",
    title: "Product Manager",
    mutuals: "2 mutual connections",
    image: "https://www.w3schools.com/howto/img_avatar2.png",
  },
  {
    id: 3,
    name: "Zoya Sheikh",
    title: "UI/UX Designer",
    mutuals: "5 mutual connections",
    image: "https://www.w3schools.com/howto/img_avatar2.png",
  },
  {
    id: 4,
    name: "Hamza Yousaf",
    title: "Backend Engineer",
    mutuals: "1 mutual connection",
    image: "https://www.w3schools.com/howto/img_avatar.png",
  },
];

const Network = () => {
  const navigate = useNavigate();

     useEffect(() => {
    const tokenforlocalstorage = localStorage.getItem("token");
    console.log(tokenforlocalstorage, "mmmmmmmmmmmmmmmmmmmmmmmmmmmm");

    if (!tokenforlocalstorage) {
      // No token, redirect to login
      // navigate("/");
      alert("you need to login first")
      navigate("/")
      return;
    }

    let decoded;
    try {
      decoded = jwtDecode(tokenforlocalstorage);
    } catch (err) {
      console.log("Invalid token:", err);
      // navigate("/");
      return;
    }

    const { username, fullname, email, id } = decoded;
    console.log(id, "tttttttttt");

    if (!id) {
      // navigate("/");
      return;
    }

    // Verify user by ID on backend
    const verifyUser = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/reachnex/verifyloginuser",
          { id }
        );

        // Assuming res.data.findUser contains user info
        // setUser(res.data.findUser);
      } catch (err) {
        console.log(err);
        console.log("Invalid credentials");
        // navigate("/");
      }
    };

    verifyUser();
  }, [navigate]);
  return (
    <div className="network-layout">
      <aside className="network-sidebar">
        <h3>Manage my network</h3>
        <ul>
          <li>Connections</li>
          <li>Contacts</li>
          <li>Following & Followers</li>
          <li>Groups</li>
          <li>Events</li>
          <li>Pages</li>
        </ul>
      </aside>

      <main className="network-main">
        <h2>People you may know</h2>
        <div className="suggestion-grid">
          {suggested.map((person) => (
            <div key={person.id} className="suggestion-card">
              <img src={person.image} alt={person.name} />
              <h4>{person.name}</h4>
              <p>{person.title}</p>
              <span>{person.mutuals}</span>
              <button>Connect</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Network;