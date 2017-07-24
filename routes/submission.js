"use strict";

const express = require("express");
const router = express.Router();
const Mailgun = require("mailgun-js");
const api_key = "key-8283fc6f9fdffdb4af3b8ceec1e36c9f";
const domain = "sandbox206c5cd1264647a996f0e1324c3a0242.mailgun.org";
const from_who = "your@email.com";

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
    let email;
    knex()
      .select("id","email")
      .from("decisions")
      .whereRaw(`adm_link = '${url}'`)
      .then(result => {
        email = result[0].email;
        console.log(result);
        knex
          .insert({
            decision_id: result[0].id,
            votes: votes.toString()
          })
          .into("votes")
          .then(result => {
            console.log(result);
            //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
            var mailgun = new Mailgun({ apiKey: api_key, domain: domain });
            var data = {
              //Specify email data
              from: from_who,
              //The email to contact
              to: email,
              //Subject and text data
              subject: "You have to make a decision!",
              html: `<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>  <title></title>  <!--[if !mso]><!-- -->  <meta http-equiv="X-UA-Compatible" content="IE=edge">  <!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style type="text/css">  #outlook a { padding: 0; }  .ReadMsgBody { width: 100%; }  .ExternalClass { width: 100%; }  .ExternalClass * { line-height:100%; }  body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }  table, td { border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }  img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }  p { display: block; margin: 13px 0; }</style><!--[if !mso]><!--><style type="text/css">  @media only screen and (max-width:480px) {    @-ms-viewport { width:320px; }    @viewport { width:320px; }  }</style><!--<![endif]--><!--[if mso]><xml>  <o:OfficeDocumentSettings>    <o:AllowPNG/>    <o:PixelsPerInch>96</o:PixelsPerInch>  </o:OfficeDocumentSettings></xml><![endif]--><!--[if lte mso 11]><style type="text/css">  .outlook-group-fix {    width:100% !important;  }</style><![endif]--><!--[if !mso]><!-->    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">    <style type="text/css">        @import url(https://fonts.googleapis.com/css?family=Lato);    </style>  <!--<![endif]--><style type="text/css">  @media only screen and (min-width:480px) {    .mj-column-per-100 { width:100%!important; }  }</style></head><body style="background: #FFFFFF;">    <div class="mj-container" style="background-color:#FFFFFF;"><!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">        <tr>          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">      <![endif]--><table role="presentation" cellpadding="0" cellspacing="0" style="background:#49a6e8;font-size:0px;width:100%;" border="0"><tbody><tr><td><div style="margin:0px auto;max-width:600px;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:32px 0px 32px 0px;"><!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0">        <tr>          <td style="vertical-align:top;width:600px;">      <![endif]--><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px;" align="center"><div style="cursor:auto;color:#FFFFFF;font-family:Lato, Tahoma, sans-serif;font-size:14px;line-height:22px;text-align:center;"><h1 style="font-family: &apos;Cabin&apos;, sans-serif; color: #FFFFFF; font-size: 32px; line-height: 100%;">Decision Maker</h1></div></td></tr><tr><td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px;" align="center"><div style="cursor:auto;color:#FFFFFF;font-family:Lato, Tahoma, sans-serif;font-size:14px;line-height:22px;text-align:center;"><h1 style="font-family: &apos;Cabin&apos;, sans-serif; color: #FFFFFF; font-size: 32px; line-height: 100%;">Your friend have voted!</h1></div></td></tr></tbody></table></div><!--[if mso | IE]>      </td></tr></table>      <![endif]--></td></tr></tbody></table></div></td></tr></tbody></table><!--[if mso | IE]>      </td></tr></table>      <![endif]--></div></body></html>`
            };

            //Invokes the method to send emails given the above data with the helper library
            mailgun.messages().send(data, function(err, body) {
              //If there is an error, render the error page
              if (err) {
                console.log("got an error: ", err);
              } else {
                //Else we can greet    and leave
                //Here "submitted.jade" is the view file for this landing page
                //We pass the variable "email" from the url parameter in an object rendered by Jade
                //res.redirect("/admin");
                console.log(body);
              }
            });
          });
      });
  });

  return router;
};
