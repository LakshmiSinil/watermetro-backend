const mongoose = require('mongoose');
const NotificationSchema = new mongoose.Schema(
  {
    // all filed should  be camelcase
    _id: { type: Number, unique: true, required: true },
    message: { type: String, required: true },
    userId: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
  },{timestamps:true}
  // all models should have  timestamps: true
  
);

module.exports = mongoose.model("Notification", NotificationSchema);
