const RouteSchema = new mongoose.Schema({
    rid: { type: Number, unique: true, required: true },
    startfrom: { type: String, required: true },
    to: { type: String, required: true },
    status: { type: String, default: "Available" },
  });
  
  module.exports = mongoose.model("Route", RouteSchema);
  