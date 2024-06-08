import React, { useEffect } from 'react';
import backgroundImage from '../Assets/cart_bg.jpg'; 
import CartItem from './CartItem'; 
const Cart = ({ cartItems, setCartItems, incrementQuantity, decrementQuantity, removeItem, placeOrder }) => {
  useEffect(() => {
    fetch('http://localhost:5001/cart')
      .then(response => response.json())
      .then(data => setCartItems(data))
      .catch(error => console.error('Error fetching cart:', error));
  }, [setCartItems]);

  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div style={{ 
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      minHeight: '100vh' }}>
      <div className="container">
        <h1 className="mb-4 pt-5">Cart</h1>
        <ul className="list-group mb-4">
          {cartItems.map(item => (
            <CartItem
              key={item.id}
              item={item}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              removeItem={removeItem}
            />
          ))}
        </ul>
        <h2>Total: ${totalCost.toFixed(2)}</h2>
        <button className="btn btn-success" onClick={placeOrder}>Order</button>
      </div>
    </div>
  );
};

export default Cart;
