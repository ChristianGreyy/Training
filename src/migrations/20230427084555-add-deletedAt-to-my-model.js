"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Types", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    });
    await queryInterface.addIndex("Types", ["deletedAt"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Types", "deletedAt");
  },
};
