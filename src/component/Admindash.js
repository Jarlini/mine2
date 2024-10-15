import React, { useState, useEffect } from 'react';
import api from './Api';
import ManageGroups from './M.group';
import AddService from './Home';
import ItemForm from './Itemform';
import MHome from './Mhome';
import MUser from './M.user';
import MPackage from './Mpackege';
import MOrder from './Morder'; // Import the new MOrder component

import '/home/uki-student/Downloads/mine/freshmyf-main/src/component/Style.css';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('');
  const [data, setData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        switch (activeSection) {
          case 'users':
            response = await api.get('/users');
            break;
          case 'trips':
            response = await api.get('/trips');
            break;
          case 'packages':
            response = await api.get('/packages');
            break;
          case 'groups':
            response = await api.get('/groups');
            break;
          case 'orders': // Adding case for orders
            response = await api.get('/orders'); // Fetch orders if needed
            break;
          default:
            return;
        }
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (activeSection) {
      fetchData();
    }
  }, [activeSection]);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li onClick={() => setActiveSection('users')}>Manage Users</li>
          <li onClick={() => setActiveSection('trips')}>Manage Trips</li>
          <li onClick={() => setActiveSection('packages')}>Manage Packages</li>
          <li onClick={() => setActiveSection('groups')}>Manage Groups</li>
          <li onClick={() => setActiveSection('addService')}>Add New Service</li>
          <li onClick={() => setActiveSection('orders')}>Manage Orders</li> {/* Updated to Manage Orders */}
        </ul>
      </div>
      <div className="content">
        {activeSection === 'overview' && (
          <>
            <h1>Welcome to the Admin Dashboard</h1>
            <p style={{ 
              color: '#004d40', 
              fontSize: '18px', 
              fontWeight: 'bold', 
              marginBottom: '20px' 
            }}>
              Welcome to the admin dashboard! Here you can manage trips, packages, users, and more.
            </p>
          </>
        )}
        {activeSection === 'users' && <MUser />}
        {activeSection === 'trips' && <MHome />} {/* Include MHome for trip management */}
        {activeSection === 'packages' && <MPackage />}
        {activeSection === 'groups' && (
          <>
            <ManageGroups data={data} onSelectItem={handleItemSelect} />
            {selectedItem && <ItemForm item={selectedItem} type="group" />}
          </>
        )}
        {activeSection === 'addService' && <AddService />}
        {activeSection === 'orders' && <MOrder />} {/* Render the MOrder component */}
      </div>
    </div>
  );
};

export default AdminDashboard;
