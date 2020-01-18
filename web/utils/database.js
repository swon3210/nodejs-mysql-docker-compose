const mysql = require('mysql2');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  dialect: 'mysql',
  host: process.env.DATABASE_HOST
});

module.exports = sequelize;