const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
  status: {
    type: String,
    enum: ["confirmed", "cancelled", "used"], default: "confirmed"
  },
  ispaid: { type: Boolean, default: false },
  routeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Route', required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  passengerCount: { type: Number, required: true, default: 1 },
  type: {
    type: String,
    enum: ["one-way"],
    default: "one-way"
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", BookingSchema);
