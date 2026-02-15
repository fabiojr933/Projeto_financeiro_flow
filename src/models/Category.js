'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('category', {
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

  name: {
    allowNull: false,
    type: DataTypes.STRING(150)
  },

  type : {
    allowNull: false,
    type: DataTypes.STRING(50)
  },

  color_code: {
    allowNull: true,
    type: DataTypes.STRING(7)
  },
   icon: {
    allowNull: true,
    type: DataTypes.STRING(50)
  },

  active: {
    allowNull: false,
    type: DataTypes.STRING(1),
    defaultValue: 'S'
  }

}, {
  tableName: 'category',
  timestamps: true
});

module.exports = Category;
