const express = require('express');
const router = express.Router();
const Attendance = require('../../models/Attendance');


router.get('/', async (req, res) => {
   try {
      const attendance = await Attendance.find()
         .populate({
            path: 'employeeId',
            populate: [
               { path: 'shift', model: 'Shift' },
               { path: 'department', model: 'Department' }
            ]
         });
      // console.log(attendance,'attn');

      res.render('./admin/report/', {
         attendance
      })
      
   } catch (error) {
      req.flash('error', 'Failed to find Reports!, Please try later.');
      res.redirect('/admin')
   }
});

module.exports = router;