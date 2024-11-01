import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './Api';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faMapMarkedAlt, faHeadset, faLocationDot, faCalendar, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { faPlane, faHotel, faCar, faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Landingpage.css';
import  AnimatedSection from'/home/uki-student/mine/freshmyf-main/src/component/Ani.js';

// Import images
 import photo6 from '/home/uki-student/mine/freshmyf-main/src/component/photos/o.jpg';
import photo1 from '/home/uki-student/mine/freshmyf-main/src/component/photos/teal1.jpg';
import photo3 from '/home/uki-student/mine/freshmyf-main/src/component/photos/teal2.jpg';
import photo2 from '/home/uki-student/mine/freshmyf-main/src/component/photos/4teal.jpg';
import photo5 from '/home/uki-student/mine/freshmyf-main/src/component/photos/Screenshot from 2024-08-29 12-26-39.png';
import photo4 from '/home/uki-student/mine/freshmyf-main/src/component/photos/teal55.jpg';
import photo7 from './photos/happy.jpg';
import photo8 from '/home/uki-student/mine/freshmyf-main/src/component/photos/Screenshot from 2024-09-09 11-29-02.png';
import photo9 from '/home/uki-student/mine/freshmyf-main/src/component/photos/Screenshot from 2024-09-09 11-32-43.png';
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

  const destinations= [
    {
      image: photo1,
      name: "Voyago",
      description: "Embark on unforgettable journeys with ease and joy."
    },
    {
      image: photo2,
      name: "Your Personal Pilgrimage Planner",
      description: "Tailor your pilgrimage experience to fit your desires."
    },
    {
      image: photo3,
      name: "Discover Unique Destinations",
      description: "Uncover hidden gems and explore diverse cultures."
    },
    {
      image: photo4,
      name: "Seamless Travel Management",
      description: "Effortlessly manage bookings, accommodations, and itineraries."
    },
    {
      image: photo5,
      name: "Community and Support",
      description: "Join a community of travelers and find support along the way."
    },
    {
      image: photo6,
      name: "Memorable Experiences",
      description: "Create lasting memories with curated pilgrimage experiences."
    },
    {
      image: photo7,
      name: "Explore with Confidence",
      description: "Navigate your journey with trusted guidance and resources."
    },
    {
      image: photo8,
      name: "Engaging and Informative",
      description: "Access detailed information and tips for every destination."
    },
    {
      image: photo9,
      name: "Transform Your Travels",
      description: "Make your pilgrimage a transformative and enriching adventure."
    },
  ];
  

  const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showText, setShowText] = useState(false);
  
    useEffect(() => {
      const timeout = setTimeout(() => {
        setShowText(true);
      }, 100);
  
      const hideTextTimeout = setTimeout(() => {
        setShowText(false);
      }, 0); // Change timing if needed
  
      return () => {
        clearTimeout(timeout);
        clearTimeout(hideTextTimeout);
      };
    }, [currentIndex]);
  
    const handleSelect = (selectedIndex, e) => {
      setCurrentIndex(selectedIndex);
      setShowText(false);
    };
  
    return (
      <div>
        <section className="hero-section">
          <Carousel controls={true} indicators={true} interval={4000} activeIndex={currentIndex} onSelect={handleSelect} className="hero-carousel">
            {destinations.map((destination, index) => (
              <Carousel.Item key={index} className="carousel-item">
                <img src={destination.image} alt={`Slide ${index + 1}`} className="d-block  hero-image" />
                <div className="carousel-overlay">
                  <div className="overlay-content">
                    <h1 className="display-4 fw-bold text-white mb-4 animated-text">{destination.name}</h1>
                     <p className="lead text-white mb-4 animated-text">{destination.description}</p>
                    <button onClick={scrollToTrips} className="btn btn-light explore-button">
                      Discover More
                    </button>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </section>
      </div>
    );
  };
  
  return (
    <div>
      <HeroSection />
      <br/><br/><br/><br/>
      <AnimatedSection /> <br/><br/><br/><br/>
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

<div id="trips-section" className="trips-section"><br/><br/><br/><br/>  
  <h2 className="section-title">Discover Your Next Adventure!</h2>
  <p className="section-description">
    Explore a variety of  trips tailored to your interests.......
  </p>
  <br/><br/><br/>

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
      </div><br/><br/><br/><br/>
   
      <HowWeWork />
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
    <>
      {/* Why Choose Us */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5" style={{ color: '#00796B' }}>
            Why Choose Us
          </h2>
          <div className="row">
            {[
              { icon: faPlane, title: 'Best Flights' },
              { icon: faHotel, title: 'Comfortable Stays' },
              { icon: faCar, title: 'Smooth Transfers' },
              { icon: faUmbrellaBeach, title: 'Exciting Activities' },
            ].map(({ icon, title }, index) => (
              <div key={title} className="col-md-3 mb-4">
                <div className="text-center animate__animated">
                  <FontAwesomeIcon icon={icon} size="4x" className="mb-3" />
                  <h4>{title}</h4>
                </div><br/><br/><br/><br/><br/><br/><br/><br/>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
