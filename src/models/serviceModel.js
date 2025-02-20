const ServiceSchema = new mongoose.Schema({
    sid: { type: Number, unique: true, required: true },
    rid: { type: mongoose.Schema.Types.Number, ref: "Route", required: true },
    bid: { type: mongoose.Schema.Types.Number, ref: "Boat", required: true },
    eid: { type: mongoose.Schema.Types.Number, ref: "Employee", required: true },
  });
  
  module.exports = mongoose.model("Service", ServiceSchema);
  