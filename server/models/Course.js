const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("Course", CourseSchema);
