import React, { useEffect, useState } from 'react';
import api from './Api'; // Adjust the path as necessary
import '/home/uki-student/Downloads/mine/freshmyf-main/src/component/Morder.css'; // Ensure the correct path is used

const MOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('http://localhost:5000/api/bookings/orders'); // Adjust the endpoint as necessary
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error fetching orders: {error}</div>;
  }

  return (
    <div className="m-order">
      <h2>Manage Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="order-container">
          {orders.map(order => (
            <div className="order-card" key={order._id}>
              <h3>Order ID: {order._id}</h3>
              <p><strong>Email:</strong> {order.email}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
              <p><strong>Total Amount:</strong> {order.totalAmount}</p>

              {/* Passengers List */}
              <div className="passengers-section">
                <h4>Passengers:</h4>
                {order.passengers.length > 0 ? (
                  <ul className="passenger-list">
                    {order.passengers.map((passenger, index) => (
                      <li key={index}>
                        {passenger.name} (Age: {passenger.age}, Email: {passenger.email})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No passengers listed.</p>
                )}
              </div>

              {/* Packages List */}
              <div className="packages-section">
                <h4>Packages:</h4>
                {order.packages.length > 0 ? (
                  <ul className="package-list">
                    {order.packages.map((pkg, index) => (
                      <li key={index}>
                        {pkg.packageName} (Price: {pkg.packagePrice})
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No packages listed.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MOrder;
