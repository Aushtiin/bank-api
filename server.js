require("dotenv").config();
const express = require("express");
const logger = require("./utilities/logger");
const app = express();
const port = process.env.PORT || 5000;
const user = require('./User/routes/user');
const account = require('./Account/routes/account');
require("./utilities/db")();


app.use(express.json());
app.use('/api/users', user);
app.use('/api/accounts', account);

const server = app.listen(port, () =>
  logger.info(
    `server running on ${process.env.NODE_ENV}, listening on port ${port}`
  )
);
