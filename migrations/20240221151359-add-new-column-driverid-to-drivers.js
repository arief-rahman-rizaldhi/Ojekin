'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('DriverProfiles', 'DriverId', {
      type: Sequelize.INTEGER,
      references: {
        model: "Drivers",
        key: 'id'
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('DriverProfiles','DriverId')
  }
};
