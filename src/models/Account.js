'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Account = sequelize.define('account', {
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

  // BANK | CREDIT
  type: {
    allowNull: false,
    type: DataTypes.STRING(20)
  },

  // Nome da instituição
  institution_name: {
    allowNull: false,
    type: DataTypes.STRING(150)
  },


  active: {
    allowNull: false,
    type: DataTypes.STRING(1),
    defaultValue: 'S'
  }

}, {
  tableName: 'account',
  timestamps: true
});

module.exports = Account;
