import React from 'react';
// import './FinishingPage.css'; // Create a separate CSS file for styling

const FinishingPage = () => {
    const handleLogout = () => {
        console.log("Logout clicked");
        // Your logout logic here
    };

    const handleZOption = () => {
        console.log("Z Option clicked");
        // Your Z option logic here
    };

    return (
        <div className="finishing-page">
            <h1>Thank You!</h1>
            <p>We appreciate your visit. Have a great day!</p>
            <button className="finishing-button" onClick={handleLogout}>Logout</button>
            <button className="finishing-button" onClick={handleZOption}>Z Option</button>
        </div>
    );
};

export default FinishingPage;
