'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: Number
  },
  apiBookId: {
    type: String
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
