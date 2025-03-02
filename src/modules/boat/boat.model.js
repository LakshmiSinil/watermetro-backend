const mongoose = require('mongoose');
const BoatSchema = new mongoose.Schema({
  // all table id should be just id
    _id: { type: mongoose.Types.ObjectId, unique: true, required: true },
    name: { type: String, required: true },
    routeId: { type: mongoose.Schema.ObjectId, ref: "Route", required: true },
    status: { type: String, default: "active" },
  });
  
  module.exports = mongoose.model("Boat", BoatSchema);
  