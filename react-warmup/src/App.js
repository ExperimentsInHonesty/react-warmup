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
  // state = {
  //   user: false
  // };
  // onLoggedInUser = () => {};

  render() {
    console.log("rendering App");

    return (
      <div>
        <div>
          Go To:{" "}
          <NavLink to="/login">
            <button type="button">Log in</button>
          </NavLink>{" "}
          |{" "}
          {/* {!this.state.user && <NavLink to="/login"><button type="button">Log in</button></NavLink>} */}
          <NavLink to="/home">
            <button type="button">Home</button>
          </NavLink>{" "}
          |{" "}
          <NavLink to="/profile">
            <button type="button">My Profile</button>
          </NavLink>{" "}
          |{" "}
          <NavLink to="/blogs">
            <button type="button">Blogs</button>
          </NavLink>{" "}
          |{" "}
          <NavLink to="/techcompanies">
            <button type="button">Tech Companies</button>
          </NavLink>{" "}
          |{" "}
          <NavLink to="/jobs">
            <button type="button">Jobs</button>
          </NavLink>{" "}
          |{" "}
          <NavLink to="/events">
            <button type="button">Events</button>
          </NavLink>{" "}
          | {/* <NavLink to="/register">Register</NavLink> */}
          <NavLink to="/register">
            <button type="button">Register</button>
          </NavLink>
          {/* this is the image I have not made work yet */}
          {/* {<img src="/logoutIcon.png" width="16px" align="right" />} */}
          {/* this is the code for saving the state which I have not made work yet */}
          {/* {!this.state.user && <NavLink to="/register">Register</NavLink>} */}
          <hr />
        </div>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={HomePage} />
          {/* <Route
            exact
            path="/home"
            render={props => (
              <HomePage {...props} onLoggedInUser={this.loggedInUser} />
            )}
          /> */}
          <Route exact path="/profile" component={MyProfile} />
          <Route exact path="/blogs" component={Blogs} />
          <Route exact path="/techcompanies" component={TechCompanies} />
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="/events" component={Events} />

          <Redirect to="./login" />
        </Switch>

        {/* <Register />  this  has been replaced by Route?*/}
      </div>
    );
  }
}

export default App;
