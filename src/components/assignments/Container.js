import React from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";

import List from "./List/List";
// import * as api from "../../api/assignments";
import * as api from "../../api/students";

// TO-DO:
// NEED TO SET UP BACKEND FOR ASSIGNMENTS
// NEED TO SETUP UP THIS AS INDEX ROUTE FOR STUDENT USERS
// WILL NEED A WAY TO DETERMINE USER PERMISSIONS TO SHOW SPECIFIC ROUTES
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assignments: []
    };
  }

  async componentDidMount() {
    const token = window.localStorage.getItem("assignment-tracker-app");
    const { currentUserId } = this.props;
    console.log("### did we receive the props -->", currentUserId);
    if (token) {
      const assignments = await api.getAllAssignments(currentUserId);
      this.setState({ assignments });
    }
  }

  render() {
    const { currentUserId, currentUserAssignments } = this.props;
    console.log(
      "### DID THIS RENDER currentUserAssignments??? -->",
      currentUserAssignments
    );
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
