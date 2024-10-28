import React, { useState } from 'react';
import axios from 'axios';
import '/home/uki-student/mine/freshmyf-main/src/component/Home.css'; // Adjust path as needed

const AddTrip = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [days, setDays] = useState('');
  const [schedule, setSchedule] = useState('');
  const [image, setImage] = useState(null); // New state for image

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set image file from input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure all fields are filled
    if (!title || !location || !days || !schedule || !image) {
      alert('Please fill out all fields and add an image');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('location', location);
    formData.append('days', days);
    formData.append('schedule', schedule);
    formData.append('image', image); // Append image file

    try {
      const res = await axios.post('/api/trip/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      alert(res.data.message);
    } catch (error) {
      console.error('Error adding trip:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Trip</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Days"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Schedule"
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={handleImageChange} // Handle image input
        accept="image/*"
      />
      <button type="submit">Add Trip</button>
    </form>
  );
};

export default AddTrip;
