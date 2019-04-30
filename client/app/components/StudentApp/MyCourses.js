import React, { Component } from "react";
import "whatwg-fetch";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Redirect } from "react-router";

class MyCourses extends Component {
  constructor() {
    super();
    this.state = {
      data: null
    };
    this.logout = this.logout.bind(this);
    // this.onEnroll = this.onEnroll.bind(this);
    this.getData();
  }

  logout() {
    this.setState({
      isLoading: true
    });
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;

      //Verify the token
      fetch("/api/account/studentLogout?token=" + token)
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
  getData() {
    let data = fetch("/api/account/displayMyCourses").then(res => {
      //   console.log(res);
      res.json().then(res => {
        // console.log(res);
        this.setState({ data: res });
      });
    });
  }

  //   onEnroll(id) {
  //     // const { toRegisterCourseName } = this.state;
  //     console.log(id);
  //     var toRegisterCourseName = id;
  //     console.log(toRegisterCourseName);
  //     fetch("/api/account/registerToCourse", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         courseName: toRegisterCourseName
  //       })
  //     })
  //       .then(res => res.json())
  //       .then(json => {
  //         console.log("json", json);
  //         if (json.success) {
  //           this.setState({
  //             toRegisterCourseName: ""
  //           });
  //         } else {
  //         }
  //       });
  //   }

  render() {
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
        {this.state.data ? (
          // var tempFunc = this.onEnroll(item.courseName);
          this.state.data.map(item => (
            <div>
              <h3>{item.courseName}</h3>
              {/* <button onClick={() => this.onEnroll(item.courseName)}>
                Enroll!
              </button> */}
            </div>
          ))
        ) : (
          <h3>Wait... data is being fetched</h3>
        )}
        <div
          style={{ padding: 20, height: 50, width: 100, textAlign: "center" }}
        >
          <Link to="/init">
            <button onClick={this.logout}> Logout</button>
          </Link>
          <Link to="/studentHome">
            <button> Home</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default MyCourses;
