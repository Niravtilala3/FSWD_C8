const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('User', userSchema);