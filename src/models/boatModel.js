const BoatSchema = new mongoose.Schema({
    bid: { type: Number, unique: true, required: true },
    bname: { type: String, required: true },
    rid: { type: mongoose.Schema.Types.Number, ref: "Route", required: true },
    status: { type: String, default: "Active" },
  });
  
  module.exports = mongoose.model("Boat", BoatSchema);
  