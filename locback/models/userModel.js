// models/userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  watchlist: {
    type: DataTypes.ARRAY(DataTypes.JSON), // Assuming each watchlist item is a JSON object
    defaultValue: [], // Default value is an empty array
  },
});

module.exports = User;
