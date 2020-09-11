import passport from "passport";
import bcrypt from "bcrypt";
import LocalStrategy from "passport-local";
import * as PassportJwt from "passport-jwt";

const JwtStrategy = PassportJwt.Strategy;
const ExtractJwt = PassportJwt.ExtractJwt;

import User from "../models/user.model";
import config from "./config";

export default function () {
  const localLogin = new LocalStrategy.Strategy(
    {
      usernameField: "email",
    },
    async (email: string, password: string, done: any) => {
      let user = await User.findOne({ email });
      if (!user || !bcrypt.compareSync(password, user.hashedPassword)) {
        return done(null, false, {
          error: "Your login details could not be verified. Please try again.",
        });
      }
      user = user.toObject();
      delete user?.hashedPassword;
      done(null, user);
    }
  );

  const jwtLogin = new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config().jwtSecret,
    },
    async (payload, done) => {
      let user = await User.findById(payload._id);
      if (!user) {
        return done(null, false);
      }
      user = user.toObject();
      delete user?.hashedPassword;
      done(null, user);
    }
  );

  passport.use(jwtLogin);
  passport.use(localLogin);

  return passport;
}
