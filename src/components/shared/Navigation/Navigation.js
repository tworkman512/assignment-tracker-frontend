import React from "react";

import AuthenticatedLinks from "./Navigation.Authenticated";
import UnauthenticatedLinks from "./Navigation.Unauthenticated";

export default ({ currentUserId, logoutUser }) => (
  <section className="bg-light border-bottom mb-4">
    <div className="container">
      {currentUserId ? (
        <AuthenticatedLinks
          currentUserId={currentUserId}
          logoutUser={logoutUser}
        />
      ) : (
        <UnauthenticatedLinks />
      )}
    </div>
  </section>
);
