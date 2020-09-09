require("dotenv").config();
const express = require("express");
const logger = require("./utilities/logger");
const app = express();
const port = process.env.PORT || 5000;
require("./utilities/db")();

const server = app.listen(port, () =>
  logger.info(
    `server running on ${process.env.NODE_ENV}, listening on port ${port}`
  )
);
