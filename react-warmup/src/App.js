import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import HomePage from "./HomePage";
import MyProfile from "./MyProfile";
import Blogs from "./Blogs";
import TechCompanies from "./TechCompanies";
import Jobs from "./Jobs";
import Events from "./Events";

console.log("running App.js!");

class App extends Component {
  render() {
    console.log("rendering App");

    return (
      <div>
        <div>
          Go To: <NavLink to="/login">Log in</NavLink> |{" "}
          <NavLink to="/home">Home</NavLink> |{" "}
          <NavLink to="/profile">My Profile</NavLink> |{" "}
          <NavLink to="/blogs">Blogs</NavLink> |{" "}
          <NavLink to="/techcompanies">Tech Companies</NavLink> |{" "}
          <NavLink to="/jobs">Jobs</NavLink> |{" "}
          <NavLink to="/events">Events</NavLink> |{" "}
          <NavLink to="/register">Register</NavLink>
          <hr />
          {/* Hello, {this.state.firstName.value} */}
        </div>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/profile" component={MyProfile} />
          <Route exact path="/blogs" component={Blogs} />
          <Route exact path="/techcompanies" component={TechCompanies} />
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="events" component={Events} />

          <Redirect to="./login" />
        </Switch>

        {/* <Register />  this  has been replaced by Route?*/}
      </div>
    );
  }
}

export default App;
