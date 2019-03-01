const Student = require("../../models/Student");
const StudentSession = require("../../models/StudentSession");

module.exports = app => {
  /*
    Signup
  */

  app.post("/api/account/studentSignup", (req, res, next) => {
    const { body } = req;
    const { firstName, lastName, password } = body;
    let { email } = body;

    if (!firstName) {
      return res.send({
        success: false,
        message: "Error, First name can not be blank"
      });
    }

    if (!lastName) {
      return res.send({
        success: false,
        message: "Error, Last name can not be blank"
      });
    }

    if (!email) {
      return res.send({
        success: false,
        message: "Error, First name can not be blank"
      });
    }

    if (!password) {
      return res.send({
        success: false,
        message: "Error, Password cannot be blank"
      });
    }

    console.log("Here!");
    email = email.toLowerCase();

    // Steps
    // 1. Verify email doesnt exist already
    // 2. Save

    Student.find(
      {
        email: email
      },
      (err, previousStudents) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        } else if (previousStudents.length > 0) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }

        // Save the new student
        const newStudent = new Student();
        newStudent.email = email;
        newStudent.firstName = firstName;
        newStudent.lastName = lastName;
        newStudent.password = newStudent.generateHash(password);
        newStudent.save((err, student) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: Server error"
            });
          }

          return res.send({
            success: true,
            message: "Signed up!"
          });
        });
      }
    );
  });

  app.post("/api/account/studentSignin", (req, res, next) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;

    if (!email) {
      return res.send({
        success: false,
        message: "Error, Email can not be blank"
      });
    }

    if (!password) {
      return res.send({
        success: false,
        message: "Error, Password cannot be blank"
      });
    }

    email = email.toLowerCase();

    Student.find(
      {
        email: email
      },
      (err, students) => {
        if (err) {
          console.log("err 2: ", err);
          return res.send({
            success: false,
            message: "Error, server error"
          });
        }

        if (students.length != 1) {
          return res.send({
            success: false,
            message: "Error, Invalid Email"
          });
        }

        const student = students[0];

        if (!student.validPassword(password)) {
          return res.send({
            success: false,
            message: "Error, Invalid Password"
          });
        }

        // Otherwise correct student session

        const studentSession = new StudentSession();

        studentSession.studentId = student._id;
        studentSession.save((err, doc) => {
          if (err) {
            console.log(err);
            return res.send({
              success: false,
              message: "Error, server error"
            });
          }

          return res.send({
            success: true,
            message: "Valid Signin",
            token: doc._id
          });
        });
      }
    );
  });

  app.get("/api/account/studentVerify", (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // Verify the token is one of a kind

    StudentSession.find(
      {
        _id: token,
        isDeleted: false
      },
      (err, sessions) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        }

        if (sessions.length != 1) {
          return res.send({
            success: false,
            message: "Error: Invalid"
          });
        } else {
          return res.send({
            success: true,
            message: "Good!"
          });
        }
      }
    );
  });

  app.get("/api/account/studentLogout", (req, res, next) => {
    // Get the token
    const { query } = req;
    const { token } = query;
    // Verify the token is one of a kind

    StudentSession.findOneAndUpdate(
      {
        _id: token,
        isDeleted: false
      },
      {
        $set: { isDeleted: true }
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
  });
};
