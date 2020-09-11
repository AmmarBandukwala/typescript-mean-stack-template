import path from "path";
import express from "express";
import createHttpError from "http-errors";
import logger from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import methodOverride from "method-override";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import config from "./config";
import * as swaggerDocument from "./swagger.json";
import routes from "../routes/index.route";
import passport from "./passport";

export default function () {
  const app = express();

  if (config().env === "development") {
    app.use(logger("dev"));
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cookieParser());
  app.use(compress());
  app.use(methodOverride());

  // secure apps by setting various HTTP headers
  app.use(helmet());

  // enable CORS - Cross Origin Resource Sharing
  app.use(cors());

  app.use(passport().initialize());

  app.use(/^((?!(api)).)*/, (req, res) => {
      res.redirect("/api-docs");
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // API router
  app.use("/api/", routes);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = createHttpError(404);
    return next(err);
  });

  // error handler, send stacktrace only during development
  app.use((err: any, req: any, res: any, next: any) => {
    // customize Joi validation errors
    if (err.isJoi) {
      err.message = err.details.map((e: any) => e.message).join("; ");
      err.status = 400;
    }

    res.status(err.status || 500).json({
      message: err.message,
    });
    next(err);
  });

  return app;
}
