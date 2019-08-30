import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";

import List from "./List/List";
import * as api from "../../api/students";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: []
    };
  }

  async componentDidMount() {
    const token = window.localStorage.getItem("assignment-tracker-app");
    const { currentUserId } = this.props;
    if (token) {
      const assignments = await api.getAllAssignments(currentUserId);
      this.setState({ assignments });
    }
  }

  render() {
    const { currentUserId, currentUserAssignments } = this.props;
    return (
      <>
        <Route
          path={`/students/${currentUserId}/assignments`}
          exact
          component={() => {
            return (
              <List
                currentUserId={currentUserId}
                destroyPost={this.destroyPost}
                currentUserAssignments={currentUserAssignments}
              />
            );
          }}
        />
      </>
    );
  }
}

export default withRouter(Container);
