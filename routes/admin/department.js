const express = require('express');
const router = express.Router();
const depModel = require('../../models/Department');


router.get('/', async (req, res) => {
   const department = await depModel.find();
   res.render('./admin/department/',{
      department
   })
});

// for adding Departments
router.get('/add', async (req, res) => {
   res.render('./admin/department/add')
});

router.post('/add', async (req, res) => {
   try {
      const existDep = await depModel.findOne({
         $and: [
            { departmentId: req.body.departmentId },
            { departmentName: req.body.departmentName }]
      }
      );

      if (existDep) {
         req.flash('error', 'Department already exists');
         return res.redirect('/admin/departments');
      }
      await depModel.create(req.body);
      req.flash('success', 'Department created successfully');
      res.redirect('/admin/departments');

   } catch (error) {
      req.flash('error', 'Failed to add Department!, Please try again later.');
      res.redirect('/admin/departments');
   }

});


// for editing dep
router.get('/edit/:id', async (req, res) => {
   try {
      const department = await depModel.findById(req.params.id);
      // console.log(department,'dep')
      res.render('./admin/department/edit', { department });

   } catch (error) {
      req.flash('error', 'Failed to Find department!, Please try again later.');
      res.redirect('/admin/departments');
   }
});

router.post('/edit/:id', async (req, res) => {
   try {
      const {departmentId, departmentName, statusDep} = req.body;
      // console.log(req.body)
      const existDep = await depModel.findOne({ _id: req.params.id });

      if (!existDep) {
         req.flash('error', 'Department not found');
         return res.redirect('/admin/departments');
      }
      await depModel.findOneAndUpdate({ _id: req.params.id }, {
        departmentId,
        departmentName,
        statusDep
      }, { new: true });
      req.flash('success', 'Department updated successfully');
      res.redirect('/admin/departments');

   } catch (error) {
      req.flash('error', 'Failed to Find !, Please try again later.');
      res.redirect('/admin/departments');
   }
});



// for deleting dep
router.post('/delete/:id', async(req,res)=>{
   try {
      if(!req.params.id){
         req.flash('error','departments not found.');
         return res.redirect('/admin/departments');
      }
      await depModel.findByIdAndDelete(req.params.id);
      req.flash('success','Successfuly department deleted');
      res.redirect('/admin/departments')
   } catch (error) {
      req.flash('error','Failed to delete department!, Please try later.');
      res.redirect('admin/departments')
      
   }
})
module.exports = router;