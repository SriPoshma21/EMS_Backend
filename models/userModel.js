const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  id: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  salary: { type: Number, required: true },
  role: { type: String , required: true},
  password: { type: String, required: true, minlength: 6 }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
