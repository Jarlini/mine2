import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Authcontainer.css'; // Ensure the correct path to your CSS file
import pic3 from './photos/Screenshot from 2024-09-09 11-24-59.png'; // Adjust the path to the image as needed

axios.defaults.baseURL = 'http://localhost:5000'; // Backend URL

function SignUpPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        if (password.length < 6) {  // Minimum password length validation
            toast.error('Password must be at least 6 characters long.', {
                position: "top-right",
                autoClose: 5000,
                theme: "colored",
            });
            return;
        }
    
        // Email validation for Gmail
        if (!email.endsWith('@gmail.com')) {
            toast.error('Email must be a Gmail address (ending with @gmail.com).', {
                position: "top-right",
                autoClose: 5000,
                theme: "colored",
            });
            return;
        }
    
        try {
            const response = await axios.post('/api/auth/register', { username, email, password });
            console.log(response); // Log the successful registration response
    
            // Store token in local storage
            localStorage.setItem('token', response.data.token);
    
            // Notify user of successful registration
            toast.success('Registration Successful! Please Sign In...', {
                position: "top-right",
                autoClose: 5000,
                theme: "colored",
            });
    
            // Redirect to Sign In page after a short delay
            setTimeout(() => {
                navigate('/auth/signin');
            }, 1000);
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
            console.error('Error:', errorMessage);
            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 5000,
                theme: "colored",
            });
        }
    };
        return (
        <div className="sign-in-container"> {/* Reuse the same container styling */}
            <div className="sign-in-wrapper">
                <div className="image-section">
                    <img src={pic3} alt="Sign Up" className="sign-in-image" />
                </div>
                <div className="form-section">
                    <h1 className="form-title">Create Account</h1>
                    <form onSubmit={handleSignUp} className="sign-in-form"> {/* Reuse form classes */}
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input-field"  // Reuse styling for input fields
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            minLength="6"  // HTML5 validation for password length
                        />
                        <button type="submit" className="submit-button">Sign Up</button>
                    </form>
                    <p className="account-toggle-text">
                        Already have an account? <a href="/auth/signin" className="sign-up-link">Sign In</a>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SignUpPage;
