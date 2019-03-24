const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

const routes = express.Router();
routes.use(express.json());

routes.get("/", async (req, res) => {
  const cohorts = await db.select("*").from("cohorts");
  res.status(200).json(cohorts)
})

module.exports = routes;