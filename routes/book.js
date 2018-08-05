'use strict';

const express = require('express');
const router = express.Router();

const Book = require('../models/book');

router.post('/', (req, res, next) => {
  const book = req.body.book.kind;
  const newBook = Book({
    book
  });
  newBook.save()
    .then(() => {
      req.book = newBook;
      res.json(newBook);
    })
    .catch(next);
});

module.exports = router;
