const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'author',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('book', bookSchema);        