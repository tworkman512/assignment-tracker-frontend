const { NODE_ENV } = process.env;
const BASE_URL = NODE_ENV === "development" ? "http://localhost:5000" : "tbd"; // Once we deploy, we need to change this
// const { REACT_APP_API_DOMAIN } = process.env;
// const BASE_URL = REACT_APP_API_DOMAIN;

export const login = async user => {
  const response = await fetch(`${BASE_URL}/api/login`, {
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });
  const json = await response.json();
  const token = json.token;

  window.localStorage.setItem("assignment-tracker-app", token);
  return json;
};

export const signup = async user => {
  const response = await fetch(`${BASE_URL}/api/signup`, {
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });
  const json = await response.json();
  const token = json.token;

  window.localStorage.setItem("assignment-tracker-app", token);
  return json;
};

export const profile = async () => {
  const token = window.localStorage.getItem("assignment-tracker-app");
  const response = await fetch(`${BASE_URL}/api/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    method: "GET"
  });
  const json = await response.json();

  return json;
};
