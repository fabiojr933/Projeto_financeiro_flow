'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('family_member', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'user', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      name: {
        allowNull: false,
        type: Sequelize.STRING(150)
      },

      relationship: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },

      color_code: {
        allowNull: true,
        type: Sequelize.STRING(7)
      },

      active: {
        allowNull: false,
        type: Sequelize.STRING(1),
        defaultValue: 'S'
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('family_member');
  }
};
