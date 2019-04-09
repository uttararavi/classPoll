import React from "react";
import { render } from "react-dom";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import App from "./components/App/App";
import NotFound from "./components/App/NotFound";

import StudentHome from "./components/Home/StudentHome";
import ProfHome from "./components/Home/ProfHome";

import HelloWorld from "./components/HelloWorld/HelloWorld";

import StudProfInit from "./components/Home/StudProfInit";

// import CourseCatalog from "./components/StudentApp/CourseCatalog";

import "./styles/styles.scss";
import AddCourse from "./components/ProfApp/AddCourse";

render(
  <Router>
    <App>
      <Switch>
        <Route exact path="/studentHome" component={StudentHome} />
        <Route exact path="/profHome" component={ProfHome} />
        <Route path="/helloworld" component={HelloWorld} />
        <Route path="/init" component={StudProfInit} />
        <Route path="/profHome/addCourse" component={AddCourse} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>,
  document.getElementById("app")
);
