import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Authcontainer.css';  // Ensure this path is correct
import pic3 from '/home/uki-student/Downloads/mine/freshmyf-main/src/component/photos/Screenshot from 2024-09-09 11-25-09.png';  // Corrected import statement

axios.defaults.baseURL = 'http://localhost:5000';  // Backend URL

function SignInPage () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);

            toast.success('Sign In successful!', {
                position: "top-right",
                autoClose: 5000,
                theme: "colored",
            });

            if (response.data.role === 'admin') {
                navigate('/admin-dashboard');  // Redirect to admin dashboard if admin
            } else {
                navigate('/home');  // Redirect to user home page if not admin
            }
        } catch (err) {
            toast.error('Invalid email or password!', {
                position: "top-right",
                autoClose: 5000,
                theme: "colored",
            });
        }
    };

    return (
        <div className="auth-page"> 
            <div className="container">
               
                <div className="left-div">
                    <img src={pic3} alt="Sign In" />
                </div>
                <div className="right-div">
                    <h1>Sign In</h1>
                    <form onSubmit={handleSignIn}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Sign In</button>
                    </form>
                    <p className="toggle-text">
                        Don't you have an account? <a href="/auth/signup">Sign Up</a>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SignInPage;