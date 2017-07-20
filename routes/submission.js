"use strict";

const express = require("express");
const router = express.Router();

module.exports = knex => {
  router.post("/vote", (req, res) => {
    knex("pool")
      .where("option")

  });
  return router;
};
