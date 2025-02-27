const NotificationSchema = new mongoose.Schema(
  {
    // all filed should  be camelcase
    id: { type: Number, unique: true, required: true },
    message: { type: String, required: true },
    timestamps: true ,
    userId: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
  },
  // all models should have  timestamps: true
  
);

module.exports = mongoose.model("Notification", NotificationSchema);
