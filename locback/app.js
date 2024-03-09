// app.js
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./database');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync()
 .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 })
 .catch(err => console.log(err));
