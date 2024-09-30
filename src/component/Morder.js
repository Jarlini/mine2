import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/orders');
        console.log('Orders API response:', response.data);
        setOrders(response.data.orders || []); // Ensure orders is always an array
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      {Array.isArray(orders) && orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id}>
            <p>{order.details}</p>
          </div>
        ))
      ) : (
        <p> <br/> <br/> <br/>No orders found.<br/> <h1>hiii</h1></p>
      )}
    </div>
  );
};

export default MOrder;
