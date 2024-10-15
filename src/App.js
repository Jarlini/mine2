import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar'; // Adjust path based on your project structure
import LandingPage from './component/Landingpage'; // Replace with your actual component path
import Home from './component/Navhome'; // Replace with your actual component path
import SignIn from './component/SignInPage'; // Replace with your actual component path
import SignUp from './component/SignUpPage'; // Replace with your actual component path
import PackagesPage from './component/Paycomponent'; // Replace with your actual component path
import Footer from './component/Footer';
import AdminDashboard from './component/Admindash'




function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/packege" element={<PackagesPage />} />
        <Route path="/admin-dashboard" element={< AdminDashboard/>} />
     
      </Routes>
      < Footer />
    </Router>
  );
}
//mine2
export default App;
