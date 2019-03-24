const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

const routes = express.Router();
routes.use(express.json());

routes.get("/", async (req, res) => {
  try{
    const cohorts = await db.select("*").from("cohorts");
    res.status(200).json(cohorts)
  }catch(error){
    res.status(500).json({message: "Server error", error})
  }
})

routes.get("/:id", async (req, res) => {
  try{
    const arrayOfCohort = await db.select("*").from("cohorts").where("id", "=", req.params.id)
    if(arrayOfCohort.length === 0){
      res.status(404).json({message: "That cohort does not exist"})
    } else {
      res.status(200).json(arrayOfCohort[0])
    }
  }catch(error) {
    res.status(500).json({message: "Server error", error})
  }
})

module.exports = routes;