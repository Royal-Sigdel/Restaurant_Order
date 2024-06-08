import React from 'react';

const CartItem = ({ item, incrementQuantity, decrementQuantity, removeItem }) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        {item.name} - ${item.price.toFixed(2)} x {item.quantity}
      </div>
      <div>
        <button className="btn btn-secondary btn-sm mr-2" onClick={() => incrementQuantity(item.id)}>+</button>
        <span className="mx-2">{item.quantity}</span> {/* Display quantity here */}
        <button className="btn btn-secondary btn-sm mr-2" onClick={() => decrementQuantity(item.id)}>-</button>
        <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>Remove</button>
      </div>
    </li>
  );
};

export default CartItem;
