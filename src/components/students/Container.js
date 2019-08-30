import React from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";

import List from "./List/List";
import * as api from "../../api/students";

class Container extends React.Component {
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
      console.log(users);
      this.setState({ users });
    }
  }

  render() {
    const { users, currentUserId, isAdmin } = this.state;
    console.log("### WHAT IS HAPPENING my users? -->", users);
    console.log("### currentUserId? -->", currentUserId);
    console.log("### isAdmin? -->", isAdmin);
    return (
      <main className="container">
        <Route
          path="/students"
          exact
          component={({ match }) => <List users={users} />}
        />
      </main>
    );
  }
}

export default withRouter(Container);
