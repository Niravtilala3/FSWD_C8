const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
      uppercase: true,
      trim: true,
      required: [true,'Name is required'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [50, 'Name must be at most 50 characters long'],
    },
    rollNumber: {
      type: Number,
      required: [true,'Roll number is required'],
      unique: true,
      min: [1, 'Roll number must be at least 1'],
      max: [100, 'Roll number must be at most 100'],
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      default: 'Other',
      required: [true, 'Gender is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'Password must contain at least one letter and one number'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Student', studentSchema);  