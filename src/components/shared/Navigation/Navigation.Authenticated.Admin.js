import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const AuthenticatedLinks = ({ currentUserId, logoutUser, history }) => {
  const navWrapper = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const logout = () => {
    logoutUser();
    history.push("/login");
  };

  return (
    <div style={navWrapper}>
      <ul className="nav justify-content-start">
        <li className="nav-item">
          <Link className="nav-link" to="/users">
            All Students
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`/users/${currentUserId}/posts/new`}>
            Ungraded Assignments
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`/users/${currentUserId}/posts/new`}>
            Graded Assignments
          </Link>
        </li>
        <li className="nav-item">
          <button className="btn btn-link" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
      <h5>Welcome, Admin!</h5>
    </div>
  );
};

export default withRouter(AuthenticatedLinks);
