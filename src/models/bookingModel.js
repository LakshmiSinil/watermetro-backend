const BookingSchema = new mongoose.Schema({
    boid: { type: Number, unique: true, required: true },
    pid: { type: mongoose.Schema.Types.Number, ref: "Public", required: true },
    status: { type: String, default: "Pending" },
    from_location: { type: String, required: true },
    to_location: { type: String, required: true },
  });
  
  module.exports = mongoose.model("Booking", BookingSchema);
  