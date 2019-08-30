import React from "react";
import { Route } from "react-router-dom";

import List from "./List/List";
import * as api from "../../api/students";

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      currentUserId: null,
      isAdmin: null
      // users: [{ posts: [] }]
      // users: [
      //   {
      //     _id: "5de4",
      //     username: "example.user",
      //     posts: [
      //       {
      //         _id: "6cj2",
      //         content: "This is an example post.",
      //         emotion: "joy",
      //         created_at: new Date("2019-07-01")
      //       }
      //     ]
      //   }
      // ]
    };
  }

  async componentDidMount() {
    const token = window.localStorage.getItem("assignment-tracker-app");
    if (token) {
      const users = await api.getAllUsers();
      this.setState({ users });
    }
  }

  // removePost
  // -- would remove a single post from the state;
  // calling setState()

  // refetchState
  // -- would refetch the entire state ( a resource ),
  // and set that state, overwriting the previous
  // state

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
          component={() => <List users={users} />}
        />
      </main>
    );
  }
}
