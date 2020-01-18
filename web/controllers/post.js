const User = require('../models/user');
const Post = require('../models/post');
const Book = require('../models/book');

const Op = require('sequelize');

exports.getPosts = (req, res) => {
  Post.findAll()
    .then(posts => {
      res.status(200).send(posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
}

exports.searchPosts = (req, res) => {

  const userIdx = req.query.userIdx;
  const bookIdx = req.query.userIdx;

  if (userIdx || bookIdx) {
    Post.findAll({
      where: {
        [Op.or]: [{userId: userIdx}, {bookId: bookIdx}]
      }
    })
      .then(posts => {
        res.status(200).send(posts);
      })
      .catch(err => {
        console.log(err);
        res.status(500).end();
      })
  } else {
    res.status(400).end();
  }
  
}

exports.addPost = (req, res) => {

  const userIdx = req.body.userIdx;
  const bookIdx = req.body.bookIdx;
  const addingTitle = req.body.title;
  const addingImageUrl = req.body.imageUrl;
  const addingText = req.body.text;

  // 관계형 모델에 따라, 포스트가 생성되면 자동으로 유저 객체를 이용해 포스트를 생성시킴으로써 데이터베이스 상에 해당 관계를 포함한 행을 추가함(1대 다 관계 구현)
  Post.create({
    title: addingTitle,
    imageUrl: addingImageUrl,
    text: addingText,
    userId: userIdx,
    bookId: bookIdx
  })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    })

}

exports.updatePost = (req, res) => {

  const idx = req.body.idx;
  const updatingTitle = req.body.title;
  const updatingImageUrl = req.body.imageUrl;
  const updatingText = req.body.text;

  Post.findByPk(idx)
    .then(post => {
      post.title = updatingTitle;
      post.imageUrl = updatingImageUrl;
      post.text = updatingText;
      return post.save();
    })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    })
}

exports.deletePost = (req, res) => {

  const idx = req.params.idx;

  Post.findByPk(idx)
    .then(post => {
      return post.destroy();
    })
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    })
}

// findById() -> findByPk()