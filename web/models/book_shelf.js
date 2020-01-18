const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const BookShelf = sequelize.define('bookShelf', {
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
  },
  bookCount: {
    type: Sequelize.INTEGER
  }
});

module.exports = BookShelf;