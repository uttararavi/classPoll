import React, { Component } from "react";
import "whatwg-fetch";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Redirect } from "react-router";

import { getFromStorage, setInStorage } from "../../utils/storage";

class AddCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toAddCourseName: "",
      addCourseError: "",
      redirect: false
    };

    this.onTextboxChangeCourseName = this.onTextboxChangeCourseName.bind(this);
    this.onAddCourse = this.onAddCourse.bind(this);
    this.logout = this.logout.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  onTextboxChangeCourseName(event) {
    this.setState({
      toAddCourseName: event.target.value
    });
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/profHome/addCourse/temp" />;
    }
  }

  onAddCourse() {
    const { toAddCourseName } = this.state;

    // post request to backend

    fetch("/api/account/addCourse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        courseName: toAddCourseName
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          this.setState({
            addCourseError: json.message,
            isLoading: false,
            /*This is clearing the textbox, 
            but it isn't neccesary, 
            if you're redirectign to a diff page*/
            toAddCourseName: ""
          });
        } else {
        }
      });
  }

  logout() {
    this.setState({
      isLoading: true
    });
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;

      //Verify the token
      fetch("/api/account/profLogout?token=" + token)
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

    // this.setRedirect;
  }

  render() {
    const { toAddCourseName, addCourseError } = this.state;
    return (
      <div
        style={{
          top: "0",
          bottom: "0",
          left: "0",
          right: "0",
          position: "absolute",
          background: "#d6cfce",
          textAlign: "center"
        }}
      >
        <input
          type="text"
          placeholder="Course Name"
          value={toAddCourseName}
          onChange={this.onTextboxChangeCourseName}
        />
        <br />
        <button onClick={this.onAddCourse}>Add Course</button>
        <Link to="/profHome">
          <button>Home</button>
        </Link>
        <Link to="/init">
          <button onClick={this.logout}> Logout</button>
        </Link>

        {/* <button onClick={this.setRedirect}> Redirect</button> */}

        {addCourseError ? <p>{addCourseError}</p> : null}
      </div>
    );
  }
}

export default AddCourse;
