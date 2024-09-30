import React, { useState, useEffect } from 'react';

// API calls for packages
export const getPackages = async () => {
  const API_URL = '/api/packages';
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch packages');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching packages:', error);
    return [];
  }
};
const addPackage = async (newPackage) => {
  try {
      const response = await fetch('http://localhost:5000/api/packages', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPackage),
      });
      if (!response.ok) {
          throw new Error('Failed to add package');
      }
      return await response.json(); // Adjust based on your response structure
  } catch (error) {
      console.error('Error adding package:', error);
      return null; // Handle accordingly
  }
};

export const deletePackage = async (packageId) => {
  const API_URL = `/api/packages/${packageId}`;
  try {
    const response = await fetch(API_URL, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete package');
    }
    return await response.json(); // Return the response for the deleted package
  } catch (error) {
    console.error('Error deleting package:', error);
    return null;
  }
};

const PackageManager = () => {
  const [packages, setPackages] = useState([]);
  const [newPackage, setNewPackage] = useState({ name: '', description: '', price: '' });

  // Fetch all packages on component mount
  useEffect(() => {
    const fetchPackages = async () => {
      const fetchedPackages = await getPackages();
      if (Array.isArray(fetchedPackages)) {
        setPackages(fetchedPackages);
      }
    };
    fetchPackages();
  }, []);

  // Handle adding a package
  const handleAddPackage = async () => {
    if (!newPackage.name || !newPackage.description || !newPackage.price) {
      alert('Please fill in all fields.');
      return;
    }

    const addedPackage = await addPackage({
      name: newPackage.name,
      description: newPackage.description,
      price: Number(newPackage.price),
    });

    if (addedPackage) {
      setPackages([...packages, addedPackage]);
      setNewPackage({ name: '', description: '', price: '' });
    }
  };

  // Handle deleting a package
  const handleDeletePackage = async (id) => {
    const deletedPackage = await deletePackage(id);
    if (deletedPackage) {
      setPackages(packages.filter((pkg) => pkg._id !== id));
    }
  };

  return (
    <div>
      <h1>Package Manager</h1>

      <h2>All Packages</h2>
      <ul>
        {packages.length > 0 ? (
          packages.map((pkg) => (
            <li key={pkg._id}>
              {pkg.name} - Rs. {pkg.price}
              <button onClick={() => alert('Edit functionality not implemented yet!')}>Edit</button>
              <button onClick={() => handleDeletePackage(pkg._id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No packages available</li>
        )}
      </ul>

      <h2>Add Package</h2>
      <input
        type="text"
        placeholder="Name"
        value={newPackage.name}
        onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={newPackage.description}
        onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newPackage.price}
        onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
      />
      <button onClick={handleAddPackage}>Add Package</button>
      <button onClick={() => setNewPackage({ name: '', description: '', price: '' })}>Cancel</button>
    </div>
  );
};

export default PackageManager;
