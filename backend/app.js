var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var history = require("connect-history-api-fallback");
var cors = require("cors");

var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var reportRouter = require("./routes/report");
var interestRouter = require("./routes/interest");
var boardRouter = require("./routes/board");
var tagRouter= require("./routes/tag");

var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(history());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:8080"],
  })
);

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/report", reportRouter);
app.use("/interest", interestRouter);
app.use("/board", boardRouter);
app.use("/tag",tagRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
