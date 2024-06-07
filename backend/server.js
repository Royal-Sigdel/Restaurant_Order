const express = require('express');
const cors = require('cors');
const menuRoutes = require('./routes/menu');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/order');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/menu', menuRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', ordersRoutes);

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
