'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String
  },
  author: [{
    type: String
  }],
  image: {
    type: String
  },
  price: {
    type: Number
  },
  pageCount: {
    type: Number
  },
  publishedDate: {
    type: String
  },
  publisher: {
    type: String
  },
  votes: [{
    type: Number
  }],
  average: {
    type: String,
    default: '-'
  },
  comments: [{
    type: String
  }],
  apiBookId: {
    type: String
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
