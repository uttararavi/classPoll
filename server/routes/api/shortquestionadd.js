const ShortQuestion = require("../../models/ShortQuestion");

// var url = "mongodb://localhost:27017/class_poll";

module.exports = app => {
  app.post("/api/account/addShortQuestion", (req, res, next) => {
    const { body } = req;
    let { shortQuestionName } = body;

    if (!shortQuestionName) {
      return res.send({
        success: false,
        message: "Error, question can not be blank"
      });
    }
    // console.log("Add course here!!");
    shortQuestionName = shortQuestionName.toLowerCase();

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
          return res.send({
            success: false,
            message: "Question already exists."
          });
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

          return res.send({
            success: true,
            message: "Short Question added!"
          });
        });
      }
    );
  });
};
