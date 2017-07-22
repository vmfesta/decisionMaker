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

    knex
      .select()
      .from("decisions")
      .whereRaw(`adm_link = '${adminLink}'`)
      .then(result => {
        decisionId = result[0].id;
        decisionTitle = result[0].title;
        decisionDesc = result[0].description;
      })
      .then(() => {
        knex
          .select()
          .from("pool")
          .whereRaw(`decision_id = '${decisionId}'`)
          .then(result => {
            for (var i = 0; i < result.length; i++) {
              optionsTitle.push(result[i].option_description);
              optionsDesc.push(result[i].option_description);
            }
          });
      })
      .then(() => {
        let info = {
          decisionId,
          decisionTitle,
          decisionDesc,
          optionsTitle,
          optionsDesc
        };
        console.log(Date.now);
        return info;
      });
  });

  router.get("/:id", (req, res) => {
    let templateVars = {
      url: req.params.id
    };
    res.render("admin", templateVars);
  });

  return router;
};
