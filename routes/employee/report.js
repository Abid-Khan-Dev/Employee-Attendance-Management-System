const express = require('express');
const router = express.Router();
const Attendance = require('../../models/Attendance');


router.get('/', async (req, res) => {
   try {
      const attendance = await Attendance.find({employeeId: req.user.id})
         .populate('location')
         .populate({
            path: 'employeeId',
            populate: [
               { path: 'shift', model: 'Shift' },
               { path: 'department', model: 'Department' }
            ]
         });


      res.render('./employee/report', {
         attendance
      })
      
   } catch (error) {
      req.flash('error', 'Failed to find Reports!, Please try later.');
      res.redirect('/dashboard')
   }
});

module.exports = router;