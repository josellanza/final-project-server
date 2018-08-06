'use strict';

const express = require('express');
const router = express.Router();

const Book = require('../models/book');

router.post('/add', (req, res, next) => {
  const book = req.body.kind;

  const newBook = Book({book});
  newBook.save()
    .then(() => {
      res.json(newBook);
    })
    .catch(next);
});

module.exports = router;
