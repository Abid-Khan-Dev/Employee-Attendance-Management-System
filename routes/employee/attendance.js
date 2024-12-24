const express = require("express");
const router = express.Router();
const Attendance = require("../../models/Attendance");
const Location = require("../../models/Location");
const formatTotalHours = require("../../utils/formatTime");

router.get("/", async (req, res) => {
  try {
    const locations = await Location.find();
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    // console.log(d);

    // This query will search logged-in user with current date for check-in and check-out when user clicks on the check-in and check-out, this will help us to disabled btns after submitted the forms
    const attendance = await Attendance.findOne({
      $and: [{ employeeId: req.user.id }, { date: d }],
    });

    res.render("./employee/attendance", {
      locations,
      attendance,
    });
  } catch (error) {
    req.flash("error", "Failed to load Mark Attendance!, Please try later.");
    return res.redirect("/dashboard");
  }
});

router.post("/checkin", async (req, res) => {
  try {
    // console.log(req.body);
    const { employeeId, message, location } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // console.log(today)

    const attendance = await Attendance.findOne({ employeeId, date: today });

    if (attendance) {
      if (attendance.statusAtt === "On Leave") {
        req.flash("error", "You are currently on leave and cannot check in.");
        return res.redirect("/dashboard/attendance");
      } else {
        req.flash("error", "You have already checked in today.");
        return res.redirect("/dashboard/attendance");
      }
    }

    // console.log(attendance)
    await Attendance.create({
      employeeId,
      message,
      location,
      date: today,
      checkIn: new Date(),
    });

    req.flash("success", "Check-in Successful!");
    return res.redirect("/dashboard/attendance");
  } catch (error) {
    console.error("Error during check-in:", error);
    req.flash("error", "Failed to Mark Attendance!, Please try later.");
    return res.redirect("/dashboard/attendance");
  }
});

router.post("/checkout", async (req, res) => {
  try {
    // console.log(req.body);
    const { employeeId } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // console.log(today)

    const attendance = await Attendance.findOne({ employeeId, date: today });

    if (!attendance || !attendance.checkIn) {
      req.flash("error", "Check-in first before checking out.");
      return res.redirect("/dashboard/attendance");
    }
    if (attendance.checkOut) {
      req.flash("error", "You have already checked out today.");
      return res.redirect("/dashboard/attendance");
    }

    attendance.checkOut = new Date();

    // Calculate total hours
    const totalHours = (
      (attendance.checkOut - attendance.checkIn) /
      (1000 * 60 * 60)
    ).toFixed(2);
    // console.log(totalHours);

    const minimumHourse = 0.25;
    if (totalHours < minimumHourse) {
      req.flash(
        "error",
        "Check-out is too soon after check-in. wait for at least 15 minutes."
      );
      return res.redirect("/dashboard/attendance");
    }

    // format total hours for flash message
    const formatHours = formatTotalHours(totalHours);

    // save the total hours
    attendance.totalHours = totalHours;
    await attendance.save();

    req.flash("success", `Check-out Successful! Total hours: ${formatHours}`);
    return res.redirect("/dashboard/attendance");
  } catch (error) {
    console.error("Error during check-out:", error);
    req.flash("error", "Failed to check-out!, Please try later.");
    return res.redirect("/dashboard");
  }
});

module.exports = router;
