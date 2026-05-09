const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');

router.get('/', (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Server xatosi' });
  }
});

module.exports = router;
