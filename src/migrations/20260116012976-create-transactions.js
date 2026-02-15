'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transaction', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'user', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'category', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      account_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'account', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      family_member_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'family_member', key: 'id' }, // Ajuste o nome da tabela se for diferente
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2)
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('receita', 'despesa')
      },
      quota: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },      
      due_date: {
        allowNull: false,
        type: Sequelize.DATEONLY // DATEONLY salva apenas YYYY-MM-DD
      },
      issued_date: {
        allowNull: false,
        type: Sequelize.DATEONLY, // DATEONLY salva apenas YYYY-MM-DD
        defaultValue: Sequelize.fn('NOW')
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('pending', 'paid'),
        defaultValue: 'pending'
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
    await queryInterface.dropTable('transaction');
  }
};