import React, { Component } from "react";
import "whatwg-fetch";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Redirect } from "react-router";

import { getFromStorage, setInStorage } from "../../utils/storage";

class ProfHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      signUpError: "",
      signInError: "",
      signInEmail: "",
      signInPassword: "",
      signUpFirstName: "",
      signUpLastName: "",
      signUpPassword: "",
      signUpEmail: "",
      redirect: false
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(
      this
    );
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(
      this
    );
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(
      this
    );
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(
      this
    );
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(
      this
    );
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(
      this
    );

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
    this.setRedirect = this.setRedirect.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/profHome/addCourse" />;
    }
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;

      //Verify the token
      fetch("/api/account/profVerify?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
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

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }

  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value
    });
  }

  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value
    });
  }

  onSignUp() {
    // Grab state
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      redirect
    } = this.state;

    this.setState({
      isLoading: true
    });

    // Post request to backend

    fetch("/api/account/profSignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            /*This is clearing the textbox, 
            but it isn't neccesary, 
            if you're redirectign to a diff page*/
            signUpEmail: "",
            signUpFirstName: "",
            signUpLastName: "",
            signUpPassword: ""
          });
        } else {
        }
      });
  }

  onSignIn() {
    // Grab state
    const { signInEmail, signInPassword } = this.state;

    this.setState({
      isLoading: true
    });

    // Post request to backend

    fetch("/api/account/profSignin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          setInStorage("the_main_app", { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            /*This is clearing the textbox, 
                but it isn't neccesary, 
                if you're redirectign to a diff page*/
            signInEmail: "",
            signInPassword: ""
          });
          // <Redirect to="/profHome" />;
          console.log("Trying to redirect");
          // return <Redirect to="/profHome" />;
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
      isLoading,
      token,
      signInEmail,
      signInError,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpPassword,
      signUpEmail,
      signUpError,
      redirect
    } = this.state;
    if (isLoading) {
      return (
        <div>
          <p> Loading...</p>
        </div>
      );
    }

    if (!token) {
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
          <h1
            style={{
              fontSize: 55,
              fontFamily: "open",
              color: "#504b4a",
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            Welcome Professor!
          </h1>
          <div
            style={{
              // background: "blue",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <div style={{ padding: 30 }}>
              {signInError ? <p>{signInError}</p> : null}
              <p style={{ fontSize: 25, fontFamily: "open", color: "#504b4a" }}>
                Sign In
              </p>
              <br />
              <input
                type="email"
                placeholder="Email"
                value={signInEmail}
                onChange={this.onTextboxChangeSignInEmail}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={this.onTextboxChangeSignInPassword}
              />
              <br />

              <button onClick={this.onSignIn}>Sign In</button>
            </div>
            <br />
            <br />

            <div style={{ padding: 30 }}>
              {signUpError ? <p>{signUpError}</p> : null}
              <p style={{ fontSize: 25, fontFamily: "open", color: "#504b4a" }}>
                Sign Up
              </p>
              <input
                type="text"
                placeholder="First Name"
                value={signUpFirstName}
                onChange={this.onTextboxChangeSignUpFirstName}
              />
              <br />
              <input
                type="text"
                placeholder="Last Name"
                value={signUpLastName}
                onChange={this.onTextboxChangeSignUpLastName}
              />
              <br />
              <input
                type="email"
                placeholder="Email"
                value={signUpEmail}
                onChange={this.onTextboxChangeSignUpEmail}
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={this.onTextboxChangeSignUpPassword}
              />
              <br />
              <button onClick={this.onSignUp}>Sign Up</button>
            </div>
          </div>
        </div>
      );
    }

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
        {this.renderRedirect()}
        <button onClick={this.setRedirect}>Add Course</button>
        <button>My Courses</button>
        <Link to="/profHome/poll">
          <button>Create a Poll</button>
        </Link>
        <button onClick={this.logout}> Logout</button>
      </div>
    );
  }
}

export default ProfHome;
