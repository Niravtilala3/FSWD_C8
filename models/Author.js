const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [100, 'Name must be at most 100 characters long'],
    },
    city: {
        type: String,
    }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('author', authorSchema);        