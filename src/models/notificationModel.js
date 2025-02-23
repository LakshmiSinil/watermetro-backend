const NotificationSchema = new mongoose.Schema(
  {
    // all filed should  be camelcase
    notificationid: { type: Number, unique: true, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    id: { type: mongoose.Schema.ObjectId, ref: "Employee", required: true },
  },
  // all models should have  timestamps: true
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Notification", NotificationSchema);
