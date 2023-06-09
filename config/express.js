const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const fileUpload = require("express-fileupload");
const expressip = require("express-ip");
const app = express();
const faker = require("../faker");

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: {
    status: 403,
    success: false,
    message: "Too many request",
  },
});

app.use(limiter);

app.use(expressip().getIpInfoMiddleware);
app.use(helmet());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(cors());
app.options("*", cors());
app.use(fileUpload());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, PATCH, POST, GET, DELETE, OPTIONS"
  );
  next();
});

(async () => {
  try {
    await faker.fakeData();
  } catch (err) {
    console.error(err);
  }
})();

module.exports = app;
