"use strict";

const express = require("express");
const router = express.Router();
//const borda = require("./borda-count");

module.exports = knex => {
  router.get("/:id", (req, res) => {
    let templateVars = {
      url: req.params.id
    };
    res.render("results", templateVars);
  });

  router.get("/data/:id", (req, res) => {
    console.log("aqui");
    const adminLink = req.params.id;
    let decisionId;
    let decisionTitle;
    let decisionDesc;
    let optionsTitle = [];
    let optionsDesc = [];
    let votes = [];
    let info = {
      decisionId,
      decisionTitle,
      optionsTitle: [],
      optionsDesc: []
    };

    knex
      .select()
      .from("decisions")
      .whereRaw(`adm_link = '${adminLink}'`)
      .then(result => {
        info.decisionId = result[0].id;
        info.decisionTitle = result[0].title;
      })
      .then(() => {
        knex
          .select()
          .from("pool")
          .whereRaw(`decision_id = '${info.decisionId}'`)
          .then(result => {
            for (var i = 0; i < result.length; i++) {
              info.optionsTitle.push(result[i].option_title);
              info.optionsDesc.push(result[i].option_description);
            }
          })
          .then(() => {
            res.send(info);
          });
      });
  });
  router.get("/votes/:id", (req, res) => {
    knex
      .select("votes")
      .from("votes")
      .whereRaw(`decision_id = ${req.params.id}`)
      .then(result => {
        console.log(result);
        res.send(result);
      });
  });

  router.get("/votes/", (req, res) => {
    knex
      .select("votes")
      .from("votes")
      .whereRaw(`decision_id = ${req.params.id}`)
      .then(result => {
        console.log(result);
        res.send(result);
      });
  });

  return router;
};
