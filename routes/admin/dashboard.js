const express = require('express');
const router = express.Router();
const empModel = require('../../models/User');
const depModel = require('../../models/Department');
const shiftModel = require('../../models/Shift');

router.get('/', async(req, res) => {
   const employees = await empModel.find({role: "employee"});
   const departments = await depModel.find();
   const shifts = await shiftModel.find();
   res.render('./admin/dashboard',{
      employees,
      departments,
      shifts
   })
});

module.exports = router;