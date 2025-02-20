const NotificationSchema = new mongoose.Schema({
    nid: { type: Number, unique: true, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    eid: { type: mongoose.Schema.Types.Number, ref: "Employee", required: true },
  });
  
  module.exports = mongoose.model("Notification", NotificationSchema);
  