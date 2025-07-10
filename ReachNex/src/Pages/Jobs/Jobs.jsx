import React, { useEffect } from 'react'
import JobsSection from './jobcomponent/JobSection'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

// useNavigate
const Jobs = () => {
  // alert("jobsec")
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
    <div>
      <JobsSection/>
    </div>
  )
}

export default Jobs