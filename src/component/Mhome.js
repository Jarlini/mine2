import React, { useEffect, useState } from 'react';
import api from './Api'; // Axios instance with token
import './Mhome.css'; // Adjust the path if needed

const MHome = () => {
  const [trips, setTrips] = useState([]);
  const [editingTrip, setEditingTrip] = useState(null);
  const [addForm, setAddForm] = useState({
    title: '',
    location: '',
    days: '',
    schedule: '',
    photos: []
  });
  const [editForm, setEditForm] = useState({
    title: '',
    location: '',
    days: '',
    schedule: '',
    photos: []
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error message
  const [successMessage, setSuccessMessage] = useState(''); // Success message

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
      setTrips(trips.filter(trip => trip._id !== tripId));
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
      photos: trip.photos // Keep existing photos
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setAddForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e, form) => {
    const files = Array.from(e.target.files);
    setAddForm(prev => ({
      ...prev,
      photos: [...prev.photos, ...files] // Keep existing photos and add new ones
    }));
    e.target.value = ''; // Clear the file input
  };

  const handleSaveEdit = async (tripId) => {
    if (!editForm.title || !editForm.location || !editForm.days || !editForm.schedule) {
      setError("All fields are required.");
      return;
    }

    setError(''); // Reset error message
    setLoading(true); // Start loading state

    try {
      const formData = new FormData();
      formData.append('title', editForm.title);
      formData.append('location', editForm.location);
      formData.append('days', editForm.days);
      formData.append('schedule', editForm.schedule);
  
      // Append all photos (existing and new)
      editForm.photos.forEach((photo) => {
        formData.append('photos', photo);
      });
  
      const res = await api.put(`/trips/${tripId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (res.data && res.data.updatedTrip) {
        setTrips(trips.map(trip => trip._id === tripId ? { ...trip, ...res.data.updatedTrip } : trip));
        setEditingTrip(null);
        setEditForm({ title: '', location: '', days: '', schedule: '', photos: [] }); // Reset form
        setSuccessMessage("Trip updated successfully!");
      } else {
        console.error('Unexpected response structure:', res.data);
        setError("Error updating trip.");
      }
    } catch (err) {
      console.error('Error updating trip:', err);
      setError("Error updating trip.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  const handleSaveAdd = async () => {
    if (!addForm.title || !addForm.location || !addForm.days || !addForm.schedule) {
      setError("All fields are required.");
      return;
    }

    setError(''); // Reset error message
    setLoading(true); // Start loading state

    try {
      const formData = new FormData();
      formData.append('title', addForm.title);
      formData.append('location', addForm.location);
      formData.append('days', addForm.days);
      formData.append('schedule', addForm.schedule);
  
      addForm.photos.forEach((photo) => {
        formData.append('photos', photo);
      });
  
      const res = await api.post('/trips', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (res.data && res.data.newTrip) {
        setTrips([...trips, res.data.newTrip]); // Add new trip to the state
        setAddForm({ title: '', location: '', days: '', schedule: '', photos: [] }); // Reset form
        setSuccessMessage("Trip added successfully!");
      } else {
        console.error('Unexpected response structure:', res.data);
        setError("Error adding trip.");
      }
    } catch (err) {
      console.error('Error adding trip:', err);
      setError("Error adding trip.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div>
      <h2>Available Trips</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      
      <div className="add-form">
        <h4>Add New Trip</h4>
        <form onSubmit={(e) => { e.preventDefault(); handleSaveAdd(); }}>
          <label>
            Title:
            <input type="text" name="title" value={addForm.title} onChange={handleAddFormChange} />
          </label>
          <label>
            Location:
            <input type="text" name="location" value={addForm.location} onChange={handleAddFormChange} />
          </label>
          <label>
            Days:
            <input type="number" name="days" value={addForm.days} onChange={handleAddFormChange} />
          </label>
          <label>
            Schedule:
            <textarea name="schedule" value={addForm.schedule} onChange={handleAddFormChange} />
          </label>
          <label>
            Photos (upload new photos):
            <input type="file" multiple onChange={(e) => handleFileChange(e, addForm)} />
          </label>
          <button type="submit" className="add-btn" disabled={loading}>
            {loading ? 'Adding...' : 'Add Trip'}
          </button>
        </form>
      </div>

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
                    <form onSubmit={(e) => { e.preventDefault(); handleSaveEdit(trip._id); }}>
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
                        <input type="file" multiple onChange={(e) => handleFileChange(e, editForm)} />
                      </label>
                      <button type="submit" className="save-btn" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
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
