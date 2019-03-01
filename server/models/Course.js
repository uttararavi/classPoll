const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    default: ""
  },

  lcourseId: {
    type: String,
    default: ""
  },

  isDeleted: {
    type: Boolean,
    default: false
  }
});

// check if course exists

// CourseSchema.methods.generateHash = function(password) {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

// CourseSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.password);
// };

module.exports = mongoose.model("Course", CourseSchema);
