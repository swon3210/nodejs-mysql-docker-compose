const express = require('express');

const userController = require('../controllers/user');
const bookController = require('../controllers/book');
const bookShelfController = require('../controllers/book_shelf');
const libraryController = require('../controllers/library');
const postController = require('../controllers/post');

const router = express.Router();

// ------------- USER

// 모든 사용자들의 정보를 불러옵니다
router.get('/users', userController.getUsers);

// 특정 사용자의 정보를 찾아서 불러옵니다
router.get('/user/:userIdx', userController.findUser);

// 특정 사용자를 추가합니다

// 특정 사용자의 정보를 업데이트 합니다

// 특정 사용자의 정보를 삭제합니다(탈퇴)


// ------------- Library

// 사용자의 도서관의 정보를 불러옵니다
router.get('/library/:userIdx', libraryController.getLibrary);

// 사용자의 도서관을 제정합니다
router.post('/library', libraryController.createLibrary);

// 사용자의 도서관의 정보를 업데이트 합니다
router.put('/library', libraryController.updateLibrary
);


// ------------- BOOKSHELF

// 사용자의 도서관에 있는 모든 책장을 불러옵니다
router.get('/bookShelves/:libraryIdx', bookShelfController.getBookShelves);

// 전체 책장들 중에서 검색 조건을 만족하는 책장을 불러옵니다
router.get('/bookShelves/search/options',bookShelfController.searchBookShelves);

// 사용자의 도서관에 새로운 책장을 저장합니다
router.post('/bookShelf', bookShelfController.createBookShelf);

// 사용자의 도서관에 있는 특정한 책장의 정보를 업데이트 합니다
router.put('/bookShelf', bookShelfController.updateBookShelf);

// 사용자의 도서관에 있는 특정한 책장을 지웁니다.
router.delete('/bookShelf/:idx', bookShelfController.deleteBookShelf);



// ------------- BOOK

// 사용자의 도서관의 특정 책장에서 모든 책들을 불러옵니다
router.get('/books/:bookShelfIdx', bookController.getBooks);

// 외부의 책들 중 조건을 만족하는 책을 검색합니다
router.get('/books/search/options', bookController.searchBooks);

// 책을 새로 사용자의 도서관의 책장에 저장합니다
router.post('/book', bookController.addBook);

// 사용자의 도서관의 책장에서 특정 책을 업데이트 합니다
router.put('/book', bookController.updateBook);

// 사용자의 도서관의 책장에서 특정 책을 삭제합니다
router.delete('/book/:idx', bookController.deleteBook);






// ------------- POST

// 모든 글들을 가져옵니다
router.get('/posts', postController.getPosts);

// 특정 사용자가 특정 책에 대해 쓴 글들을 사용자 혹은 책을 바탕으로 검색해서 가져옵니다
router.get('/posts/search', postController.searchPosts);

// 특정 사용자의 특정 책에 대한 글을 추가합니다. 
router.post('/post', postController.addPost);

// 특정 사용자의 특정 책에 대한 글을 업데이트 합니다
router.put('/post', postController.updatePost);

// 특정 사용자의 특정 책에 대한 글을 삭제합니다
router.delete('/post/:idx', postController.deletePost);

module.exports = router;
