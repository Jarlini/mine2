import React, { useEffect, useState } from 'react';
import api from './Api'; // Adjust the path as necessary
import '/home/uki-student/Downloads/mine/freshmyf-main/src/component/Morder.css';
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching orders: {error}</div>;
  }

  return (
    <div className="m-order">
      <h2>Manage Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id}>
              <h3>Order ID: {order._id}</h3>
              <p>Email: {order.email}</p>
              <p>Address: {order.address}</p>
              <p>Phone: {order.phone}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Total Amount: {order.totalAmount}</p>
              <h4>Passengers:</h4>
              <ul>
                {order.passengers.map((passenger, index) => (
                  <li key={index}>
                    {passenger.name} (Age: {passenger.age}, Email: {passenger.email})
                  </li>
                ))}
              </ul>
              <h4>Packages:</h4>
              <ul>
                {order.packages.map((pkg, index) => (
                  <li key={index}>
                    {pkg.packageName} (Price: {pkg.packagePrice})
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MOrder;
