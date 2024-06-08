import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Cart from './components/Cart';
import PastOrders from './components/PastOrders';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);

  const addToCart = (item) => {
    fetch('http://localhost:5001/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then(response => response.json())
      .then(data => {
        setCartItems(prevItems => {
          const existingItem = prevItems.find(cartItem => cartItem.id === data.id);
          if (existingItem) {
            return prevItems.map(cartItem =>
              cartItem.id === data.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
            );
          }
          return [...prevItems, { ...data }];
        });
      })
      .catch(error => console.error('Error adding to cart:', error));
  };

  const incrementQuantity = (id) => {
    const item = cartItems.find(item => item.id === id);
    fetch(`http://localhost:5001/cart/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then(response => response.json())
      .then(() => {
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      })
      .catch(error => console.error('Error updating quantity:', error));
  };

  const decrementQuantity = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (item.quantity > 1) {
      fetch(`http://localhost:5001/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then(response => response.json())
        .then(() => {
          setCartItems(prevItems =>
            prevItems.map(item =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
          );
        })
        .catch(error => console.error('Error updating quantity:', error));
    }
  };

  const removeItem = (id) => {
    fetch(`http://localhost:5001/cart/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
      })
      .catch(error => console.error('Error removing item:', error));
  };

  const placeOrder = () => {
    const total = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const order = { id: Date.now(), items: cartItems, total };
    setPastOrders(prevOrders => [...prevOrders, order]);
    setCartItems([]);

    fetch('http://localhost:5001/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then(response => response.json())
      .catch(error => console.error('Error placing order:', error));
  };

  const removeOrder = (id) => {
    fetch(`http://localhost:5001/orders/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(() => {
        setPastOrders(prevOrders => prevOrders.filter(order => order.id !== id));
      })
      .catch(error => console.error('Error removing order:', error));
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} cartItems={cartItems} />} />
        <Route path="/cart" element={
          <Cart
            cartItems={cartItems}
            setCartItems={setCartItems}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            removeItem={removeItem}
            placeOrder={placeOrder}
          />
        } />
        <Route path="/past-orders" element={
          <PastOrders pastOrders={pastOrders} setPastOrders={setPastOrders} removeOrder={removeOrder} />
        } />
      </Routes>
    </Router>
  );
};

export default App;
