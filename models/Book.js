const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
      maxlength: [100, 'Title must be at most 100 characters long'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'author',
      required: [true, 'Author is required'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('book', bookSchema);        