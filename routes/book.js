'use strict';

const express = require('express');
const router = express.Router();

const Book = require('../models/book');

router.post('/comment', (req, res, next) => {
  const bookId = req.body.book._id;
  const comment = req.body.comment;
  const user = req.session.currentUser.username;
  Book.findById(bookId)
    .then((result) => {
      result.comments.push({body: comment, owner: user});
      result.save()
        .then((result) => {
          res.json(result);
        });
    })
    .catch(next);
});

router.post('/score', (req, res, next) => {
  const bookId = req.body.book._id;
  const score = req.body.score;

  Book.findById(bookId)
    .then((result) => {
      result.votes.push(score);

      let sum = result.votes.reduce((a, b) => {
        return a + b;
      });
      result.average = Math.round((sum / result.votes.length) * 10) / 10;
      result.save()
        .then((result) => {
          res.json(result);
        });
    }).catch(next);
});

router.get('/get', (req, res, next) => {
  Book.find().limit(24)
    .then((data) => {
      return res.json(data);
    })
    .catch(next);
});

router.post('/add', (req, res, next) => {
  const title = req.body.items[0].volumeInfo.title;
  const author = req.body.items[0].volumeInfo.authors;
  const apiBookId = req.body.items[0].id;
  const image = req.body.items[0].volumeInfo.imageLinks.thumbnail;
  const pageCount = req.body.items[0].volumeInfo.pageCount;

  const volumeInfo = req.body.items[0].volumeInfo;
  const lengthVolumeInfo = Object.keys(volumeInfo).length;

  const saleInfo = req.body.items[0].saleInfo;
  const lengthSaleInfo = Object.keys(saleInfo).length;

  Book.findOne({apiBookId})
    .then((bookExists) => {
      if (bookExists) {
        Book.findById(bookExists)
          .then((book) => {
            return res.json(book);
          });
      } else if (lengthSaleInfo > 4 && lengthVolumeInfo > 15) {
        const price = req.body.items[0].saleInfo.listPrice.amount;
        const publishedDate = req.body.items[0].volumeInfo.publishedDate;
        const publisher = req.body.items[0].volumeInfo.publisher;
        const data = {
          title,
          author,
          apiBookId,
          image,
          price,
          pageCount,
          publishedDate,
          publisher
        };
        const newBook = Book(data);
        return newBook.save()
          .then(() => {
            res.json(newBook);
          })
          .catch(next);
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
      } else if (lengthVolumeInfo > 15) {
        const publishedDate = req.body.items[0].volumeInfo.publishedDate;
        const publisher = req.body.items[0].volumeInfo.publisher;
        const data = {
          title,
          author,
          apiBookId,
          image,
          pageCount,
          publishedDate,
          publisher
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
