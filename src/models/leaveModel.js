const LeaveSchema = new mongoose.Schema({
    lid: { type: Number, unique: true, required: true },
    eid: { type: mongoose.Schema.Types.Number, ref: "Employee", required: true },
    reason: { type: String, required: true },
    status: { type: String, default: "Pending" },
    from_date: { type: Date, required: true },
    to_date: { type: Date, required: true },
    no_of_dates: { type: Number, required: true },
  });
  
  module.exports = mongoose.model("Leave", LeaveSchema);
  