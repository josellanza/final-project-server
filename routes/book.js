'use strict';

const express = require('express');
const router = express.Router();

const Book = require('../models/book');

router.post('/add', (req, res, next) => {
  const title = req.body.items[0].volumeInfo.title;
  const author = req.body.items[0].volumeInfo.authors;
  const apiBookId = req.body.items[0].id;
  const image = req.body.items[0].volumeInfo.imageLinks.thumbnail;
  const pageCount = req.body.items[0].volumeInfo.pageCount;

  const saleInfo = req.body.items[0].saleInfo;
  const lengthSaleInfo = Object.keys(saleInfo).length;

  Book.findOne({apiBookId}, 'username')
    .then((bookExists) => {
      if (bookExists) {
        Book.findById(bookExists)
          .then((book) => {
            return res.json(book);
          });
      } else if (lengthSaleInfo > 4) {
        const price = req.body.items[0].saleInfo.listPrice.amount;
        const data = {
          title,
          author,
          apiBookId,
          image,
          price,
          pageCount
        };
        const newBook = Book(data);
        return newBook.save()
          .then(() => {
            res.json(newBook);
          })
          .catch(next);
      } else {
        const data = {
          title,
          author,
          apiBookId,
          image,
          pageCount
        };
        const newBook = Book(data);

        return newBook.save()
          .then(() => {
            res.json(newBook);
          })
          .catch(next);
      }
    })
    .catch(next);
});

module.exports = router;
