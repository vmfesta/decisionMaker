"use strict";

require("dotenv").config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require("morgan");
const knexLogger = require("knex-logger");
const Mailgun = require("mailgun-js");
const api_key = "key-8283fc6f9fdffdb4af3b8ceec1e36c9f";
const domain = "dm.lighthouse.com";
const from_who = "your@email.com";
// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded"
  })
);
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/poll", (req, res) => {
  res.render("pollpage");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

app.get("/submit/:mail", function(req, res) {
  //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
  var mailgun = new Mailgun({ apiKey: api_key, domain: domain });

  var data = {
    //Specify email data
    from: from_who,
    //The email to contact
    to: req.params.mail,
    //Subject and text data
    subject: "You have to make a decision!",
    html: `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <title></title>
    <!--[if !mso]><!-- -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
        #outlook a {
            padding: 0;
        }

        .ReadMsgBody {
            width: 100%;
        }

        .ExternalClass {
            width: 100%;
        }

        .ExternalClass * {
            line-height: 100%;
        }

        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        p {
            display: block;
            margin: 13px 0;
        }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
        @media only screen and (max-width:480px) {
            @-ms-viewport {
                width: 320px;
            }
            @viewport {
                width: 320px;
            }
        }
    </style>
    <!--<![endif]-->
    <!--[if mso]><xml>  <o:OfficeDocumentSettings>    <o:AllowPNG/>    <o:PixelsPerInch>96</o:PixelsPerInch>  </o:OfficeDocumentSettings></xml><![endif]-->
    <!--[if lte mso 11]><style type="text/css">  .outlook-group-fix {    width:100% !important;  }</style><![endif]-->
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
    <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Lato);
        @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
    </style>
    <!--<![endif]-->
    <style type="text/css">
        @media only screen and (min-width:480px) {
            .mj-column-per-100 {
                width: 100%!important;
            }
        }
    </style>
</head>

<body style="background: #FFFFFF;">
    <div class="mj-container" style="background-color:#FFFFFF;">
        <!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;">        <tr>          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">      <![endif]-->
        <table role="presentation" cellpadding="0" cellspacing="0" style="background:#49a6e8;font-size:0px;width:100%;" border="0">
            <tbody>
                <tr>
                    <td>
                        <div style="margin:0px auto;max-width:600px;">
                            <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;" align="center"
                                border="0">
                                <tbody>
                                    <tr>
                                        <td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px 0px 0px 0px;">
                                            <!--[if mso | IE]>      <table role="presentation" border="0" cellpadding="0" cellspacing="0">        <tr>          <td style="vertical-align:top;width:600px;">      <![endif]-->
                                            <div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;">
                                                <table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                                    <tbody>
                                                        <tr>
                                                            <td style="word-wrap:break-word;font-size:0px;">
                                                                <div style="font-size:1px;line-height:50px;white-space:nowrap;">&#xA0;</div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px;"
                                                                align="center">
                                                                <div style="cursor:auto;color:#FFFFFF;font-family:Lato, Tahoma, sans-serif;font-size:14px;line-height:22px;text-align:center;">
                                                                    <h1 style="font-family: &apos;Cabin&apos;, sans-serif; color: #FFFFFF; font-size: 32px; line-height: 100%;">Decision Maker</h1>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="word-wrap:break-word;font-size:0px;padding:0px 20px 0px 20px;"
                                                                align="center">
                                                                <div style="cursor:auto;color:#FFFFFF;font-family:Lato, Tahoma, sans-serif;font-size:14px;line-height:22px;text-align:center;">
                                                                    <h1 style="font-family: &apos;Cabin&apos;, sans-serif; color: #FFFFFF; font-size: 32px; line-height: 100%;">You need to decide!</h1>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="word-wrap:break-word;font-size:0px;padding:1px 0px 1px 0px;"
                                                                align="center">
                                                                <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;"
                                                                    align="center" border="0">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td style="border:none;border-radius:24px;color:#fff;cursor:auto;padding:10px 25px;"
                                                                                align="center" valign="middle" bgcolor="#275877"><a href="https://google.com" style="text-decoration:none;background:#275877;color:#fff;font-family:Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif;font-size:18px;font-weight:normal;line-height:120%;text-transform:none;margin:0px;"
                                                                                    target="_blank">Vote!</a></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <!--[if mso | IE]>      </td></tr></table>      <![endif]-->
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <!--[if mso | IE]>      </td></tr></table>      <![endif]-->
    </div>
</body>

</html>`
  };

  //Invokes the method to send emails given the above data with the helper library
  mailgun.messages().send(data, function(err, body) {
    //If there is an error, render the error page
    if (err) {
      res.render("error", { error: err });
      console.log("got an error: ", err);
    } else {
      //Else we can greet    and leave
      //Here "submitted.jade" is the view file for this landing page
      //We pass the variable "email" from the url parameter in an object rendered by Jade
      //res.render("submitted", { email: req.params.mail });
      console.log(body);
    }
  });
});
