'use strict';

const express = require('express');
const router = express.Router();

const Book = require('../models/book');

router.post('/add', (req, res, next) => {
  const title = req.body.items[0].volumeInfo.title;
  const author = req.body.items[0].volumeInfo.title;
  const image = req.body.items[0].volumeInfo.title;

  const data = {
    title,
    author,
    image
  };
  const newBook = Book(data);
  newBook.save()
    .then(() => {
      res.json(newBook);
    })
    .catch(next);
});

module.exports = router;
