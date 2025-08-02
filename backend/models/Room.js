const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: String,
  price: Number,
  roomType: String,
  size: String,
  bed: String,
  bathroom: String,
  view: String,
  connectivity: String,
  entertainment: String,
  amenities: [String],
  services: [String],
  image: String,
  bookings: [
    {
      checkIn: Date,
      checkOut: Date,
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('rooms', roomSchema);
