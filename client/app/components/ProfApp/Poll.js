import React, { Component } from "react";
import "whatwg-fetch";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Redirect } from "react-router";

import { getFromStorage, setInStorage } from "../../utils/storage";

class Poll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };

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
      return <Redirect to="/profHome/postShortQuestion" />;
    }
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
    const { redirect } = this.state;
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
        <div>
          {this.renderRedirect()}
          <button onClick={this.setRedirect}>Short question</button>
        </div>
        <Link to="/profHome">
          <button>Home</button>
        </Link>
        <Link to="/init">
          <button onClick={this.logout}> Logout</button>
        </Link>
      </div>
    );
  }
}

export default Poll;
