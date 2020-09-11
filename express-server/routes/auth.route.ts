import express from "express";
import asyncHandler from "express-async-handler";
import passport from "passport";
import * as userCtrl from "../controllers/user.controller";
import * as authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", asyncHandler(register), login);
router.post("/login", passport.authenticate("local", { session: false }), login);
router.get("/me", passport.authenticate("jwt", { session: false }), login);

async function register(req: any, res: any, next: () => void) {
  let user = await userCtrl.insert(req.body);
  user = user.toObject();
  delete user.hashedPassword;
  req.user = user;
  next()
}

function login(req: any, res: any) {
  let user = req.user;
  let token = authCtrl.generateToken(user);
  res.json({ user, token });
}

export default router;