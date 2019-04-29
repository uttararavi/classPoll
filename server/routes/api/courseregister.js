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
    var tempId;
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
          // return res.send({
          //   success: false,
          //   message: "Course duplicates"
          // });
        }

        const course = courses[0];
        StudentSession.find(
          {
            isDeleted: false
          },
          (err, studentsessions) => {
            if (err) {
            }

            if (studentsessions.length != 1) {
              console.log("Multiple logins");
            }

            const studentsession = studentsessions[0];
            tempId = studentsession.studentId;
            console.log("studentId : ", tempId);

            Student.findOneAndUpdate(
              {
                _id: tempId
              },
              {
                $push: { courses: course }
              },
              null,
              (err, sessions) => {
                if (err) {
                  console.log(err);
                  return res.send({
                    success: false,
                    message: "Error: Server error"
                  });
                }

                return res.send({
                  success: true,
                  message: "Good!"
                });
              }
            );
          }
        );
      }
    );
    console.log("!!!!!!!!!!!!!!!!!");
  });
};
