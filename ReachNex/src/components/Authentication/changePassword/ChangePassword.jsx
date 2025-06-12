import styles from './changepassword.module.css';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import AuthenticationContext from '../../Contexts/AuthenticationContext/AuthenticationContext';
// import { useUser } from '../Context/UserContext';



const ChangePassword = () => {
    const { emailforgetpassword } = useContext(AuthenticationContext)

    const [formData, setFormData] = useState({ email: emailforgetpassword, password: '', confirmPassword: '' });
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    // const { setUser } = useUser();

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (formData.password === formData.confirmPassword) {



                const res = await axios.post('http://localhost:5000/instagram/updatepassword', formData);
                // // const { token } = res.data;
                // localStorage.setItem('token', token);

                // Decode token and redirect
                // const decoded = jwtDecode(token);
                // const { username, fullname, email, id } = decoded;
                // setUser({ username, fullname, email, id });
                alert("your password is updated");
                setLoading(false);
                navigate('/');
            }
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
                            type="text"
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
                            name="confirmPassword"
                            placeholder="enter password again "
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <label>Confirm Password</label>
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
                            "Save Password"
                        )}
                    </button>
                </form>

                <div className={styles.login}>
                    <p>Don't have an account? <br /><Link to="/signup">Sign Up</Link></p>
                    {/* <p>forget password? <br /><Link to="/forgetpassword">Forget Password</Link></p> */}
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
