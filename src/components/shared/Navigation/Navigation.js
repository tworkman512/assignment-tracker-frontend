import React from "react";

import AuthenticatedLinks from "./Navigation.Authenticated";
import UnauthenticatedLinks from "./Navigation.Unauthenticated";

// TO-DO: THIS CURRENTLY DOES NOT WORK. NEED TO FIGURE OUT SOLUTION FOR isAdmin
// TO DISPLAY ALTERNATIVE UI BASED OFF OF ROLE

// const renderAuthenticatedLinks = (currentUserId, logoutUser, isAdmin) => {
//   if (currentUserId && isAdmin) {
//     return AuthenticatedLinksAdmin;
//   } else if (currentUserId && !isAdmin) {
//     return AuthenticatedLinksStudent;
//   }
//   return <UnauthenticatedLinks />;
// };

export default ({ currentUserId, logoutUser, isAdmin }) => {
  console.log("### LOG currentUserId FROM NAV -->", currentUserId);
  console.log("### LOG isAdmin FROM NAV -->", isAdmin);
  return (
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
};
