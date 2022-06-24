import passport from "passport";
import passportJwt from "passport-jwt";
import config from "../config.js";
import User from "../models/User";

const ExtractJwt = passportJwt.ExtractJwt;
const Strategy = passportJwt.Strategy;
var params = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("jwt"),
};

export default () => {
  const strategy = new Strategy(params, function (payload, done) {
    User.findById(payload.id, function (err, user) {
      if (err) {
        return done(new Error("User not found"), null);
      } else if (payload.expiry <= Date.now()) {
        return done(new Error("Token Expired"));
      } else {
        return done(null, user);
      }
    });
  });
  passport.use(strategy);
  return {
    initialize: function () {
      return passport.initialize();
    },
    authenticate: function () {
      return passport.authenticate("jwt", config.jwtSession);
    },
  };
};
