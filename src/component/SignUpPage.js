// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Authcontainer.css';
// import pic from './photos/Screenshot from 2024-09-09 11-24-59.png';
// axios.defaults.baseURL = 'http://localhost:5000';

// function SignUpPage() {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSignUp = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/api/auth/register', { username, email, password });
//             console.log(response);  // Ensure successful registration response
//             localStorage.setItem('token', response.data.token);

//             toast.success('Registration Successful! Please Sign In...', {
//                 position: "top-right",
//                 autoClose: 5000,
//                 theme: "colored",
//             });

//             setTimeout(() => {
//                 navigate('/auth/signin');  // Delayed navigation
//             }, 1000);
//         } catch (err) {
//             const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
//             console.error('Error:', errorMessage);
//             toast.error(errorMessage, {
//                 position: "top-right",
//                 autoClose: 5000,
//                 theme: "colored",
//             });
//         }
//     };

//     return (
//         <div className="auth-page">
//             <div className="container">
//                 <div className="left-div">
//                     <img src={pic} alt="Decorative" />
//                 </div>
//                 <div className="right-div">
//                     <h1>Create Account</h1>
//                     <form onSubmit={handleSignUp}>
//                         <input
//                             type="text"
//                             name="username"
//                             placeholder="Username"
//                             required
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                         />
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             required
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                         <input
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             required
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         <button type="submit">Sign Up</button>
//                     </form>
//                     <p className="toggle-text">
//                         Already  have an account? <a href="/auth/signin">Sign In</a>
//                     </p>
//                 </div>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// }

// export default SignUpPage;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Authcontainer.css';
import pic from './photos/Screenshot from 2024-09-09 11-24-59.png';

axios.defaults.baseURL = 'http://localhost:5000';

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
        <div className="auth-page">
            <div className="container">
                <div className="left-div">
                    <img src={pic} alt="Decorative" />
                </div>
                <div className="right-div">
                    <h1>Create Account</h1>
                    <form onSubmit={handleSignUp}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
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
                            minLength="6"  // HTML5 validation for password length
                        />
                        <button type="submit">Sign Up</button>
                    </form>
                    <p className="toggle-text">
                        Already have an account? <a href="/auth/signin">Sign In</a>
                    </p>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default SignUpPage;
