CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_title VARCHAR(255) NOT NULL,
    book_info VARCHAR(255),
    publisher VARCHAR(255),
    author VARCHAR(128),
    agent VARCHAR(128)
);