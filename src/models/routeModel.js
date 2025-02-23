const RouteSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.ObjectId, unique: true, required: true },
  from_location: { type: String, required: true },
  to_location: { type: String, required: true },
  // make status enum
  status: { type: String, default: "available" },
});

module.exports = mongoose.model("Route", RouteSchema);
