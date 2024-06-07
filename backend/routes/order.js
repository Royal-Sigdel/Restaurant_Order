const express = require('express');
const router = express.Router();

let orders = [];

router.get('/', (req, res) => {
  res.json(orders);
});

router.post('/', (req, res) => {
  const { items, total } = req.body;
  const order = { id: Date.now(), items, total };
  orders.push(order);
  res.status(201).json(order);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  orders = orders.filter(order => order.id !== id);
  res.status(200).json({ message: "Order removed" });
});

module.exports = router;
