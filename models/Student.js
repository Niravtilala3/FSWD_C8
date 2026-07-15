const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
    },
    rollNumber: {
      type: Number,
      required: true,
      unique: true
    },
    address: {
      type: String,
    }
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Student', studentSchema);  