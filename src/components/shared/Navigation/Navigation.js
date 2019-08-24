import React, { PureComponent } from "react";

import AuthenticatedLinksAdmin from "./Navigation.Authenticated.Admin";
import AuthenticatedLinksStudent from "./Navigation.Authenticated.Student";

import UnauthenticatedLinks from "./Navigation.Unauthenticated";

class Navigation extends PureComponent {
  render() {
    const { currentUserId, logoutUser, isAdmin } = this.props;
    if (currentUserId && !isAdmin) {
      return (
        <section className="bg-light border-bottom mb-4">
          <div className="container">
            <AuthenticatedLinksStudent
              currentUserId={currentUserId}
              logoutUser={logoutUser}
            />
          </div>
        </section>
      );
    } else if (currentUserId && isAdmin) {
      return (
        <section className="bg-light border-bottom mb-4">
          <div className="container">
            <AuthenticatedLinksAdmin
              currentUserId={currentUserId}
              logoutUser={logoutUser}
            />
          </div>
        </section>
      );
    }
    return (
      <section className="bg-light border-bottom mb-4">
        <div className="container">
          <UnauthenticatedLinks />
        </div>
      </section>
    );
  }
}

export default Navigation;
