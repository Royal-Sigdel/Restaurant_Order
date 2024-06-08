import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '../Assets/chef-restaurant-logo-publicdomainvectors.svg';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <div className="logo">
            <img src={logoImage} alt="Restaurant Logo" className="logo-img" />
            <h1 className="restaurant-name">Restaurant</h1>
          </div>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <NavItem to="/" currentPath={location.pathname}>Home</NavItem>
            <NavItem to="/cart" currentPath={location.pathname}>Cart</NavItem>
            <NavItem to="/past-orders" currentPath={location.pathname}>Past Orders</NavItem>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, children, currentPath }) => {
  const isActive = to === currentPath;

  return (
    <li className={`nav-item ${isActive ? 'active' : ''}`}>
      <Link className={`nav-link ${isActive ? 'active-link' : ''}`} to={to}>{children}</Link>
    </li>
  );
};

export default Navbar;
