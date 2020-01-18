const Library = require('../models/library');
const User = require('../models/user');

exports.createLibrary = (req, res) => {

  const userIdx = req.body.userIdx;

  User.findByPk(userIdx)
    .then(user => {
      return user.createLibrary({
        id: 1,
        name: '첫번째 도서관',
        description: '당신의 도서관을 설명해주세요'
      });
    })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(false);
      console.log(err);
    })
}

exports.getLibrary = (req, res) => {
  const userIdx = req.params.userIdx;
  Library.findOne({ where: { userId : userIdx } })
    .then(library => {
      res.send(library)
    })
};

exports.updateLibrary = (req, res) => {
  const libraryIdx = req.body.idx;
  const updatingName = req.body.name;
  const updatingDescription = req.body.description;

  Library.findOne({ where : { id: libraryIdx } })
    .then(library => {
      library.name = updatingName;
      library.description = updatingDescription;
      return library.save()
    })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    })
}