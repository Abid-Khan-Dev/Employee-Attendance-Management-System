const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const logger = require("morgan");

// passport and db setup
require("./config/passport");
dotenv.config();
connectDB();

// express setup
const app = express();
const port = process.env.PORT || 3000;

// Flash middleware
app.use(flash());

// session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// passport setup
app.use(passport.initialize());
app.use(passport.session());

// Make flash messages available in all templates
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

//  engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// middlewares
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const routes = require("./routes/index");
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
