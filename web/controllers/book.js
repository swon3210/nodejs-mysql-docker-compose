const Book = require('../models/book');
const BookShelf = require('../models/book_shelf');

// 외부 API 메서드
const kakaoAPI = require('../external_apis/kakao');
const naverAPI = require('../external_apis/naver');


exports.getBooks = (req, res) => {
  
  const bookShelfIdx = req.params.bookShelfIdx;

  BookShelf.findAll({
    where: {
      id: bookShelfIdx
    },
    include: [{
      model: Book,
      through: {
        attributes: ['title', 'description'],
      },
    }]
  })
    .then(bookShelfWithBooks => {
      res.status(200).send(bookShelfWithBooks[0].books);
    })
    .catch(err => {
      console.log(err);
    })
}

exports.searchBooks = (req, res) => {

  kakaoAPI.searchBooks(req, res)
    .then(body => {
      res.status(200).send(body);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end()
    });

}


exports.addBook = (req, res) => {

  const bookShelfIdx = req.body.bookShelfIdx;
  const addingTitle = req.body.title;
  const addingDescription = req.body.description;

  let fetchedBook;

  Book.create({
    title: addingTitle,
    description: addingDescription
  })
    .then(book => {
      fetchedBook = book;
      return BookShelf.findByPk(bookShelfIdx);
    })  
    .then(bookShelf => {
      return bookShelf.addBook(fetchedBook);
    })
    .then(result => {
      res.status(200).send(result)
    })
    .catch(err => {
      res.status(500).end();
      console.log(err);
    });

}

exports.updateBook = (req, res) => {

  const idx = req.body.idx;
  const updatingTitle = req.body.title;
  const updatingDescription = req.body.description;

  Book.findByPk(idx)
    .then(book => {
      book.title = updatingTitle;
      book.description = updatingDescription;
      return book.save();
    })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end()
    })
}

exports.deleteBook = (req, res) => {

  const idx = req.params.idx;

  Book.findByPk(idx)
    .then(book => {
      return book.destroy();
    })
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    })
}