const express = require('express')
const router = express.Router();
const MenuItems = require('../data/menu.json')

router.get('/', (req, res) => {
  res.json(MenuItems)
})

module.exports = router;

