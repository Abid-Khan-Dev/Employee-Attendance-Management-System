const express = require('express');
const router = express.Router();
const empModel = require('../../models/User');
const depModel = require('../../models/Department');
const shiftModel = require('../../models/Shift');
const leaveModel = require('../../models/Leave');

router.get('/', async(req, res) => {
   const employees = await empModel.find({role: "employee"});
   const departments = await depModel.find();
   const shifts = await shiftModel.find();
   const leaves = await leaveModel.find().populate('employeeId');
   res.render('./admin/dashboard',{
      employees,
      departments,
      shifts,
      leaves
   })
});

module.exports = router;