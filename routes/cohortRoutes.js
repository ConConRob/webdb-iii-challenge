const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

const routes = express.Router();
routes.use(express.json());

module.exports = routes;