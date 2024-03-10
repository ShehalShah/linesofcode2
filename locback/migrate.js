// migrate.js

const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

// Initialize Sequelize with your database configuration
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
       ssl: {
         require: true,
         rejectUnauthorized: false
       }
    }
   });

// Load the migration script
const migration = require('./migrations/add-watchlist-field');

// Execute the migration
(async () => {
    try {
        await migration.up(sequelize.getQueryInterface(), Sequelize);
        console.log('Migration successful');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await sequelize.close();
    }
})();
