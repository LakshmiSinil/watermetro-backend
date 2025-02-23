
const ServiceSchema = new mongoose.Schema({
  // all users ref should be changed to user employee
  id: { type: mongoose.Schema.ObjectId, ref: "Employee", required: true },
  serviceId: { type: Number, unique: true, required: true },
  routeId: { type: mongoose.Schema.ObjectId, ref: "Route", required: true },
  boatId: { type: mongoose.Schema.ObjectId, ref: "Boat", required: true },
});

module.exports = mongoose.model("Service", ServiceSchema);
