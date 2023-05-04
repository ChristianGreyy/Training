"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Tokens", "type", {
      type: Sequelize.ENUM("refresh", "reset", "verify", "invite"),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Tokens", "type");
  },
};
