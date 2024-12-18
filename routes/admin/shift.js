const express = require('express');
const router = express.Router();
const Shift = require('../../models/Shift');


// for rendering all Shifts
router.get('/', async (req, res) => {
   const allShifts = await Shift.find();
   res.render('./admin/shifts/index', {
      shifts: allShifts
   });
});


// for adding Shifts
router.get('/add', async (req, res) => {
   res.render('./admin/shifts/add');
});

router.post('/add', async (req, res) => {
   // console.log(req.body)
   try {
      const existShift = await Shift.findOne({
         $and: [
            { startTime: req.body.startTime },
            { endTime: req.body.endTime }]
      }
      );

      if (existShift) {
         req.flash('error', 'Shift already exists');
         return res.redirect('/admin/shifts');
      }
      await Shift.create(req.body);
      req.flash('success', 'Shift created successfully');
      res.redirect('/admin/shifts');

   } catch (error) {
      req.flash('error', 'Failed to add Shift!, Please try again later.');
      res.redirect('/admin/shifts');
   }

});



// for Editing Shifts
router.get('/edit/:id', async (req, res) => {
   try {
      const shift = await Shift.findById(req.params.id);
      res.render('./admin/shifts/edit', { shift });

   } catch (error) {
      // if the id not found in the shifts than user will redirect to /admin/shifts
      // console.log(error.message)
      req.flash('error', 'Failed to Find Shift!, Please try again later.');
      res.redirect('/admin/shifts');
   }
});

router.post('/edit/:id', async (req, res) => {
   try {
      const { startTime, endTime, statusShift } = req.body;
      // console.log(req.body)
      const existShift = await Shift.findOne({ _id: req.params.id });

      if (!existShift) {
         req.flash('error', 'Shift not found');
         return res.redirect('/admin/shifts');
      }

         // if (existShift.startTime === startTime && existShift.endTime === endTime) {
         //    req.flash('error', 'Shift already exists');
         //    return res.redirect('/admin/shifts');
         // }
      await Shift.findOneAndUpdate({ _id: req.params.id }, {
         startTime,
         endTime,
         statusShift
      }, { new: true });
      req.flash('success', 'Shift Updated successfully');
      res.redirect('/admin/shifts');

   } catch (error) {
      req.flash('error', 'Failed to Find Shift!, Please try again later.');
      res.redirect('/admin/shifts');
   }
});


// for Deleting Shifts
router.post('/delete/:id', async(req,res)=>{
   try {
      if(!req.params.id){
         req.flash('error','Shift not found.');
         return res.redirect('/admin/shifts');
      }
      await Shift.findByIdAndDelete(req.params.id);
      req.flash('success','Successfuly shift deleted');
      res.redirect('/admin/shifts')
   } catch (error) {
      req.flash('error','Failed to delete shift!, Please try later.');
      res.redirect('admin/shifts')
      
   }
})

module.exports = router;