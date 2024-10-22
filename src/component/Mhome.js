import React, { useEffect, useState } from 'react';
import api from './Api'; // Axios instance with token
import '/home/uki-student/Downloads/mine/freshmyf-main/src/component/Mhome.css';

const MHome = () => {
  const [trips, setTrips] = useState([]);
  const [editingTrip, setEditingTrip] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    location: '',
    days: '',
    schedule: '',
    photos: []
  });

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

  const handleDeleteTrip = async (tripId) => {
    try {
      await api.delete(`/trips/${tripId}`);
      setTrips(trips.filter(trip => trip._id !== tripId)); // Remove the deleted trip from state
    } catch (err) {
      console.error("Error deleting trip:", err);
    }
  };

  const handleEditTrip = (trip) => {
    setEditingTrip(trip._id);
    setEditForm({
      title: trip.title,
      location: trip.location,
      days: trip.days,
      schedule: trip.schedule,
      photos: trip.photos
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: name === 'photos' ? value.split(',') : value
    }));
  };

  const handleFileChange = (e) => {
    setEditForm(prev => ({
      ...prev,
      photos: [...e.target.files] // Handle file uploads
    }));
  };
  const handleSaveEdit = async (tripId) => {
    try {
      const formData = new FormData();
      formData.append('title', editForm.title);
      formData.append('location', editForm.location);
      formData.append('days', editForm.days);
      formData.append('schedule', editForm.schedule);
      
      // If new photos are uploaded
      if (editForm.photos && editForm.photos.length) {
        editForm.photos.forEach((photo, index) => {
          formData.append(`photos[${index}]`, photo);
        });
      }
  
      const res = await api.put(`/trips/update/${tripId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setTrips(trips.map(trip => trip._id === tripId ? { ...trip, ...editForm } : trip));
      setEditingTrip(null);
    } catch (err) {
      console.error("Error updating trip:", err);
    }
  };
  
  return (
    <div>
      <h2>Available Trips</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Days</th>
            <th>Schedule</th>
            <th>Photos</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip._id}>
              <td>{trip.title}</td>
              <td>{trip.location}</td>
              <td>{trip.days}</td>
              <td>{trip.schedule}</td>
              <td>
                <ul className="photo-list">
                  {trip.photos.map((photo, index) => (
                    <li key={index}>
                      <img src={photo} alt={`Trip photo ${index + 1}`} className="trip-photo" />
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <div className="button-container">
                  <button className="edit-btn" onClick={() => handleEditTrip(trip)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteTrip(trip._id)}>Delete</button>
                </div>

                {editingTrip === trip._id && (
                  <div className="edit-form">
                    <h4>Edit Trip</h4>
                    <form>
                      <label>
                        Title:
                        <input type="text" name="title" value={editForm.title} onChange={handleEditFormChange} />
                      </label>
                      <label>
                        Location:
                        <input type="text" name="location" value={editForm.location} onChange={handleEditFormChange} />
                      </label>
                      <label>
                        Days:
                        <input type="number" name="days" value={editForm.days} onChange={handleEditFormChange} />
                      </label>
                      <label>
                        Schedule:
                        <textarea name="schedule" value={editForm.schedule} onChange={handleEditFormChange} />
                      </label>
                      <label>
                        Photos (upload new photos):
                        <input type="file" multiple onChange={handleFileChange} />
                      </label>
                      <button type="button" className="edit-btn" onClick={() => handleSaveEdit(trip._id)}>Save</button>
                    </form>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MHome;
