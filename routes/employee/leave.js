const express = require("express");
const router = express.Router();
const Leave = require("../../models/Leave");

// For getting all leaves requests
router.get("/", async (req, res) => {
  const leaves = await Leave.find({ employeeId: req.user.id }).populate(
    "employeeId"
  );
  res.render("./employee/leave-requests", { leaves });
});

// For applying leave requests
router.post("/apply", async (req, res) => {
  try {
    const { leaveType, startDate, endDate, message } = req.body;
    const userId = req.user.id;

    const leave = await Leave.findOne({
      employeeId: userId,
      leaveStatus: "Pending",
    });
    if (leave) {
      req.flash(
        "error",
        "You have a pending leave application. Please wait for approval or check your status."
      );
      return res.redirect("/dashboard/attendance");
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newleave = new Leave({
      employeeId: userId,
      leaveType,
      startDate,
      endDate,
      date: today,
      message,
    });
    await newleave.save();
    req.flash("success", "Leave application submitted successfully!");
    res.redirect("/dashboard/attendance");
  } catch (error) {
    console.error("error applying for leave: ", error);
    req.flash("error", "Failed to apply for leave. Please try later.");
    res.redirect("/dashboard/attendance");
  }
});
module.exports = router;
