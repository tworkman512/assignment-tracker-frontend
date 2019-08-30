import React from "react";

export default ({ currentUserAssignments }) => {
  const cardCustom = {
    marginTop: "8px",
    marginBottom: "8px"
  };

  const list = currentUserAssignments.map(assignment => (
    <div key={assignment._id} className="card" style={cardCustom}>
      <div className="card-body">
        <h4 className="font-weight-bold">{`${assignment.title}`}</h4>
        <p>{`${assignment.projectDescription}`}</p>
        <p>{`${assignment.projectLink}`}</p>
      </div>
    </div>
  ));

  return (
    <>
      <h1>All Assignments</h1>
      <div>{list}</div>
    </>
  );
};
