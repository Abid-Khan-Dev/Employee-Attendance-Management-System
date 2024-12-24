const express = require("express");
const router = express.Router();
const empModel = require("../../models/User");
const depModel = require("../../models/Department");
const shiftModel = require("../../models/Shift");
const leaveModel = require("../../models/Leave");
const attendanceModel = require("../../models/Attendance");

router.get("/", async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const employees = await empModel.find({ role: "employee" });
  const departments = await depModel.find();
  const shifts = await shiftModel.find();
  const leaves = await leaveModel.find({ date: today }).populate("employeeId");
  const attendance = await attendanceModel
    .find({ date: today })
    .populate("employeeId")
    .populate("location");

  res.render("./admin/dashboard", {
    employees,
    departments,
    shifts,
    leaves,
    attendance,
  });
});

module.exports = router;
