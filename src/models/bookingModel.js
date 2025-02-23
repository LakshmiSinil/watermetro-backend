const BookingSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  userId: { type: mongoose.Schema.ObjectId, ref: "Public", required: true },
  status: { type: String, default: "Pending" },
  from_location: { type: String, required: true },
  to_location: { type: String, required: true },
});

module.exports = mongoose.model("Booking", BookingSchema);
