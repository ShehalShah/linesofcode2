// app.js
const express = require('express');
const userRoutes = require('./routes/userRoutes'); // temporarily removed
const productRoutes = require('./routes/productRoutes');
const sequelize = require('./database'); // temporarily removed
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes); // temporarily removed
app.use('/api/products', productRoutes);
const PORT = process.env.PORT || 5000;

sequelize.sync() // temporarily removed
 .then(() => { // temporarily removed
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 }) // temporarily removed
 .catch(err => console.log(err)); // temporarily removed
