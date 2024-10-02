
// import React, { useState, useEffect } from 'react';


// // API calls for packages
// export const getPackages = async () => {
//   const API_URL = '/api/packages';
//   try {
//     const response = await fetch(API_URL);
//     if (!response.ok) {
//       throw new Error('Failed to fetch packages');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching packages:', error);
//     return [];
//   }
// };

// const addPackage = async (newPackage) => {
//   try {
//     const response = await fetch('http://localhost:5000/api/packages', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newPackage),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to add package');
//     }
//     return await response.json(); // Adjust based on your response structure
//   } catch (error) {
//     console.error('Error adding package:', error);
//     return null; // Handle accordingly
//   }
// };

// const updatePackage = async (id, updatedPackage) => {
//   try {
//     const response = await fetch(`http://localhost:5000/api/packages/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedPackage),
//     });
//     if (!response.ok) {
//       throw new Error('Failed to update package');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error updating package:', error);
//     return null;
//   }
// };

// export const deletePackage = async (packageId) => {
//   const API_URL = `/api/packages/${packageId}`;
//   try {
//     const response = await fetch(API_URL, {
//       method: 'DELETE',
//     });
//     if (!response.ok) {
//       throw new Error('Failed to delete package');
//     }
//     return await response.json(); // Return the response for the deleted package
//   } catch (error) {
//     console.error('Error deleting package:', error);
//     return null;
//   }
// };

// const PackageManager = () => {
//   const [packages, setPackages] = useState([]);
//   const [newPackage, setNewPackage] = useState({ name: '', description: '', price: '' });
//   const [editingPackageId, setEditingPackageId] = useState(null); // Track the package being edited

//   // Fetch all packages on component mount
//   useEffect(() => {
//     const fetchPackages = async () => {
//       const fetchedPackages = await getPackages();
//       if (Array.isArray(fetchedPackages)) {
//         setPackages(fetchedPackages);
//       }
//     };
//     fetchPackages();
//   }, []);

//   // Handle adding or updating a package
//   const handlePackageAction = async () => {
//     if (!newPackage.name || !newPackage.description || !newPackage.price) {
//       alert('Please fill in all fields.');
//       return;
//     }

//     if (editingPackageId) {
//       // Update existing package
//       const updatedPackage = await updatePackage(editingPackageId, {
//         name: newPackage.name,
//         description: newPackage.description,
//         price: Number(newPackage.price),
//       });

//       if (updatedPackage) {
//         setPackages(packages.map((pkg) => (pkg._id === editingPackageId ? updatedPackage : pkg)));
//         setEditingPackageId(null); // Reset editing state
//       }
//     } else {
//       // Add new package
//       const addedPackage = await addPackage({
//         name: newPackage.name,
//         description: newPackage.description,
//         price: Number(newPackage.price),
//       });

//       if (addedPackage) {
//         setPackages([...packages, addedPackage]);
//       }
//     }

//     // Reset form
//     setNewPackage({ name: '', description: '', price: '' });
//   };

//   // Handle deleting a package
//   const handleDeletePackage = async (id) => {
//     const deletedPackage = await deletePackage(id);
//     if (deletedPackage) {
//       setPackages(packages.filter((pkg) => pkg._id !== id));
//     }
//   };

//   // Set package for editing
//   const handleEditClick = (pkg) => {
//     setNewPackage({ name: pkg.name, description: pkg.description, price: pkg.price });
//     setEditingPackageId(pkg._id);
//   };

//   return (
//     <div>
//       <h1>Package Manager</h1>

//       <h2>All Packages</h2>
//       <ul>
//         {packages.length > 0 ? (
//           packages.map((pkg) => (
//             <li key={pkg._id}>
//               {pkg.name} - Rs. {pkg.price}
//               <button onClick={() => handleEditClick(pkg)}>Edit</button>
//               <button onClick={() => handleDeletePackage(pkg._id)}>Delete</button>
//             </li>
//           ))
//         ) : (
//           <li>No packages available</li>
//         )}
//       </ul>

//       <h2>{editingPackageId ? 'Edit Package' : 'Add Package'}</h2>
//       <input
//         type="text"
//         placeholder="Name"
//         value={newPackage.name}
//         onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Description"
//         value={newPackage.description}
//         onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
//       />
//       <input
//         type="number"
//         placeholder="Price"
//         value={newPackage.price}
//         onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
//       />
//       <button onClick={handlePackageAction}>{editingPackageId ? 'Update Package' : 'Add Package'}</button>
//       <button onClick={() => {
//         setNewPackage({ name: '', description: '', price: '' });
//         setEditingPackageId(null); // Reset editing state
//       }}>Cancel</button>
//     </div>
//   );
// };

// export default PackageManager;
import React, { useState, useEffect } from 'react';
import '/home/uki-student/Downloads/mine/freshmyf-main/src/component/Mpack.css';
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

const updatePackage = async (id, updatedPackage) => {
  try {
    const response = await fetch(`http://localhost:5000/api/packages/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPackage),
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
    return await response.json(); // Return the response for the deleted package
  } catch (error) {
    console.error('Error deleting package:', error);
    return null;
  }
};

const PackageManager = () => {
  const [packages, setPackages] = useState([]);
  const [newPackage, setNewPackage] = useState({ name: '', description: '', price: '' });
  const [editingPackageId, setEditingPackageId] = useState(null); // Track the package being edited

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

  // Handle adding or updating a package
  const handlePackageAction = async () => {
    if (!newPackage.name || !newPackage.description || !newPackage.price) {
      alert('Please fill in all fields.');
      return;
    }

    if (editingPackageId) {
      // Update existing package
      const updatedPackage = await updatePackage(editingPackageId, {
        name: newPackage.name,
        description: newPackage.description,
        price: Number(newPackage.price),
      });

      if (updatedPackage) {
        setPackages(packages.map((pkg) => (pkg._id === editingPackageId ? updatedPackage : pkg)));
        setEditingPackageId(null); // Reset editing state
      }
    } else {
      // Add new package
      const addedPackage = await addPackage({
        name: newPackage.name,
        description: newPackage.description,
        price: Number(newPackage.price),
      });

      if (addedPackage) {
        setPackages([...packages, addedPackage]);
      }
    }

    // Reset form
    setNewPackage({ name: '', description: '', price: '' });
  };

  // Handle deleting a package
  const handleDeletePackage = async (id) => {
    const deletedPackage = await deletePackage(id);
    if (deletedPackage) {
      setPackages(packages.filter((pkg) => pkg._id !== id));
    }
  };

  // Set package for editing
  const handleEditClick = (pkg) => {
    setNewPackage({ name: pkg.name, description: pkg.description, price: pkg.price });
    setEditingPackageId(pkg._id);
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
              <button onClick={() => handleEditClick(pkg)}>Edit</button>
              <button onClick={() => handleDeletePackage(pkg._id)}>Delete</button>
            </li>
          ))
        ) : (
          <li>No packages available</li>
        )}
      </ul>

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
      <div className="button-container">
        <button className="main-button" onClick={handlePackageAction}>
          {editingPackageId ? 'Update Package' : 'Add Package'}
        </button>
        <button
          className="cancel-button"
          onClick={() => {
            setNewPackage({ name: '', description: '', price: '' });
            setEditingPackageId(null); // Reset editing state
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PackageManager;
