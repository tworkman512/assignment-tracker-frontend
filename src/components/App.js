import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import Header from "./shared/Header";
import Navigation from "./shared/Navigation/Navigation";
import FormContainer from "./auth/Container.Form";
import Login from "./auth/Login.Form";
import Signup from "./auth/Signup.Form";

import AssignmentsContainer from "./assignments/Container";
import StudentsContainer from "./students/Container";

import * as auth from "../api/auth";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUserId: null,
      currentUser: null,
      currentUserAssignments: null,
      isAdmin: null,
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
      this.setState({
        currentUserId: profile._id,
        currentUser: profile,
        currentUserAssignments: profile.assignments,
        isAdmin: profile.admin,
        loading: false
      });
    } else {
      this.setState({ loading: false });
    }
  }

  async loginUser(user) {
    const response = await auth.login(user);
    const profile = await auth.profile();
    this.setState({
      currentUserId: profile.user._id,
      currentUser: profile.user,
      currentUserAssignments: profile.user.assignments,
      isAdmin: profile.user.admin
    });
    console.log("### user login:", response, profile);
  }

  async signupUser(user) {
    const response = await auth.signup(user);
    const profile = await auth.profile();
    this.setState({
      currentUserId: profile.user._id,
      isAdmin: profile.user.admin
    });
  }

  logoutUser = () => {
    window.localStorage.removeItem("assignment-tracker-app");
    this.setState({ currentUserId: null, isAdmin: null });
  };

  render() {
    const { currentUserId, isAdmin } = this.state;
    if (this.state.loading) return <p>Loading...</p>;
    return (
      <Router>
        <Header />
        <Navigation
          isAdmin={this.state.isAdmin}
          currentUserId={this.state.currentUserId}
          logoutUser={this.logoutUser}
        />
        <Switch>
          <Route
            path="/login"
            exact
            render={() => {
              if (this.state.currentUserId && this.state.isAdmin) {
                return <Redirect to="/students" />;
              }
              if (this.state.currentUserId && !this.state.isAdmin) {
                return (
                  <Redirect to={`/students/${currentUserId}/assignments`} />
                );
              }
              return (
                <FormContainer>
                  <Login onSubmit={this.loginUser} />
                </FormContainer>
              );
            }}
          />
          <Route
            path="/signup"
            exact
            render={() => {
              if (this.state.currentUserId && this.state.isAdmin) {
                return <Redirect to="/students" />;
              }
              if (this.state.currentUserId && !this.state.isAdmin) {
                return (
                  <Redirect to={`/students/${currentUserId}/assignments`} />
                );
              }
              return (
                <FormContainer>
                  <Signup onSubmit={this.signupUser} />
                </FormContainer>
              );
            }}
          />
          <Route
            path="/"
            render={() => {
              // Start TEST - I suspect this is what broke my Student UI nav
              if (this.state.currentUserId && this.state.isAdmin) {
                return (
                  <StudentsContainer
                    currentUserId={this.state.currentUserId}
                    isAdmin={this.state.isAdmin}
                  />
                );
              }
              if (this.state.currentUserId && !this.state.isAdmin) {
                return (
                  <AssignmentsContainer
                    currentUserId={this.state.currentUserId}
                    currentUser={this.state.currentUser}
                    currentUserAssignments={this.state.currentUserAssignments}
                    isAdmin={this.state.isAdmin}
                  />
                );
              }
              return <Redirect to="/login" />;
              // End TEST
              // return this.state.currentUserId ? (
              //   <>
              //     <StudentsContainer
              //       currentUserId={this.state.currentUserId}
              //       isAdmin={this.state.isAdmin}
              //     />
              //   </>
              // ) : (
              //   <Redirect to="/login" />
              // );
            }}
          />
          <Redirect to="/login" />
        </Switch>
      </Router>
    );
  }
}

export default App;
