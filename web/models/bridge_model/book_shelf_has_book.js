const Sequelize = require('sequelize');

const sequelize = require('../../utils/database');

const BookShelf_Has_Book = sequelize.define('bookShelfHasBook', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = BookShelf_Has_Book;