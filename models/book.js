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
  year: {
    type: Number
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
