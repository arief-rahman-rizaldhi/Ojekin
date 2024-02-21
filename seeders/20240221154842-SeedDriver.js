'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/drivers.json")
      .map((el) => {
        el.createdAt = el.updatedAt = new Date();
        return el;
      });
    await queryInterface.bulkInsert('Drivers', data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Drivers', null, {
      truncate: true,
      restartIdentity: true,
      cascade: true,
    })
  }
};
