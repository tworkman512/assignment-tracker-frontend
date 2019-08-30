import React from "react";

export default ({ currentUserAssignments }) => {
  const cardCustom = {
    marginTop: "8px",
    marginBottom: "8px"
  };

  const list = currentUserAssignments.map(assignment => (
    <div key={assignment._id} className="card" style={cardCustom}>
      <div className="card-body">
        <span className="font-weight-bold">
          {`${assignment.title} ${assignment.description} ${assignment.link}`}
        </span>
      </div>
    </div>
  ));

  return (
    <>
      <h1>All Assignments</h1>
      <div>{list}</div>
      <div>LIST WILL GO HERE</div>
    </>
  );
};
