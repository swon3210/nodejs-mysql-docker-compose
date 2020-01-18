const User = require('../models/user');

exports.getUsers = (req, res) => {
  User.findAll()
    .then(users => {
      res.send(users);
    });
}

exports.findUser = (req, res) => {
  const userIdx = req.params.userIdx;
  User.findOne({where: {id: userIdx}})
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      console.log(err);
    })
}
