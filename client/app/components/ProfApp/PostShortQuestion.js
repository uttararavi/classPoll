import React, { Component } from "react";
import "whatwg-fetch";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
// import { Redirect } from "react-router";

import { getFromStorage, setInStorage } from "../../utils/storage";

class PostShortQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toPostShortQuestion: "",
      addShortQuestionError: "",
      toAddRelatedCourse: ""
    };
    this.onTextboxChangePostShortQuestion = this.onTextboxChangePostShortQuestion.bind(
      this
    );
    this.onTextboxChangeRelatedCourse = this.onTextboxChangeRelatedCourse.bind(
      this
    );
    this.logout = this.logout.bind(this);
    this.onPostQuestion = this.onPostQuestion.bind(this);
  }

  onTextboxChangePostShortQuestion(event) {
    this.setState({
      toPostShortQuestion: event.target.value
    });
  }

  onTextboxChangeRelatedCourse(event) {
    this.setState({
      toAddRelatedCourse: event.target.value
    });
  }

  onPostQuestion() {
    // add the question in the database
    console.log("Tried adding a question!");
    const { toPostShortQuestion, toAddRelatedCourse } = this.state;
    // post request to backend
    fetch("/api/account/addShortQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        shortQuestionName: toPostShortQuestion,
        courseName: toAddRelatedCourse
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          this.setState({
            addShortQuestionError: json.message,
            isLoading: false,
            /*This is clearing the textbox, 
            but it isn't neccesary, 
            if you're redirectign to a diff page*/
            toPostShortQuestion: "",
            toAddRelatedCourse: ""
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
  }

  render() {
    const {
      toPostShortQuestion,
      addShortQuestionError,
      toAddRelatedCourse
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
          textAlign: "center"
        }}
      >
        <textarea
          style={{ width: 300, height: 80 }}
          multiline="true"
          type="text"
          placeholder="Short Question"
          value={toPostShortQuestion}
          onChange={this.onTextboxChangePostShortQuestion}
        />
        <input
          type="text"
          placeholder="Related Course"
          value={toAddRelatedCourse}
          onChange={this.onTextboxChangeRelatedCourse}
        />

        <button onClick={this.onPostQuestion}>Post</button>
        <Link to="/profHome">
          <button>Home</button>
        </Link>
        <Link to="/init">
          <button onClick={this.logout}>Logout</button>
        </Link>
        {addShortQuestionError ? <p>{addShortQuestionError}</p> : null}
        {/* {(addShortQuestionError = "")} */}
        <br />
      </div>
    );
  }
}

export default PostShortQuestion;
