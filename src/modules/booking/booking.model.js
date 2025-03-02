const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  _id: { type: Number, unique: true, required: true },
  userId: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"], default: "pending"
  },
  from_location: { type: String, required: true },
  to_location: { type: String, required: true },
});

module.exports = mongoose.model("Booking", BookingSchema);
