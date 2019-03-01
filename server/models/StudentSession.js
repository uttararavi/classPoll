const mongoose = require("mongoose");

const StudentSessionSchema = new mongoose.Schema({
  studentId: {
    type: String,
    default: ""
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("StudentSession", StudentSessionSchema);
