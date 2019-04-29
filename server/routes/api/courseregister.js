const express = require("express");
// const app = express();

const Course = require("../../models/Course");
const StudentSession = require("../../models/StudentSession");
const Student = require("../../models/Student");
module.exports = app => {
  app.get("/api/account/displayCourses", (req, res) => {
    Course.find(function(err, courses) {
      if (err) {
        console.log(err);
      } else {
        return res.json(courses);
      }
    });
  });

  app.post("/api/account/registerToCourse", (req, res) => {
    const { body } = req;
    let { courseName } = body;
    console.log("course Name");
    console.log(courseName);

    if (!courseName) {
      return res.send({
        success: false,
        message: "Error, course name can not be blank"
      });
    }

    courseName = courseName.toLowerCase();

    Course.find(
      {
        courseName: courseName
      },
      (err, courses) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        } else if (courses.length > 0) {
          return res.send({
            success: false,
            message: "Course duplicates"
          });
        }

        StudentSession.find({
          isDeleted: false
        });
      }
    );
    console.log("!!!!!!!!!!!!!!!!!");
  });
};
