const mongoose = require('mongoose');

const BoatSchema = new mongoose.Schema({
    name: { type: String, required: true },
    routeId: { type: mongoose.Schema.ObjectId, ref: "Route", required: true },
    userid: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available"
    }
  });
  
  module.exports = mongoose.model("Boat", BoatSchema);
  