import createHttpError from "http-errors";

export const requireAdmin = (req: any, res: any, next: (value?: any) => {}) => {
  if (req.user && req.user.roles.indexOf("admin") > -1) return next();
  let err = createHttpError(401);
  return next(err);
};