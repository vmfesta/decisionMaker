"use strict";

const express = require("express");
const router = express.Router();

module.exports = knex => {
  router.post("/newDecision", (req, res) => {
    knex
      .insert({
        title: title,
        description: description,
        adm_link: admLink,
        sub_link: subLink,
        result_link: resLink,
        email: email
      })
      .into("decisions")
      .then((err, id) => {
        if (err) return console.error(err);
        console.log("INSERTED ==> ", id);
      });
  });
  return router;
};
