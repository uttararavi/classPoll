const Course = require("../../models/Course");

// var url = "mongodb://localhost:27017/class_poll";

module.exports = app => {
  app.post("/api/account/addCourse", (req, res, next) => {
    const { body } = req;
    // const { courseName } = body;
    let { courseName } = body;

    if (!courseName) {
      return res.send({
        success: false,
        message: "Error, Course name can not be blank"
      });
    }
    // console.log("Add course here!!");
    courseName = courseName.toLowerCase();

    Course.find(
      {
        courseName: courseName
      },
      (err, previousCourses) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        } else if (previousCourses.length > 0) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }

        // Save new course
        const newCourse = new Course();
        newCourse.courseName = courseName;
        newCourse.save((err, course) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: Server error"
            });
          }

          return res.send({
            success: true,
            message: "Course added!"
          });
        });
      }
    );
  });
};
