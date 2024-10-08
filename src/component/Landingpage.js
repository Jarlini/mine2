import React from 'react';
import { useNavigate } from 'react-router-dom';
import'/home/uki-student/Downloads/mine/freshmyf-main/src/component/Landingpage.css';
// Import images from the public folder or as modules
import photo1 from './photos/Screenshot from 2024-09-09 11-34-19.png';
import photo2 from './photos/Screenshot from 2024-09-09 11-31-31.png';
import photo3 from './photos/Screenshot from 2024-09-09 11-27-49.png';
import photo4 from './photos/Screenshot from 2024-09-09 11-33-31.png';
import photo5 from './photos/Screenshot from 2024-09-09 11-25-26.png';
import photo6 from './photos/Screenshot from 2024-09-09 11-32-02.png'

function LandingPage() {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/home');
  };

  return (
    <div className="landing-page">
      <div className="content">
        <div className="left-div">
          <h1 className="welcome-text" style={{ fontSize: '46px' }}>Welcome to Voyago!</h1>
          <p style={{ fontSize: '26px' }}>
            "Hi, welcome to Voyago! Join us on an unforgettable journey where every moment is filled with joy and excitement. Whether you're visiting temples or enjoying a peaceful camp, we've got the perfect package waiting for you. Come along and experience the happiness we offer—your adventure starts here!"
          </p>
          <button className="home-button" onClick={goToHomePage}>Go to Home</button>
        </div>
        <div className="right-div">
          <img src={photo1} alt="Traveling" />
          <img src={photo2} alt="Traveling" />
          <img src={photo3} alt="Traveling" />
          <img src={photo4} alt="Traveling" />
          <img src={photo5} alt="Traveling" />
          <img src={photo6} alt="Traveling" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
