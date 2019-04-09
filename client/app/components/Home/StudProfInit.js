import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import DatePicker from "react-datepicker";
require("react-datetime");
class StudProfInit extends Component {
  render() {
    return (
      <div
        style={{
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          position: "absolute",
          background: "#d6cfce"
        }}
      >
        <div style={{ height: 140, width: 1300 }} />
        <div
          style={{
            width: 1300,
            height: 70,
            display: "flex",
            justifyContent: "center"
          }}
        >
          <h1
            style={{
              fontSize: 35,
              fontFamily: "open",
              color: "#504b4a",
              fontWeight: "bold"
            }}
          >
            Birla Institute of Technology and Science
          </h1>
        </div>
        <div style={{ height: 20, width: 1300 }} />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link to="/studentHome">
            <button>Student</button>
          </Link>
          <Link to="/profHome">
            <button>Faculty</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default StudProfInit;
