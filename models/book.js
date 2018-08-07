'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

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
  comments: [{
    type: ObjectId,
    ref: 'User'
  },
  {
    type: String
  }
  ],
  apiBookId: {
    type: String
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
