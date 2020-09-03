const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const routes = require('./routes/routes');
const routesLine = require('./routes/routes-line');
// const postsRoutes = require("./routes/posts");
// const userRoutes = require('./routes/user');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.use("/images", express.static(path.join("images")));
app.use("/api", routes);
app.use("", routesLine);
// app.use("/api/user", userRoutes);

module.exports = app;
