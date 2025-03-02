const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
  fromLocation: { type: String, required: true },
  toLocation: { type: String, required: true },
  status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available"
  }
});


module.exports = mongoose.model("Route", RouteSchema);