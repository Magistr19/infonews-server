var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const multer = require('multer');
const compress = require('compression');
const mongoose = require('mongoose')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const cyrToLat = require('./customModules/cyrToLat');
require("./api/models/db");
var api = require("./api/routes/index");

var app = express();

// uncomment after placing your favicon in /public
app.use(cors({ preflightContinue: false }));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var cacheTime = 86400000 * 7; 
// включаем gzip сжатие для статики
app.use(compress({
    threshold: 512
}));


app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(session({
  secret: 'secret',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: null
  },
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/upload');
  },
  filename: function (req, file, callback) {
    var filename = cyrToLat(file.originalname);
    callback(null, filename);
  },

});

console.log(cyrToLat('Привет мир'));

app.use(multer({ storage : storage }).any());

app.use("/api", api);

app.use("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
