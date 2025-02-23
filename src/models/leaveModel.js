const LeaveSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true },
    userId: { type: mongoose.Schema.ObjectId, ref: "Employee", required: true },
    reason: { type: String, required: true },
    status: { type: String, default: "Pending" },
    from_date: { type: Date, required: true },
    to_date: { type: Date, required: true },
   
  });
  
  module.exports = mongoose.model("Leave", LeaveSchema);
  