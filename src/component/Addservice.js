// AddServiceForm.js
import React, { useState } from 'react';
import api from './Api';

const AddServiceForm = () => {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/services', {
        name: serviceName,
        description,
        price,
      });
      console.log('Service added:', response.data);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  return (
    <div>
      <h3>Add New Service</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Service Name:
          <input
            type="text"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <button type="submit">Add Service</button>
      </form>
    </div>
  );
};

export default AddServiceForm;
