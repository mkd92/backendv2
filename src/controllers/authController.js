import express from "express";
import jwt from "jwt-simple";
import User from "../models/User";
import config from "../config";

const login = (req, res) => {
  console.log("Logged In");
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      console.log("Error Happened In auth /token Route");
    } else {
      var payload = {
        id: user.id,
        expire: Date.now() + 1000 * 60 * 60 * 24 * 7, //7 days
      };
      var token = jwt.encode(payload, config.jwtSecret);
      res.json({
        token: token,
      });
    }
  });
};

const register = (req, res) => {
  User.register(
    new User({
      name: req.body.name,
      username: req.body.username,
    }),
    req.body.password,
    function (err, msg) {
      console.log(err, msg);
      if (err) {
        res.send(err);
      } else {
        res.send({ message: "Successful" });
      }
    }
  );
};

module.exports = { login, register };
