const mongoose = require("mongoose");
const ShortQuestionSchema = new mongoose.Schema({
  shortQuestionName: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("ShortQuestion", ShortQuestionSchema);
