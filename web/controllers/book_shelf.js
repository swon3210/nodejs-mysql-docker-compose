const BookShelf = require('../models/book_shelf');
const Library = require('../models/library');

exports.getBookShelves = (req, res) => {
  const libraryIdx = req.params.libraryIdx;

  BookShelf.findAll({ where: { libraryId: libraryIdx }})
    .then(bookShelves => {
      res.send(bookShelves);
    })
    .catch(err => {
      console.log(err);
    });
};

// 모든 사람의 책장을 가져오는 것도 그냥 이걸로 대체할 수 있음
exports.searchBookShelves = (req, res) => {
  
  const findingName = req.query.name;

  BookShelf.findAll({where: { name: findingName } })
    .then(bookShelves => {
      res.send(bookShelves);
    })
    .catch(err => {
      console.log(err);
    })
};

exports.createBookShelf = (req, res) => {
  const libraryIdx = req.body.libraryIdx;
  const addingName = req.body.name;
  const addingDescription = req.body.description;

  return Library.findByPk(libraryIdx)
    .then(library => {
      return library.createBookShelf({
        name: addingName,
        description: addingDescription
      })
    })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    })

}

exports.updateBookShelf = (req, res) => {
  const idx = req.body.idx;
  const updatingName = req.body.name;
  const updatingDescription = req.body.description;

  return BookShelf.findByPk(idx)
    .then(bookShelf => {
      bookShelf.name = updatingName;
      bookShelf.description = updatingDescription;
      return bookShelf.save();
    })
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err);
    })

}

exports.deleteBookShelf = (req, res) => {
  const deletingIdx = req.params.idx;
  return BookShelf.findByPk(deletingIdx)
    .then(bookShelf => {
      return bookShelf.destroy();
    })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    })
}