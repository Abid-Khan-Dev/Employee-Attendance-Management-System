const express = require("express");
const router = express.Router();
const locModel = require("../../models/Location");

router.get("/", async (req, res) => {
  const loc = await locModel.find();
  res.render("./admin/location/", {
    location: loc,
  });
});

// for adding locations
router.get("/add", async (req, res) => {
  res.render("./admin/location/add");
});

router.post("/add", async (req, res) => {
  try {
    const existLoc = await locModel.findOne({
      locationName: req.body.locationName,
    });

    if (existLoc) {
      req.flash("error", "location already exists");
      return res.redirect("/admin/locations");
    }
    await locModel.create(req.body);
    req.flash("success", "location created successfully");
    res.redirect("/admin/locations");
  } catch (error) {
    req.flash("error", "Failed to add location!, Please try again later.");
    res.redirect("/admin/locations");
  }
});

// for editing dep
router.get("/edit/:id", async (req, res) => {
  try {
    const location = await locModel.findById(req.params.id);
    res.render("./admin/location/edit", { location });
  } catch (error) {
    req.flash("error", "Failed to Find location!, Please try again later.");
    res.redirect("/admin/locations");
  }
});

router.post("/edit/:id", async (req, res) => {
  try {
    const { locationName, statusLoc } = req.body;
    // console.log(req.body)
    const existLoc = await locModel.findOne({ _id: req.params.id });

    if (!existLoc) {
      req.flash("error", "location not found");
      return res.redirect("/admin/locations");
    }
    await locModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        locationName,
        statusLoc,
      },
      { new: true }
    );
    req.flash("success", "location updated successfully");
    res.redirect("/admin/locations");
  } catch (error) {
    req.flash("error", "Failed to Find !, Please try again later.");
    res.redirect("/admin/locations");
  }
});

// for deleting dep
router.post("/delete/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      req.flash("error", "locations not found.");
      return res.redirect("/admin/locations");
    }
    await locModel.findByIdAndDelete(req.params.id);
    req.flash("success", "Successfuly location deleted");
    res.redirect("/admin/locations");
  } catch (error) {
    req.flash("error", "Failed to delete location!, Please try later.");
    res.redirect("admin/locations");
  }
});
module.exports = router;
