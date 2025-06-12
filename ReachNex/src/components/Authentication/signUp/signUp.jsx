// SignUpForm.jsx
import styles from './signUp.module.css';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import AuthenticationContext from '../../Contexts/AuthenticationContext/AuthenticationContext';

const SignUpForm = () => {
    const emailContext = useContext(AuthenticationContext);
    console.log(emailContext)

    const [formData, setFormData] = useState({ email: '', password: '', fullName: '', username: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData)
    // function generateOTP(){
    //   return  Math.floor(100000 + Math.random() * 900000);

    // }
    // console.log(code);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start spinner

        try {
            emailContext.emailForOtp = formData.email;
            await axios.post('http://localhost:5000/instagram/SignUp', formData);
                                 
            alert('User registered successfully!');  
            setLoading(false);
            navigate("/Verify");                    

        } catch (err) {
            alert(err.response?.data?.message || 'Error registering user');
            setLoading(false); 
        }
    };

    return (
        <div className="container mt-5 d-flex flex-column align-items-center">
            <div className={`p-4 ${styles.signUpBox}`}>
                <h1 className="text-center mb-4">Instagram</h1>
                <p className='text-center'>Sign up to see photos and videos<br /> from your friends</p>
                <form onSubmit={handleSubmit} autoComplete='off'>
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
                            People who use our service may have uploaded your contact information to Instagram. Learn More<br />
                            By signing up, you agree to our <a href="#">Terms</a>, <a href="#">Privacy Policy</a> and <a href="#">Cookies Policy</a>.
                        </p>
                    </div>
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
