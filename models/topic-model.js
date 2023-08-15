const db = require("../db/connection");
const endpoints = require("../endpoints.json");
const fs = require("fs/promises");

const fetchAllTopics = () => {
  return db.query("SELECT * FROM topics;").then(({ rows }) => {
    return rows;
  });
};

const fetchAllEndpoints = () => {
  return fs.readFile("endpoints.json").then((endpoints) => {
    const preparedEndpoints = endpoints.toString();
    return JSON.parse(preparedEndpoints)
  });
};

module.exports = { fetchAllTopics, fetchAllEndpoints };
