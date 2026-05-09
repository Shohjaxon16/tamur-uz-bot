const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { sendOrderToChannel } = require('../services/telegram');

const ordersPath = path.join(__dirname, '../data/orders.json');

function getOrders() {
  try { return JSON.parse(fs.readFileSync(ordersPath, 'utf8')); }
  catch { return []; }
}

function saveOrders(orders) {
  fs.writeFileSync(ordersPath, JSON.stringify(orders, null, 2));
}

function generateId() {
  const orders = getOrders();
  const num = String(orders.length + 1).padStart(3, '0');
  return `TAMUR-${new Date().getFullYear()}-${num}`;
}

router.post('/', async (req, res) => {
  try {
    const { name, phone, region, address, note, items, totalPrice, delivery } = req.body;

    // Validatsiya
    if (!name || !phone || !region || !address || !items?.length) {
      return res.status(400).json({ error: "Ma'lumotlar to'liq emas" });
    }

    const orderId = generateId();
    const order = {
      orderId, name, phone, region, address, note,
      items, totalPrice, delivery,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Saqlash
    const orders = getOrders();
    orders.push(order);
    saveOrders(orders);

    // Telegram ga yuborish
    await sendOrderToChannel(order);

    res.json({ success: true, orderId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server xatosi' });
  }
});

module.exports = router;
