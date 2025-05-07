const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
