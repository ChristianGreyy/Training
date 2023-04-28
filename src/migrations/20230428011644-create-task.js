"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Tasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      creator_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      assignee_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      project_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Projects",
          key: "id",
        },
      },
      type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Types",
          key: "id",
        },
      },
      status_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Statuses",
          key: "id",
        },
      },
      priority_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Priorities",
          key: "id",
        },
      },
      name: {
        type: Sequelize.STRING,
      },
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Tasks");
  },
};
