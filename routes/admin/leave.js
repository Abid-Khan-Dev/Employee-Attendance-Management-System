const express = require("express");
const router = express.Router();
const Leave = require("../../models/Leave");

// for getting all leaves
router.get("/", async (req, res) => {
  const leaves = await Leave.find().populate("employeeId");
  res.render("./admin/leaveRequest", { leaves });
});

// for approving leave
router.post("/approve/:id", async (req, res) => {
  const leave = await Leave.findById(req.params.id);
  if (!leave) {
    req.flash("error", "Leave not found");
    return res.redirect("/admin/leave");
  }

  leave.leaveStatus = "Approved";
  await leave.save();
  req.flash("success", "Leave approved successfully");
  res.redirect("/admin/leave");
});

// for rejecting leave
router.post("/reject/:id", async (req, res) => {
  const leave = await Leave.findById(req.params.id);
  if (!leave) {
    req.flash("error", "Leave not found");
    return res.redirect("/admin/leave");
  }

  leave.leaveStatus = "Rejected";
  await leave.save();
  req.flash("success", "Leave Rejected successfully");
  res.redirect("/admin/leave");
});

// for deleting leave
router.post("/delete/:id", async (req, res) => {
  const leave = await Leave.findById(req.params.id);
  if (!leave) {
    req.flash("error", "Leave not found");
    return res.redirect("/admin/leave");
  }
  await Leave.findOneAndDelete({ _id: req.params.id });

  req.flash("success", "Leave Deleted successfully");
  res.redirect("/admin/leave");
});
module.exports = router;
