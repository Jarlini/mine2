// src/component/ItemForm.js
import React, { useState, useEffect } from 'react';
import api from './Api';

const ItemForm = ({ item, type }) => {
  const [formData, setFormData] = useState(item || {});
  
  useEffect(() => {
    setFormData(item);
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (item?._id) {
        // Update existing item
        await api.put(`/${type}/${item._id}`, formData);
      } else {
        // Add new item
        await api.post(`/${type}`, formData);
      }
      alert('Operation successful');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  const handleDelete = async () => {
    if (!item?._id) return;
    try {
      await api.delete(`/${type}/${item._id}`);
      alert('Item deleted');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Error deleting item');
    }
  };

  return (
    <div>
      <h2>{item?._id ? 'Update' : 'Add'} {type}</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map(key => (
          <div key={key}>
            <label>{key}:</label>
            <input
              type="text"
              name={key}
              value={formData[key] || ''}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">{item?._id ? 'Update' : 'Add'} {type}</button>
        {item?._id && <button type="button" onClick={handleDelete}>Delete {type}</button>}
      </form>
    </div>
  );
};

export default ItemForm;
