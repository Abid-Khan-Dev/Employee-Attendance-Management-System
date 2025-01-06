const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../../middlewares/index");

// Login
router.get("/login", isNotLoggedIn, (req, res) => {
  res.render("./employee/login");
});

router.post(
  "/login",
  isNotLoggedIn,
  passport.authenticate("user.login", {
    failureRedirect: "/auth/login",
    successRedirect: "/dashboard",
    failureFlash: true,
  })
);

// for Logged out
router.post("/logout", isLoggedIn, (req, res, next) => {
  req.logout((error) => {
    if (error) {
      console.log("Error dusing logout: ", error);
      req.flash("error", "Please try later.");
      return res.redirect("/auth/login");
    }
  });
  req.flash("success", "Logged out Successfully");
  return res.redirect("/auth/login");
});

module.exports = router;
