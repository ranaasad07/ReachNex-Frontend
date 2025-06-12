import styles from './emailverify.module.css';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import AuthenticationContext from '../../Contexts/AuthenticationContext/AuthenticationContext';

const Emailverify = () => {
    const { emailForOtp } = useContext(AuthenticationContext);
    const [formData, setFormData] = useState({ email: emailForOtp, otp: '' });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/ReachNex/verifyemail', formData);
            navigate('/');
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
                        <p>OTP has been sent to email: {formData.email}</p>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            name="otp"
                            placeholder="OTP"
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
                    <p>Don't have an account? <br /><Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Emailverify;
