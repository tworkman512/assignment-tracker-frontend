import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";

import List from "./List/List";
import * as api from "../../api/students";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentUserId: null,
      isAdmin: null
    };
  }

  async componentDidMount() {
    const token = window.localStorage.getItem("assignment-tracker-app");
    if (token) {
      const users = await api.getAllUsers();
      this.setState({ users });
    }
  }

  render() {
    const { users } = this.state;
    return (
      <main className="container">
        <Route
          path="/students"
          exact
          component={() => <List users={users} />}
        />
      </main>
    );
  }
}

export default withRouter(Container);
