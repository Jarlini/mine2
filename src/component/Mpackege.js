import React, { useState, useEffect } from 'react';
import './Mpack.css'; // Assuming this is where your CSS is stored

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

const addPackage = async (formData) => {
  try {
    const response = await fetch('/api/packages', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Failed to add package');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding package:', error);
    return null;
  }
};

const updatePackage = async (id, formData) => {
  try {
    const response = await fetch(`/api/packages/${id}`, {
      method: 'PUT',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Failed to update package');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating package:', error);
    return null;
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
    return await response.json();
  } catch (error) {
    console.error('Error deleting package:', error);
    return null;
  }
};

const PackageManager = () => {
  const [packages, setPackages] = useState([]);
  const [newPackage, setNewPackage] = useState({ name: '', description: '', price: '' });
  const [selectedPhotos, setSelectedPhotos] = useState(null);
  const [editingPackageId, setEditingPackageId] = useState(null);

  // Fetching all packages
  useEffect(() => {
    const fetchPackages = async () => {
      const fetchedPackages = await getPackages();
      if (Array.isArray(fetchedPackages)) {
        setPackages(fetchedPackages);
      }
    };
    fetchPackages();
  }, []);

  // Handle Add or Update Package
  const handlePackageAction = async () => {
    if (!newPackage.name || !newPackage.description || !newPackage.price) {
      alert('Please fill in all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', newPackage.name);
    formData.append('description', newPackage.description);
    formData.append('price', newPackage.price);
    if (selectedPhotos) {
      for (let i = 0; i < selectedPhotos.length; i++) {
        formData.append('photos', selectedPhotos[i]);
      }
    }

    if (editingPackageId) {
      const updatedPackage = await updatePackage(editingPackageId, formData);
      if (updatedPackage) {
        setPackages(packages.map((pkg) => (pkg._id === editingPackageId ? updatedPackage : pkg)));
        setEditingPackageId(null);
      }
    } else {
      const addedPackage = await addPackage(formData);
      if (addedPackage) {
        setPackages([...packages, addedPackage]);
      }
    }

    setNewPackage({ name: '', description: '', price: '' });
    setSelectedPhotos(null);
  };

  // Handle Deleting a Package
  const handleDeletePackage = async (id) => {
    const deletedPackage = await deletePackage(id);
    if (deletedPackage) {
      setPackages(packages.filter((pkg) => pkg._id !== id));
    }
  };

  // Handle Edit Click
  const handleEditClick = (pkg) => {
    setNewPackage({ name: pkg.name, description: pkg.description, price: pkg.price });
    setEditingPackageId(pkg._id);
  };

  return (
    <div className="package-manager">
      <h1>Package Manager</h1>

      {/* Display All Packages */}
      <h2>All Packages</h2>
      <table>
        <thead>
          <tr>
            <th>Package Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Photos</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <tr key={pkg._id}>
                <td>{pkg.name}</td>
                <td>{pkg.description}</td>
                <td>Rs. {pkg.price}</td>
                <td>
                  {pkg.photos && pkg.photos.length > 0 ? (
                    pkg.photos.map((photo, index) => (
                      <img key={index} src={photo} alt={pkg.name} style={{ width: '50px', height: '50px' }} />
                    ))
                  ) : (
                    'No photos available'
                  )}
                </td>
                <td>
                  <button onClick={() => handleEditClick(pkg)} className="action-button">Edit</button>
                  <button onClick={() => handleDeletePackage(pkg._id)} className="action-button">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No packages available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add/Edit Form */}
      <h2>{editingPackageId ? 'Edit Package' : 'Add Package'}</h2>
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
      <input
        type="file"
        multiple
        onChange={(e) => setSelectedPhotos(e.target.files)}
      />
      <div className="button-container">
        <button className="main-button" onClick={handlePackageAction}>
          {editingPackageId ? 'Update Package' : 'Add Package'}
        </button>
        <button
          className="cancel-button"
          onClick={() => {
            setNewPackage({ name: '', description: '', price: '' });
            setEditingPackageId(null);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PackageManager;
