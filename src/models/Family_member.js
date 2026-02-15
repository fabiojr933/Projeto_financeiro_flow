'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FamilyMember = sequelize.define('FamilyMember', {
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

  relationship: {
    allowNull: false,
    type: DataTypes.STRING(50)
  },

  color_code: {
    allowNull: true,
    type: DataTypes.STRING(7)
  },

  active: {
    allowNull: false,
    type: DataTypes.STRING(1),
    defaultValue: 'S'
  }

}, {
  tableName: 'family_member',
  timestamps: true
});

module.exports = FamilyMember;
