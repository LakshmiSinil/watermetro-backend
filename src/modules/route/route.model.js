const mongoose = require('mongoose');

const RouteSchema = new mongoose.Schema({
  fromLocation: { type: String, required: true },
  toLocation: { type: String, required: true },
});


module.exports = mongoose.model("Route", RouteSchema);