const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Library = sequelize.define('library', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  }
});

module.exports = Library;