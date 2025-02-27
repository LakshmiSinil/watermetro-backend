
const ServiceSchema = new mongoose.Schema({
  // all users ref should be changed to user employee
  userid: { type: mongoose.Schema.ObjectId, ref: "userEmployee", required: true },
  id: { type: Number, unique: true, required: true },
  routeId: { type: mongoose.Schema.ObjectId, ref: "Route", required: true },
  boatId: { type: mongoose.Schema.ObjectId, ref: "Boat", required: true },
});

module.exports = mongoose.model("Service", ServiceSchema);
