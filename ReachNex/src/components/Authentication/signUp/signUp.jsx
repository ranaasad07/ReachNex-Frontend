// SignUpForm.jsx
import styles from './signUp.module.css';
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationContext from '../../Contexts/AuthenticationContext/AuthenticationContext';
import { jwtDecode } from 'jwt-decode';
// jwtDecode
const SignUpForm = () => {
    const emailContext = useContext(AuthenticationContext);
    console.log(emailContext)

    const [formData, setFormData] = useState({ email: '', password: '', fullName: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

//  route protect
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
                // setUser(res.data.findUser);
                alert(" you need to logout first")
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


    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData)
    // function generateOTP(){
    //   return  Math.floor(100000 + Math.random() * 900000);

    // }
    // console.log(code);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            emailContext.emailForOtp = formData.email;
            await axios.post('http://localhost:5000/ReachNex/SignUp', formData);
                                    
            setLoading(false);
            toast.success("Account created! Please verify your email 📩", {
                  autoClose: 1000,
                  onClose: () => {
                      navigate("/Verify");                    
                  },
                });

        } catch (err) {
            alert(err.response?.data?.message || 'Error registering user');
            toast.error("Error registering user");
            setLoading(false); 
        }
    };

    return (
        <div className="container mt-5 d-flex flex-column align-items-center">
            <div className={`p-4 ${styles.signUpBox}`}>
                <h1 className="text-center mb-4">ReachNex</h1>
                <p className='text-center'>Sign up to see photos and videos<br /> from your friends</p>
                <form onSubmit={handleSubmit} autoComplete='off'>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                        <label>Full Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Mobile Number and Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <label>Mobile Number and Email</label>
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

                    {/* <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        <label>Username</label>

                        <p className="text-center my-4" style={{ fontSize: '13px' }}>
                            People who use our service may have uploaded your contact information to ReachNex. Learn More<br />
                            By signing up, you agree to our <a href="#">Terms</a>, <a href="#">Privacy Policy</a> and <a href="#">Cookies Policy</a>.
                        </p>
                    </div> */}
                    <button
                        className="btn btn-primary w-100 d-flex justify-content-center align-items-center"
                        type="submit"
                        disabled={loading}
                        style={{ height: '40px' }}
                    >
                        {loading ? (
                            <span className={styles.spinner} />
                        ) : (
                            "Sign up"
                        )}
                    </button>


                </form>

            </div>
            <div className={styles.login}>
                <p>Have an account? <br /><Link to="/">Login</Link></p>
            </div>
        </div>
    );
};

export default SignUpForm;
