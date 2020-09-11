import mongoose from "mongoose";
import util from "util";
const debug = require("debug")("express-mongoose-es6-rest-api:index");

import config from "./config";

export default function () {
  // connect to mongo db
  const mongoUri = config().mongo.host;
  mongoose.connect(mongoUri, { keepAlive: true }, () => {
    throw new Error(`unable to connect to database: ${mongoUri}`);
  });

  // print mongoose logs in dev env
  if (config().mongooseDebug) {
    mongoose.set(
      "debug",
      (collectionName: string, method: string, query: string, doc: string) => {
        debug(
          `${collectionName}.${method}`,
          util.inspect(query, false, 20),
          doc
        );
      }
    );
  }
}
