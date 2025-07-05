const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/productRoutes');
require('dotenv').config();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', categoryRoutes);

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
