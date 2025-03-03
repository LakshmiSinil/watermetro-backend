const mongoose = require('mongoose');
const ServiceSchema = new mongoose.Schema({
  // all users ref should be changed to user employee
  routeId: { type: mongoose.Schema.ObjectId, ref: "Route", required: true },
  boatId: { type: mongoose.Schema.ObjectId, ref: "Boat", required: true },
  time: { type: String, required: true }
});

module.exports = mongoose.model("Service", ServiceSchema);
