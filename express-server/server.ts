// config should be imported before importing any other file
import config from "./config/config";
import app from "./config/express";
import "./config/mongoose";

app().listen(config().port, () => {
  console.info(`server started on port ${config().port} (${config().env})`);
});

export default app;