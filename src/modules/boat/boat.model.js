const mongoose = require('mongoose');
const BoatSchema = new mongoose.Schema({
    name: { type: String, required: true },
    routeId: { type: mongoose.Schema.ObjectId, ref: "Route", required: true },
    status: { type: String, default: "active" },
  });
  
  module.exports = mongoose.model("Boat", BoatSchema);
  