//filename
const express = require("express");

//import route files
const fileNameRouter = require("./fileNames");
// const newRouteRouter = require("./newRoute");

const app = express();

// attach routes to app
app.use("/filename", fileNameRouter);
// app.use("/newRoute", newRouteRouter);


module.exports = app;