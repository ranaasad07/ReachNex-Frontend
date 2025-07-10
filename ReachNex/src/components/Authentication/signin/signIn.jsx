import styles from "./signIn.module.css";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import AuthenticationContext from "../../../components/Contexts/AuthenticationContext/AuthenticationContext";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

const SignInForm = () => {

  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useContext(AuthenticationContext); // ✅

  // const navigate = useNavigate();
  // const [user, setUser] = useState(null);

  useEffect(() => {
    const tokenforlocalstorage = localStorage.getItem("token");
    console.log(tokenforlocalstorage, "mmmmmmmmmmmmmmmmmmmmmmmmmmmm");

    if (!tokenforlocalstorage) {
      // No token, redirect to login
      // navigate("/");
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
        setUser(res.data.findUser);
        alert("already loged In")
        navigate("/feed")
      } catch (err) {
        console.log(err);
        console.log("Invalid credentials");
        return
        // navigate("/");
      }
    };

    verifyUser();
  }, [navigate]);





  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/ReachNex/login",
        formData
      );
      const { token } = res.data;
      localStorage.setItem("token", token);

      // Decode token to get user id
      const decoded = jwtDecode(token);
      const { id } = decoded;

      // Fetch full user profile
      const userProfileRes = await axios.get(
        `http://localhost:5000/ReachNex/getuser/${id}`
      );
      setUser(userProfileRes.data.user);

      navigate("/feed");
    } catch (err) {
      console.log(err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className={`p-4 ${styles.signUpBox}`}>
        <h1>ReachNex</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </form>

        <div className={styles.login}>
          <p>
            Don't have an account? <br />
            <Link to="/signup">Sign Up</Link>
          </p>
          <p>
            Forget password? <br />
            <Link to="/forgetpassword">Forget Password</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
