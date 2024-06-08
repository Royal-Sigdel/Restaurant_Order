import React from 'react';
import MenuItem from './MenuItem';
import menuItems from '../menuData'; 
import backgroundImage from '../Assets/bg.jpg'; 

const Home = ({ addToCart, cartItems }) => {
  // Use menuItems imported from menuData.js
  // const [menuItems, setMenuItems] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:5000/menu')
  //     .then(response => response.json())
  //     .then(data => setMenuItems(data))
  //     .catch(error => console.error('Error fetching menu:', error));
  // }, []);

  return (
    <div className='menupage'
    style={{ 
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      minHeight: '100vh' }}>
      <div className="container pb-5">
        <h1 className="mb-4 pt-5 header-title">Menu</h1>
        <div className="row menu-item">
          {menuItems.map(item => (
            <MenuItem
              key={item.id}
              item={item}
              addToCart={addToCart}
              isAdded={cartItems.some(cartItem => cartItem.id === item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
