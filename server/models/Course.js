const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// var ProfSchema = require("mongoose").model("Prof").schema;
const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    default: ""
  }

  // profIC: {
  //   type: ProfSchema
  // }
});

module.exports = mongoose.model("Course", CourseSchema);
