const { NODE_ENV } = process.env;
// const BASE_URL = NODE_ENV === "development" ? "http://localhost:5000" : "tbd"; // Once we deploy, we need to change this
const { REACT_APP_API_DOMAIN } = process.env;
const BASE_URL = REACT_APP_API_DOMAIN;

export const getAllUsers = async () => {
  const token = window.localStorage.getItem("assignment-tracker-app");
  const response = await fetch(`${BASE_URL}/api/students`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    method: "GET"
  });
  const json = await response.json();
  // This breaks when I'm logged in as a Student User and navigate to the 'All Students' link. I spent entirely
  // waaay too much time trying to figure that out. Works great on Postman and as an Admin User for the frontend.
  // Believe I broke something with either React Router, React, or both.
  console.log("### log out getAllUsers response", json);
  return json.response;
};

export const getAllAssignments = async studentId => {
  const token = window.localStorage.getItem("assignment-tracker-app");
  const response = await fetch(
    `${BASE_URL}/api/students/${studentId}/assignments`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "GET"
    }
  );
  const json = await response.json();
  console.log("### log out getAllAssignments response", json);
  return json.response;
};
