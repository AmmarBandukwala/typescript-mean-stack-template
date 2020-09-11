import express from "express";
import passport from "passport";
import asyncHandler from "express-async-handler";
import * as userCtrl from "../controllers/user.controller";

const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));

router.route("/").post(asyncHandler(insert));

async function insert(req: { body: any }, res: any) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}

export default router;
