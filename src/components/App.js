import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import Header from "./shared/Header";
import Navigation from "./shared/Navigation/Navigation";
import Login from "./auth/Login.Form";
import Signup from "./auth/Signup.Form";

import * as auth from "../api/auth";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUserId: null,
      loading: true
    };

    this.loginUser = this.loginUser.bind(this);
    this.signupUser = this.signupUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  async componentDidMount() {
    const token = window.localStorage.getItem("assignment-tracker-app");

    if (token) {
      const profile = await auth.profile();
      this.setState({ currentUserId: profile._id, loading: false });
    } else {
      this.setState({ loading: false });
    }
  }

  async loginUser(user) {
    const response = await auth.login(user);
    const profile = await auth.profile();
    this.setState({ currentUserId: profile.user._id });
    console.log("### user login:", response, profile);
  }

  async signupUser(user) {
    const response = await auth.signup(user);
    const profile = await auth.profile();
    this.setState({ currentUserId: profile.user._id });
    console.log("### user sign up:", response, profile);
    console.log("Signing Up User:", user);
  }

  logoutUser = () => {
    window.localStorage.removeItem("journal-app");
    this.setState({ currentUserId: null });
  };

  render() {
    if (this.state.loading) return <p>Loading...</p>;
    return (
      <Router>
        <Header />
        <Navigation
          currentUserId={this.state.currentUserId}
          logoutUser={this.logoutUser}
        />
        <Switch>
          <Route
            path="/login"
            exact
            render={() => {
              return this.state.currentUserId ? (
                <Redirect to="/users" />
              ) : (
                <Login onSubmit={this.loginUser} />
              );
            }}
          />
          <Route
            path="/signup"
            exact
            render={() => {
              return this.state.currentUserId ? (
                <Redirect to="/users" />
              ) : (
                <Signup onSubmit={this.signupUser} />
              );
            }}
          />
          {/* <Route
            path="/users"
            render={() => {
              return this.state.currentUserId ? (
                <UsersContainer />
              ) : (
                <Redirect to="/login" />
              );
            }}
          /> */}

          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }
}

export default App;
