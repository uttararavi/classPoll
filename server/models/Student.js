const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

  shortQS: ShortQuestionSchema
});

const StudentSchema = new mongoose.Schema({
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
  },

  courses: {
    type: [CourseSchema],
    default: null
  }
});

StudentSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

StudentSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("Student", StudentSchema);
