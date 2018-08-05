'use strict';

const express = require('express');
const router = express.Router();

const Book = require('../models/book');

router.post('/book', (req, res, next) => {
  const book = req.body.book;
  const newBook = Book({
    book
  });
  return newBook.save()
    .then(() => {
      req.body.book = newBook;
      res.json(newBook);
    })
    .catch(next);
});

module.exports = router;
