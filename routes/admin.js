"use strict";

const express = require("express");
const router = express.Router();

module.exports = knex => {
  router.get("/data/:id", (req, res) => {
    const adminLink = req.params.id;
    let decisionId;
    let decisionTitle;
    let decisionDesc;
    let optionsTitle = [];
    let optionsDesc = [];
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

  router.get("/:id", (req, res) => {
    let templateVars = {
      url: req.params.id
    };
    res.render("admin", templateVars);
  });

  router.post("/update/:data" , (req, res) => {
    let params = req.params.data.split(",");
    knex()
      .select("id")
      .from("decisions")
      .whereRaw(`adm_link = '${params[0]}'`)
    .then((result) => {
      knex("pool")
        .whereRaw(`decision_id = ${result[0].id} and option_title = '${params[3]}' and option_description = '${params[4]}'`)
        .update({
          option_title: params[1],
          option_description: params[2],
          thisKeyIsSkypped:undefined
        }).then(count => {
        })
    });
  });
  return router;
};
