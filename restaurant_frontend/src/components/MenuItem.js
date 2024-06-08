import React from 'react';

const MenuItem = ({ item, addToCart, isAdded }) => {
  return (
    // <div className="col-md-4 mb-4">
      <div className="card menu-card">
        <img src={item.imageUrl} className="card-img-top" alt={item.name} />
        <div className="card-body">
          <div className='card-body-header'>
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text">${item.price.toFixed(2)}</p>
          </div>
          <div className='card-body-footer'>
            <button
              className={`btn btn-primary cart-add-btn ${isAdded ? 'disabled' : ''}`}
              onClick={() => addToCart(item)}
              disabled={isAdded}
            >
              {isAdded ? 'Added' : 'Add to cart'}
            </button>
            <span className="cart-icon" style={{ color: isAdded ? 'green' : 'gray' }}>
              <i className="fas fa-check-circle"></i>
            </span>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default MenuItem;
