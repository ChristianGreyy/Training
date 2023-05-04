"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Statuses", "status", "name");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("Statuses", "status", "name");
  },
};
