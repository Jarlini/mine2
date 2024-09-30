import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import api from './Api'; // Use the axios instance with token
import './Navhome.css'; // Corrected the import path

const NavHome = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

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

  const handleJoinClick = () => {
    navigate('/packege'); // Navigate to PackagesPage
  };

  return (
    <div className="nav-home-container">
      <h2 className="cute-heading">Discover Your Next Adventure!</h2>
      <p className="info-paragraph">
        Explore a variety of pilgrimage trips tailored to your interests and embark on a spiritual journey like no other. Find the perfect trip and join us to make unforgettable memories.
      </p>
      <div className="trip-list">
        {trips.map((trip) => (
          <div key={trip._id} className="trip-item">
            <h3>{trip.title}</h3>
            <p><strong>Location:</strong> {trip.location}</p>
            <p><strong>Days:</strong> {trip.days}</p>
            <p><strong>Schedule:</strong> {trip.schedule}</p>
            <div>
              <strong>Photos:</strong>
              <div className="trip-photos">
                {trip.photos.map((photo, index) => (
                  <imgage
                    key={index}
                    src={photo}
                    alt={`Trip photo ${index + 1}`}
                    className="trip-photo"
                  />
                ))}
              </div>
            </div>
            <button className="join-button" onClick={handleJoinClick}>Join with Us</button> {/* Added onClick handler */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavHome;
