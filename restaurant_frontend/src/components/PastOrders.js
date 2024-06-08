import backgroundImage from '../Assets/pastorder_bg.jpg'; 
import React, { useEffect } from 'react';

const PastOrders = ({ pastOrders, setPastOrders, removeOrder }) => {
  useEffect(() => {
    fetch('http://localhost:5001/orders')
      .then(response => response.json())
      .then(data => setPastOrders(data))
      .catch(error => console.error('Error fetching past orders:', error));
  }, [setPastOrders]);

  return (
    <div 
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        minHeight: '100vh' 
      }}
    >
    <div className="container">
      <h1 className="mb-4 pt-5">Past Orders</h1>
      <ul className="list-group mb-4">
        {pastOrders.map(order => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={order.id}>
            <div>
              Order #{order.id} - ${order.total.toFixed(2)}
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => removeOrder(order.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default PastOrders;
