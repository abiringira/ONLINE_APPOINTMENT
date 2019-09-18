const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const expressValidator = require("express-validator");
const config = require("../configs");
const express = require("express");
const bodyParser = require("body-parser");

const TEMPLATE_ENGINE = "ejs";
const COOKIE_MAX_AGE = 60000;

module.exports = app => {
  app.set("view engine", TEMPLATE_ENGINE);

  app.use("/static", express.static("public"));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(expressValidator());

  app.use(cookieParser(config.SESSION_SECRET));

  app.use(
    session({
      secret: config.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: COOKIE_MAX_AGE }
    })
  );

  app.use(flash());
};
