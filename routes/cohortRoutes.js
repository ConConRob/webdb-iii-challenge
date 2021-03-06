const express = require("express");
const knex = require("knex");
const knexConfig = require("../knexfile");

const db = knex(knexConfig.development);

const routes = express.Router();
routes.use(express.json());

routes.get("/", async (req, res) => {
  try {
    const cohorts = await db.select("*").from("cohorts");
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

routes.get("/:id", async (req, res) => {
  try {
    const arrayOfCohort = await db
      .select("*")
      .from("cohorts")
      .where("id", "=", req.params.id);
    if (arrayOfCohort.length === 0) {
      res.status(404).json({ message: "That cohort does not exist" });
    } else {
      res.status(200).json(arrayOfCohort[0]);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

routes.get("/:id/students", async (req, res) => {
  try {
    const students = await db
      .select("*")
      .from("students")
      .where("cohort_id", "=", req.params.id);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

routes.post("/", async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "Cohort name is required" });
  } else {
    try {
      const idArray = await db("cohorts").insert(req.body);
      if (idArray.length === 0) {
        res.status(409).json({ message: "Cohort name unavailable" });
      } else {
        res.status(201).json({ ...req.body, id: idArray[0] });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
});

routes.put("/:id", async (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ message: "Cohort name is required" });
  } else {
    try {
      const numUpdated = await db("cohorts")
        .where("id", "=", req.params.id)
        .update({ name: req.body.name });
      if (!numUpdated) {
        res.status(404).json({ Message: "Cohort does not exist to update" });
      } else {
        res.status(200).json("Update successfull");
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
});

routes.delete("/:id", async (req, res) => {
  try {
    const numDeleted = await db("cohorts")
      .where("id", "=", req.params.id)
      .del();
    if (!numDeleted) {
      res.status(404).json({ Message: "Cohort does not exist to delete" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = routes;
