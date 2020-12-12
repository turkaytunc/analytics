const express = require("express");
const chalk = require("chalk");
const Analytic = require("../models/analytic.js");

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const data = JSON.parse(req.body);
    const analytic = new Analytic(data);

    analytic.save().then((analytic) => {
      console.log(chalk.green("Data saved"));
      res.status(201).json("data saved");
      next();
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
