require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/order',    require('./routes/orders'));
app.use('/api/products', require('./routes/products'));

app.get('/health', (req, res) => res.json({ status: 'ok', shop: 'TAMUR Men\'s Wear' }));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`TAMUR server: http://localhost:${PORT}`));
