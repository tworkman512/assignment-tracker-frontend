import React from "react";
import { Route } from "react-router-dom";

import List from "./List/List";
import * as api from "../../api/assignments";

// TO-DO:
// NEED TO SET UP BACKEND FOR ASSIGNMENTS AND ALSO
// NEED TO SETUP UP THIS AS INDEX ROUTE FOR STUDENT USERS
// WILL NEED A WAY TO DETERMINE USER PERMISSIONS TO SHOW SPECIFIC ROUTES

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: []
    };
  }

  async componentDidMount() {
    const token = window.localStorage.getItem("assignment-tracker-app");
    if (token) {
      const assignments = await api.getAllAssignments();
      this.setState({ assignments });
    }
  }

  render() {
    const { assignments } = this.state;
    console.log("### WHAT IS HAPPENING? -->", assignments);
    return (
      <main className="container">
        <Route
          path="/"
          exact
          component={() => <List assignments={assignments} />}
        />
      </main>
    );
  }
}
