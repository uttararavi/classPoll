import React, { Component } from "react";
import "whatwg-fetch";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Redirect } from "react-router";

import { getFromStorage, setInStorage } from "../../utils/storage";

class AddCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseName: "",
      courseToDate: "",
      courseFromDate: "",
      isLoading: true,
      redirect: false
    };
    this.logout = this.logout.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
    this.onTextboxChangeCourseName = this.onTextboxChangeCourseName.bind(this);
    this.onTextboxChangeCourseFromDate = this.onTextboxChangeCourseFromDate.bind(
      this
    );
    this.onTextboxChangeCourseToDate = this.onTextboxChangeCourseToDate.bind(
      this
    );
    this.onAddCourse = this.onAddCourse.bind(this);
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/init" />;
    }
  }

  onAddCourse() {}
  onTextboxChangeCourseName(event) {
    console.log("!");
  }

  onTextboxChangeCourseFromDate(event) {
    console.log("!");
  }

  onTextboxChangeCourseToDate(event) {
    console.log("!");
  }

  logout() {
    console.log("!");
    this.setState({
      isLoading: true
    });
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;

      //Verify the token
      fetch("/api/account/logout?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: "",
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }

    this.setRedirect();
    console.log("!!");
  }
  render() {
    const {
      isLoading,
      courseName,
      courseFromDate,
      courseToDate,
      redirect
    } = this.state;
    return (
      <div
        style={{
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          position: "absolute",
          background: "#d6cfce",
          textAlign: "center",
          padding: 30
        }}
      >
        <h1
          style={{
            fontSize: 35,
            fontFamily: "open",
            color: "#504b4a",
            fontWeight: "bold",
            textAlign: "center"
          }}
        >
          ADD COURSE PAGE
        </h1>
        <div
          style={{
            // background: "blue",
            display: "flex",
            justifyContent: "center",
            padding: 30
          }}
        >
          <input
            type="text"
            placeholder="Course Name"
            value={courseName}
            onChange={this.onTextboxChangeCourseName}
          />
          <br /> <br />
          <input
            type="text"
            placeholder="From Date"
            value={courseFromDate}
            onChange={this.onTextboxChangeCourseFromDate}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="To Date"
            value={courseToDate}
            onChange={this.onTextboxChangeCourseToDate}
          />
          <br />
          <button onClick={this.onAddCourse}>Add Course</button>
        </div>

        <div style={{ padding: 30 }}>
          {this.renderRedirect()}
          <button onClick={this.logout}> Logout</button>
        </div>
      </div>
    );
  }
}

export default AddCourse;
