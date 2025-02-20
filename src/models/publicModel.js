const PublicSchema = new mongoose.Schema({
    pid: { type: Number, unique: true, required: true },
    name: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
  });
  
  module.exports = mongoose.model("Public", PublicSchema);
  