import styles from './signIn.module.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
// import { useUser } from '../Context/UserContext';

const SignInForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    // const { setUser } = useUser();

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/instagram/login', formData);
            const { token } = res.data;
            localStorage.setItem('token', token);

            // Decode token and redirect
            const decoded = jwtDecode(token);
            const { username, fullname, email, id } = decoded;
            // setUser({ username, fullname, email, id });
            navigate('/landing');
        } catch (err) {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '400px' }}>
            <div className={`p-4 ${styles.signUpBox}`}>
                <h1>Instagram</h1>
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
                    <p>Don't have an account? <br /><Link to="/signup">Sign Up</Link></p>
                    <p>forget password? <br /><Link to="/forgetpassword">Forget Password</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
