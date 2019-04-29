const Course = require("../../models/Course");
const ProfSession = require("../../models/ProfSession");
const Prof = require("../../models/Prof");

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

    var tempId;
    ProfSession.find(
      {
        isDeleted: false
      },
      (err, profsessions) => {
        if (err) {
        }

        if (profsessions.length != 1) {
          console.log("Multiple logins");
        }

        const profsession = profsessions[0];
        tempId = profsession.profId;
        console.log("profId : ", tempId);

        Prof.findById(tempId)
          .exec()
          .then(prof => {
            // console.log(prof);

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
                newCourse.profIC = prof;
                console.log("newCourse.profIC", newCourse.profIC);
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
      }
    );
  });
};
