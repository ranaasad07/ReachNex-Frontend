import styles from "./verifyforgetotp.module.css";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { jwtDecode } from 'jwt-decode';
import { Link } from "react-router-dom";
import AuthenticationContext from "../../Contexts/AuthenticationContext/AuthenticationContext";
// import { useUser } from '../Context/UserContext';

// AuthenticationContext

const VerifyForgetOtp = () => {
  const { emailforgetpassword } = useContext(AuthenticationContext);
  const [formData, setFormData] = useState({
    email: emailforgetpassword,
    otp: "",
  });
  // console.log(emailForOtp)
  // console.log(formData)
  // setFormData({...formData, email:emailForOtp})
  const navigate = useNavigate();
  // const { setUser } = useUser();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.email || !formData.otp) {
        alert("Please enter OTP");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/ReachNex/verifyemail",
        formData
      );

      if (res.data.message === "Email verified successfully") {
        alert("OTP verified successfully");
        navigate("/changepassword");
      }
    } catch (err) {
      if (err.response?.status === 400) {
        alert("Invalid OTP. Please try again.");
      } else if (err.response?.status === 404) {
        alert("Email not found. Please try again with correct email.");
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className={`p-4 ${styles.signUpBox}`}>
        <h1>ReachNex</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <p>otp has send to email {formData.email} </p>
            {/* <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <label>Email</label> */}
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              name="otp"
              placeholder="otp"
              value={formData.otp}
              onChange={handleChange}
              required
            />
            <label>Enter OTP</label>
          </div>
          <button className="btn btn-primary w-100" type="submit">
            Verify
          </button>
        </form>

        <div className={styles.login}>
          <p>
            Don't have an account? <br />
            <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyForgetOtp;
