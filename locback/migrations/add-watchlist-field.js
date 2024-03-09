'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Add the watchlist column to the Users table
        await queryInterface.addColumn('Users', 'watchlist', {
            type: Sequelize.ARRAY(Sequelize.JSON), // Assuming each product in watchlist is an object
            defaultValue: [] // Default value is an empty array
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Remove the watchlist column from the Users table
        await queryInterface.removeColumn('Users', 'watchlist');
    }
};