'use strict';

const { DataTypes, Sequelize } = require('sequelize'); // Adicionado Sequelize aqui para usar o .fn()
const sequelize = require('../config/database');

// Alterado de Account para Transaction para fazer sentido com o define('transaction')
const Transaction = sequelize.define('transaction', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },

  user_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  category_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  account_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  family_member_id: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING(255)
  },
  amount: {
    allowNull: false,
    type: DataTypes.DECIMAL(10, 2)
  },
  quota: {
    allowNull: false,
    // Corrigido para INTEGER, já que quantidade de parcelas é um número
    type: DataTypes.INTEGER
  },

  due_date: {
    allowNull: false,
    type: DataTypes.DATEONLY // Corrigido: era Sequelize.DATEONLY
  },
  issued_date: {
    allowNull: false,
    type: DataTypes.DATEONLY, // Corrigido: era Sequelize.DATEONLY
    defaultValue: Sequelize.fn('NOW')
  },
  status: {
    allowNull: false,
    type: DataTypes.ENUM('pending', 'paid'), // Corrigido: era Sequelize.ENUM
    defaultValue: 'paid'
  },
  type: {
    allowNull: false,
    type: DataTypes.STRING(20)
  }

}, {
  tableName: 'transaction',
  timestamps: true
});

module.exports = Transaction;