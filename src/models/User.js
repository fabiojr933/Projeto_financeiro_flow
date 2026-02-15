'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING
  },
  address: {
    allowNull: true,
    type: DataTypes.STRING
  },
   password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  active: {
    allowNull: false,
    type: DataTypes.STRING(1),
    defaultValue: 'S'
  },
}, {
  tableName: 'user',
  timestamps: true
});

module.exports = User;
