const mongoose = require("mongoose");

const ProfSessionSchema = new mongoose.Schema({
  profId: {
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

module.exports = mongoose.model("ProfSession", ProfSessionSchema);
