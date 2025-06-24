import styles from './forgetpassword.module.css';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
// import { useUser } from '../Context/UserContext';
import AuthenticationContext from '../../Contexts/AuthenticationContext/AuthenticationContext';



const ForgetPassword = () => {
    const ForgetContext = useContext(AuthenticationContext)
    const [formData, setFormData] = useState({ email: '' });
    ForgetContext.emailforgetpassword = formData.email
    const [loading,setLoading] = useState(false);

    console.log(ForgetContext)
    const navigate = useNavigate();
    // const { setUser } = useUser();

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            console.log("---------")
            console.log(formData)
            const res = await axios.post('http://localhost:5000/ReachNex/forgetpassword', formData);

            alert("otp send to email")
            setLoading(false);
            // const { token } = res.data;
            // localStorage.setItem('token', token);

            // Decode token and redirect
            // const decoded = jwtDecode(token);
            // const { username, fullname, email, id } = decoded;
            // setUser({ username, fullname, email, id });
            navigate('/verifyforgetotp');
        } catch (err) {
            alert('Invalid credentials');
            setLoading(false)
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
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
                    {/* <div className="form-floating mb-3">
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
                            "Verify Email"
                        )}
                    </button>
                </form>

                <div className={styles.login}>
                    <p>Don't have an account? <br /><Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
