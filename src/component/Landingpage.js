import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './Api'
import '/home/uki-student/Downloads/mine/freshmyf-main/src/component/Landingpage.css'

// Import images
import photo1 from './photos/Screenshot from 2024-09-09 11-34-19.png'
import photo2 from './photos/Screenshot from 2024-09-09 11-31-31.png'
import photo3 from './photos/Screenshot from 2024-09-09 11-27-49.png'
import photo4 from './photos/Screenshot from 2024-09-09 11-33-31.png'
import photo5 from './photos/Screenshot from 2024-09-09 11-25-26.png'
import photo6 from './photos/Screenshot from 2024-09-09 11-32-02.png'
import photo7 from '/home/uki-student/Downloads/mine/freshmyf-main/src/component/photos/happy.jpg'
import photo8 from '/home/uki-student/Downloads/mine/freshmyf-main/src/component/photos/friend.jpg'
import photo9 from '/home/uki-student/Downloads/mine/freshmyf-main/src/component/photos/experience.jpg'
import photo0 from '/home/uki-student/Downloads/mine/freshmyf-main/src/component/photos/calm.jpg'
import howWeWorkImage from '/home/uki-student/Downloads/mine/freshmyf-main/src/component/photos/o).jpeg'

export default function LandingPage() {
  const navigate = useNavigate()
  const [trips, setTrips] = useState([])

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await api.get('/trips')
        setTrips(res.data)
      } catch (err) {
        console.error("Error fetching trips:", err)
      }
    }

    fetchTrips()
  }, [])

  const goToHomePage = () => {
    const tripsSection = document.getElementById('trips-section')
    if (tripsSection) {
      tripsSection.scrollIntoView({ behavior: 'smooth' }) // Smooth scroll to the section
    }
  }

  const handleJoinClick = () => {
    navigate('/packages')
  }

  const reasons = [
    {
      image: photo7,
      text: "We are friendly and approachable, ensuring you feel comfortable on your journey.",
    },
    {
      image: photo8,
      text: "We create happy and memorable experiences that you'll cherish forever.",
    },
    {
      image: photo9,
      text: "Our calm and peaceful approach helps you relax and enjoy every moment.",
    },
    {
      image: photo0,
      text: "We are organized and thoughtful, making your experience stress-free.",
    },
  ]

  return (
    <div className="landing-page">
      <div className="container">
        <br/>  <br/>  <br/>   <br/> <br/> <br/><br/> <br/><br/> <br/> <br/> <br/>   <br/>  <br/>  <br/> <br/> <br/><br/> <br/><br/> <br/> <br/>  <br/>  <br/> <br/>  <br/> <br/>  <br/>  <br/>  <br/>  <br/>  <br/> <br/>  <br/> <br/>  <br/>  <br/>  <br/>  <br/>  <br/> <br/>  <br/>  <br/>  <br/>  <br/> <br/>  <br/> <br/>  <br/>  <br/>  <br/>  <br/>  <br/> <br/>  <br/> <br/>  <br/>  <br/>  <br/>  <br/>  <br/> <br/>  <br/> <br/>  <br/>  <br/>  <br/>  <br/>  <br/> <br/>  <br/> <br/>  <br/>  <br/>  <br/>  <br/>  <br/> <br/>  <br/><br/>  <br/>  <br/>  <br/>  <br/> <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/>  <br/> <br/>  <br/>
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to Voyago!......</h1>      <br/>
            <p className="hero-text"> 
              Hi, welcome to Voyago!.... Join us on an unforgettable journey where every moment is filled with joy and excitement. Whether you're visiting temples or enjoying a peaceful camp, we've got the perfect package waiting for you. Come along and experience the happiness we offer—your adventure starts here!
            </p>  <br/>  <br/>  
            <button onClick={goToHomePage} className="explore-button">
              Explore
            </button>
          </div>
          <div className="hero-images">
            {[photo1, photo2, photo3, photo4, photo5, photo6].map((photo, index) => (
              <img 
                key={index} 
                src={photo} 
                alt={`Traveling ${index + 1}`} 
                className="hero-image"
              />
            ))}
          </div>
        </div>
        <br/>
        <br/> <br/> <br/> <br/>  <br/>  <br/> <br/>  <br/>  <br/>

        <div className="reasons-section">
          <h2 className="section-title">Why We Are?.....!</h2>
          <div className="reasons-grid">
            {reasons.map((reason, index) => (
              <div key={index} className="reason-card">
                <img src={reason.image} alt={`reason-${index}`} className="reason-image" />
                <p className="reason-text">{reason.text}</p>
              </div>
            ))}
          </div>
        </div>
        <br/>  <br/>  <br/> <br/>  <br/>  <br/> <br/>  <br/>  <br/> <br/>
        
        {/* Add ID to the trips-section for bookmarking */}
        <div id="trips-section" className="trips-section">
          <h2 className="section-title">Discover Your Next Adventure!</h2>
          <p className="section-description">
            Explore a variety of pilgrimage trips tailored to your interests and embark on a spiritual journey like no other. Find the perfect trip and join us to make unforgettable memories.
          </p>
          <div className="trips-grid">
            {trips.map((trip) => (
              <div key={trip._id} className="trip-card">
                <div className="trip-content">
                  <h3 className="trip-title">{trip.title}</h3>
                  <p className="trip-detail"><strong>Location:</strong> {trip.location}</p>
                  <p className="trip-detail"><strong>Days:</strong> {trip.days}</p>
                  <p className="trip-detail"><strong>Schedule:</strong> {trip.schedule}</p>
                  <div className="trip-photos">
                    {trip.photos.slice(0, 3).map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Trip photo ${index + 1}`}
                        className="trip-photo"
                      />
                    ))}
                  </div>
                </div>
                <div className="trip-action">
                  <button onClick={handleJoinClick} className="join-button">
                    Join with Us
                  </button>  <br/> <br/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="how-we-work-container">
          <div className="left-container"><br/> <br/> <br/> <br/>   <br/>  <br/>  <br/> 
            <img src={howWeWorkImage} alt="How we work" className="work-image" />
          </div>
          <div className="right-container"> 
            <h2>How We Work....!</h2>
            <ul>
              <li>We understand your needs and create personalized plans.</li>
              <li>We manage all logistics including travel and accommodation.</li>
              <li>We provide support during the entire journey for a hassle-free experience.</li>
            </ul>
          </div>
        </div><br/> <br/> <br/> <br/>   <br/>  <br/>  <br/> 
      </div>
    </div>
  )
}