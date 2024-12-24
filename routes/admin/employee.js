const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const Shifts = require("../../models/Shift");
const Department = require("../../models/Department");

// for getting all employees
router.get("/", async (req, res) => {
  const employees = await User.find({ role: "employee" }).populate(
    "department"
  );
  //  console.log(employees,'emp');
  res.render("./admin/employee/index", {
    employees,
  });
});

// for adding employee
router.get("/add", async (req, res) => {
  const employees = await User.find({ role: "employee" });
  const shift = await Shifts.find();
  const department = await Department.find();
  res.render("./admin/employee/add", {
    shift,
    employees,
    department,
  });
});

router.post("/add", async (req, res) => {
  try {
    // console.log(req.body)
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      joiningDate,
      shift,
      dob,
      phone,
      gender,
      department,
      statusEmp,
    } = req.body;
    const existEmp = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existEmp) {
      req.flash("error", "Email or Username already exists");
      return res.redirect("/admin/employees");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashPassword,
      joiningDate,
      shift,
      dob,
      phone,
      gender,
      department,
      statusEmp,
    });
    req.flash("success", "Employee added successfully!");
    res.redirect("/admin/employees");
  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to add employee!, Please try again later.");
    res.redirect("/admin/employees");
  }
});

// for editing employee
router.get("/edit/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      req.flash("error", "No employee found");
      return res.redirect("/admin/employees");
    }
    const department = await Department.find();
    const employee = await User.findById(req.params.id)
      .populate("department")
      .populate("shift");
    // console.log(employee,'emp');
    employee.password = undefined; // to hide password

    const shift = await Shifts.find();
    // console.log(shift,'edit');
    res.render("./admin/employee/edit", {
      employee,
      shift,
      department,
    });
  } catch (error) {
    console.error(error.message);
    req.flash("error", "Failed to edit employee!, Please try again later.");
    res.redirect("/admin/employees");
  }
});

router.post("/edit/:id", async (req, res) => {
  try {
    console.log(req.body, "edit");
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      joiningDate,
      shift,
      dob,
      phone,
      gender,
      department,
      statusEmp,
    } = req.body;
    if (!req.params.id) {
      req.flash("error", "No employee found");
      return res.redirect("/admin/employees");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        firstName,
        lastName,
        username,
        email,
        password: hashPassword,
        joiningDate,
        shift,
        dob,
        phone,
        gender,
        department,
        statusEmp,
      }
    );
    req.flash("success", "Successfully Employee Updated");
    res.redirect("/admin/employees");
  } catch (error) {
    console.error(error.message);
    req.flash("error", "Failed to edit employee!, Please try again later.");
    res.redirect("/admin/employees");
  }
});

// for deleting employee
router.post("/delete/:id", async (req, res) => {
  try {
    //  console.log(req.body)
    if (!req.params.id) {
      req.flash("error", "No employee found");
      return res.redirect("/admin/employees");
    }
    await User.findByIdAndDelete(req.params.id);
    req.flash("success", "Employee Deleted successfully!");
    res.redirect("/admin/employees");
  } catch (err) {
    console.error(err);
    req.flash("error", "Failed to Delete employee!, Please try again later.");
    res.redirect("/admin/employees");
  }
});

module.exports = router;
