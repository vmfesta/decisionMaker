"use strict";

const express = require("express");
const router = express.Router();

module.exports = knex => {
  router.get("/:id", (req, res) => {
    let templateVars = {
      url: req.params.id
    };
    res.render("submission-page", templateVars);
  });

  router.post("/save/:id", (req, res) => {
    var field = [];
    var aux = "";
    for (var i = 0; i < req.params.id.length; i++) {
      if (req.params.id[i] != ",") {
        aux += req.params.id[i];
        if (i + 1 == req.params.id.length) {
          field.push(aux);
        }
      } else {
        field.push(aux);
        aux = "";
      }
    }
    console.log(field);
    let url = field[field.length - 1];
    field.pop();
    let votes = field;

    knex()
      .select("id")
      .from("decisions")
      .whereRaw(`adm_link = '${url}'`)
      .then(result => {
        console.log(result);
        knex
          .insert({
            decision_id: result[0].id,
            votes: votes.toString()
          })
          .into("votes")
          .then(result => {
            console.log(result);
          });
      });
  });

  return router;
};
