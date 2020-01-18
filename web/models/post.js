const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

// 모델 이름과 모델 형식 지정
const Post = sequelize.define('post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: Sequelize.STRING,
  text: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.STRING,
  },
})

module.exports = Post;

