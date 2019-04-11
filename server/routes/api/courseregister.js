// const Course = require("../../models/Course");

// module.exports = app => {
//   app.get("/api/account/displayCourses", (req, res, next) => {
//     Course.find({}, (err, sessions) => {
//       if (err) {
//         console.log(err);
//         return res.send({
//           success: false,
//           message: "Error: Server error, no courses"
//         });
//       } else {
//         return res.send({
//           success: true,
//           message: "Good!"
//         });
//       }
//     });
//   });
// };

// var express = require("express");
// var router = express.Router();
// var mongo = require("mongodb");
// var assert = require("assert");

// var url = "mongodb://localhost:27017/class_poll";

// module.exports = app => {
//   router.get("/api/account/displayCourses", function(req, res, next) {
//     var resultArray = [];
//     mongo.connect(url, function(err, db) {
//       assert.equal(null, err);

//       var cursor = db.collection("courses").find();
//       cursor.forEach(
//         function(doc, err) {
//           assert.equal(null, err);
//           resultArray.push(doc);
//         },
//         function() {
//           db.close();
//           res.render("/studentHome/courseCatalog", { items: resultArray });
//         }
//       );
//     });
//   });
// };
// import express from "express";
const express = require("express");
// const app = express();

const Course = require("../../models/Course");

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
};
