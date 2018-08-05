'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  book: [{}]
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
