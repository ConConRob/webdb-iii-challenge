const express = require("express");

const cohortRoutes = require("./routes/cohortRoutes");

const server = express();

server.use(express.json());

server.use("/api/cohorts", cohortRoutes)

module.exports = server