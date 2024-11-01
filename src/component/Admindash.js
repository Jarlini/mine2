import React, { useState, useEffect } from 'react';
import api from './Api';
import ManageGroups from './M.group';
import ItemForm from './Itemform';
import MHome from './Mhome';
import MUser from './M.user';
import MPackage from './Mpackege';
import MOrder from './Morder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faSuitcase, faBox, faClipboardList, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '/home/uki-student/mine/freshmyf-main/src/component/Style.css';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [data, setData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [userCount, setUserCount] = useState(167);
  const [tripCount, setTripCount] = useState(5);
  const [packageCount, setPackageCount] = useState(8);
  const [orderCount, setOrderCount] = useState(89);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        switch (activeSection) {
          case 'users':
            response = await api.get('/users');
            setUserCount(response.data.length); // Set user count
            break;
          case 'trips':
            response = await api.get('/trips');
            setTripCount(response.data.length); // Set trip count
            break;
          case 'packages':
            response = await api.get('/packages');
            setPackageCount(response.data.length); // Set package count
            break;
          case 'groups':
            response = await api.get('/groups');
            break;
          case 'orders':
            response = await api.get('/orders');
            setOrderCount(response.data.length); // Set order count
            break;
          default:
            return;
        }
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (activeSection && activeSection !== 'overview') {
      fetchData();
    }
  }, [activeSection]);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar bg-teal text-white">
        <h2 className="text-center py-4">Admin Dashboard</h2>
        <ul className="nav flex-column">
          <li className="nav-item">
            <button className={`nav-link ${activeSection === 'overview' ? 'active' : ''}`} onClick={() => setActiveSection('overview')}>
              <FontAwesomeIcon icon={faTachometerAlt} /> Overview
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeSection === 'users' ? 'active' : ''}`} onClick={() => setActiveSection('users')}>
              <FontAwesomeIcon icon={faUsers} /> Manage Users
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeSection === 'trips' ? 'active' : ''}`} onClick={() => setActiveSection('trips')}>
              <FontAwesomeIcon icon={faSuitcase} /> Manage Trips
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeSection === 'packages' ? 'active' : ''}`} onClick={() => setActiveSection('packages')}>
              <FontAwesomeIcon icon={faBox} /> Manage Packages
            </button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${activeSection === 'orders' ? 'active' : ''}`} onClick={() => setActiveSection('orders')}>
              <FontAwesomeIcon icon={faClipboardList} /> Manage Orders
            </button>
          </li>
        </ul>
      </div>
      <div className="content bg-light">
        {activeSection === 'overview' && (
          <div className="overview-page">
            <h1 className="text-center mb-5">Welcome to the Admin Dashboard</h1>
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="card bg-info text-white h-100">
                  <div className="card-body text-center">
                    <FontAwesomeIcon icon={faUsers} size="3x" className="mb-3" />
                    <h5 className="card-title">Manage Users</h5>
                    <p className="card-text">View and manage user accounts</p>
                    <p className="card-text"><strong>Count: {userCount}</strong></p> {/* Display user count */}
                    <button className="btn btn-outline-light mt-3" onClick={() => setActiveSection('users')}>Go to Users</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card bg-orange text-white h-100">
                  <div className="card-body text-center">
                    <FontAwesomeIcon icon={faSuitcase} size="3x" className="mb-3" />
                    <h5 className="card-title">Manage Trips</h5>
                    <p className="card-text">Create and edit trip offerings</p>
                    <p className="card-text"><strong>Count: {tripCount}</strong></p> {/* Display trip count */}
                    <button className="btn btn-outline-light mt-3" onClick={() => setActiveSection('trips')}>Go to Trips</button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card bg-teal text-white h-100">
                  <div className="card-body text-center">
                    <FontAwesomeIcon icon={faBox} size="3x" className="mb-3" />
                    <h5 className="card-title">Manage Packages</h5>
                    <p className="card-text">Update travel packages</p>
                    <p className="card-text"><strong>Count: {packageCount}</strong></p> {/* Display package count */}
                    <button className="btn btn-outline-light mt-3" onClick={() => setActiveSection('packages')}>Go to Packages</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6 mb-4">
                <div className="card bg-info text-white h-100">
                  <div className="card-body text-center">
                    <FontAwesomeIcon icon={faClipboardList} size="3x" className="mb-3" />
                    <h5 className="card-title">Manage Orders</h5>
                    <p className="card-text">View and process customer orders</p>
                    <p className="card-text"><strong>Count: {orderCount}</strong></p> {/* Display order count */}
                    <button className="btn btn-outline-light mt-3" onClick={() => setActiveSection('orders')}>Go to Orders</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeSection === 'users' && <MUser />}
        {activeSection === 'trips' && <MHome />}
        {activeSection === 'packages' && <MPackage />}
        {activeSection === 'groups' && (
          <>
            <ManageGroups data={data} onSelectItem={handleItemSelect} />
            {selectedItem && <ItemForm item={selectedItem} type="group" />}
          </>
        )}
        {activeSection === 'orders' && <MOrder />}
      </div>
    </div>
  );
}
