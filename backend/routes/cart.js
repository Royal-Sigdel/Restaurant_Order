const express = require('express');
const router = express.Router();

let cart = [];

router.get('/', (req, res) => {
  res.json(cart);
});

router.post('/', (req, res) => {
  const { id, name, price } = req.body;
  let item = cart.find(cartItem => cartItem.id === id);
  if (item) {
    item.quantity += 1;
  } else {
    item = { id, name, price, quantity: 1 };
    cart.push(item);
  }
  res.status(201).json(item);
});

router.delete('/', (req, res) => {
  cart = [];
  res.status(200).json({ message: "Cart cleared" });
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { quantity } = req.body;

  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity = quantity;
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter(item => item.id !== id);
  res.status(200).json({ message: "Item removed" });
});

module.exports = router;
