import jwt from "jsonwebtoken";
import config from "../config/config";

export function generateToken(user: any): string {
  const payload = JSON.stringify(user);
  return jwt.sign(payload, config().jwtSecret);
}