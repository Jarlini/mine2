import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './Api';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faMapMarkedAlt, faHeadset, faLocationDot, faCalendar, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Landingpage.css';

// Import images
import photo1 from './photos/Screenshot from 2024-09-09 11-34-19.png';
import photo2 from './photos/Screenshot from 2024-09-09 11-31-31.png';
import photo3 from './photos/Screenshot from 2024-09-09 11-27-49.png';
import photo4 from './photos/Screenshot from 2024-09-09 11-33-31.png';
import photo5 from './photos/Screenshot from 2024-09-09 11-25-26.png';
import photo6 from './photos/Screenshot from 2024-09-09 11-32-02.png';
import photo7 from './photos/happy.jpg';
import photo8 from './photos/friend.jpg';
import photo9 from './photos/experience.jpg';
import photo0 from './photos/calm.jpg';

export default function LandingPage() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await api.get('/trips');
        setTrips(res.data);
      } catch (err) {
        console.error("Error fetching trips:", err);
      }
    };

    fetchTrips();
  }, []);

  const scrollToTrips = () => {
    const tripsSection = document.getElementById('trips-section');
    if (tripsSection) {
      tripsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJoinClick = () => {
    navigate('/packages');
  };

  const reasons = [
    { image: photo7, text: "We are friendly and approachable, ensuring you feel comfortable on your journey." },
    { image: photo8, text: "We create happy and memorable experiences that you'll cherish forever." },
    { image: photo9, text: "Our calm and peaceful approach helps you relax and enjoy every moment." },
    { image: photo0, text: "We are organized and thoughtful, making your experience stress-free." },
  ];

  return (
    <div><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      <section className="hero-section bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="display-4 text-white fw-bold mb-4">Welcome to Voyago!......</h1>
              <p className="lead mb-4">
                Embark on an unforgettable journey with us, where every moment is filled with joy and tranquility.
              </p>
              <button onClick={scrollToTrips} className="explore-button btn btn-light">
                Discover More
              </button>
            </div>
            <div className="col-lg-6">
              <Carousel indicators={false} controls={false} interval={3000} fade>
                {[photo1, photo2, photo3, photo4, photo5, photo6].map((photo, index) => (
                  <Carousel.Item key={index}>
                    <img className="d-block w-100 hero-image" src={photo} alt={`Slide ${index + 1}`} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div><br/><br/><br/><br/>
          </div>
        </div>
      </section><br/><br/><br/><br/>

      <div id="who-we-are-section" className="reasons-section text-center">
        <h2 className="section-title">Who We Are?</h2><br/><br/><br/><br/>
        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <div key={index} className="reason-card">
              <img src={reason.image} alt={`reason-${index}`} className="reason-image" />
              <p className="reason-text">{reason.text}</p>
            </div>
          ))}
        </div><br/><br/><br/><br/>
      </div>

      <div id="trips-section" className="trips-section">
        <h2 className="section-title">Discover Your Next Adventure!</h2>
        <p className="section-description"><br/>
          Explore a variety of pilgrimage trips tailored to your interests.......
        </p>
        <div className="trips-grid">
          {trips.map((trip) => (
            <div key={trip._id} className="trip-card">
              <div className="trip-content">
                <h3 className="trip-title">{trip.title}</h3>
                <div className="trip-photos">
                  {trip.photos.slice(0, 3).map((photo, index) => (
                    <img key={index} src={photo} alt={`Trip photo ${index + 1}`} className="trip-photo" />
                  ))}
                </div>
                <br/>
                <p className="trip-detail">
                  <FontAwesomeIcon icon={faLocationDot} className="icon" /> {trip.location}
                </p>
                <p className="trip-detail">
                  <FontAwesomeIcon icon={faCalendar} className="icon" /> {trip.days} Days
                </p>
                <p className="trip-detail">
                  <FontAwesomeIcon icon={faClipboardList} className="icon" /> {trip.schedule}
                </p>
               
              </div>
              <div className="trip-action">
                <button onClick={handleJoinClick} className="join-button btn btn-primary btn-neat">
                  <FontAwesomeIcon icon={faMapMarkedAlt} className="icon" /> Join with Us
                </button>
              </div>
            </div>
          ))}
        </div>
      </div><br/><br/><br/><br/><br/><br/><br/><br/>

      <HowWeWork /><br/><br/><br/><br/><br/><br/><br/><br/>
    </div>
  );
}

function HowWeWork() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div className="how-we-work-container container my-5">
   
      <div className="timeline"><h2 className="how-we-work-title text-center mb-5">How We Work</h2>
      
        <div className="timeline-item left">
          <div className="content">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faLightbulb} className="fa-2x text-primary" />
            </div>
            <h4>Understand Your Needs</h4>
            <p>We create personalized plans based on your preferences and requirements.</p>
          </div>
        </div>
        <div className="timeline-item right">
          <div className="content">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faMapMarkedAlt} className="fa-2x text-success" />
            </div>
            <h4>Plan Your Journey</h4>
            <p>We meticulously plan every aspect of your trip, including travel and accommodation.</p>
          </div>
        </div>
        <div className="timeline-item left">
          <div className="content">
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faHeadset} className="fa-2x text-info" />
            </div>
            <h4>Provide Support</h4>
            <p>We offer continuous assistance throughout your entire journey for a worry-free experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
