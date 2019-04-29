const ShortQuestion = require("../../models/ShortQuestion");
const ProfSession = require("../../models/ProfSession");
const Prof = require("../../models/Prof");
const Course = require("../../models/Course");
// var url = "mongodb://localhost:27017/class_poll";

module.exports = app => {
  app.post("/api/account/addShortQuestion", (req, res, next) => {
    const { body } = req;
    let { shortQuestionName, courseName } = body;

    if (!shortQuestionName) {
      return res.send({
        success: false,
        message: "Error, question can not be blank"
      });
    }
    if (!courseName) {
      return res.send({
        success: false,
        message: "Error, course name can not be blank"
      });
    }
    // console.log("Add course here!!");
    shortQuestionName = shortQuestionName.toLowerCase();
    courseName = courseName.toLowerCase();
    var tempId;

    ShortQuestion.find(
      {
        shortQuestionName: shortQuestionName
      },
      (err, previousShortQuestions) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error"
          });
        } else if (previousShortQuestions.length > 0) {
          // return res.send({
          //   success: false,
          //   message: "Question already exists."
          // });
          // don't do anything, repeated qs are fine
        }

        // Save new ShortQuestion
        const newShortQuestion = new ShortQuestion();
        newShortQuestion.shortQuestionName = shortQuestionName;
        newShortQuestion.save((err, shortQuestion) => {
          if (err) {
            return res.send({
              success: false,
              message: "Error: Server error"
            });
          }

          Course.findOneAndUpdate(
            {
              courseName: courseName
            },
            {
              // $set: { shortQS: newShortQuestion }
              $push: { shortQS: newShortQuestion }
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

          return res.send({
            success: true,
            message: "Short Question added!"
          });
        });
      }
    );
  });
};
