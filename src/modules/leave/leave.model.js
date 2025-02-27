const mongoose = require('mongoose');
const leaveSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserEmployee', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
});
module.exports = mongoose.model('Leave', leaveSchema);