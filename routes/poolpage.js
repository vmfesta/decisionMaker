"use strict";

const express = require("express");
const router = express.Router();

module.exports = knex => {
  router.get("/:id", (req, res) => {
    knex("pool")
      .select("title", "option_description")
      .join("decisions", "decision.id", "=", "pool.decision_id")
      .whereRaw(`decisions.sub_link = ${req.params.id}`)
      .then((result) => {
        //code
      });
  });
  
  router.post("/vote", (req, res) => {
    knex("pool")
      .where("option")

  });
  return router;
};
