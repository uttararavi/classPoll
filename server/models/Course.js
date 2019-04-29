const mongoose = require("mongoose");
// var ProfSchema = require("mongoose").model("Prof").schema;
const ProfSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: ""
  },

  lastName: {
    type: String,
    default: ""
  },

  email: {
    type: String,
    default: ""
  },

  password: {
    type: String,
    default: ""
  },

  isDeleted: {
    type: Boolean,
    default: false
  }
});

const ShortQuestionSchema = new mongoose.Schema({
  shortQuestionName: {
    type: String,
    default: ""
  }
});

const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    default: ""
  },
  profIC: ProfSchema,

  shortQS: {
    type: [ShortQuestionSchema],
    default: null
  }
});

module.exports = mongoose.model("Course", CourseSchema);
