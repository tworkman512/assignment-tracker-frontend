import React from "react";

export default ({ users }) => {
  const cardCustom = {
    marginTop: "8px",
    marginBottom: "8px"
  };

  const list = users.map(user => (
    <div key={user._id} className="card" style={cardCustom}>
      <div className="card-body">
        <span className="font-weight-bold">
          {`${user.firstName} ${user.lastName}`}
        </span>
        <span>{` - ${user.email}`}</span>
      </div>
    </div>
  ));

  return (
    <>
      <h1>All Students</h1>
      <div>{list}</div>
    </>
  );
};
