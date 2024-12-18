const express = require('express');
const router = express.Router();


router.get('/', async (req,res)=>{
try {
    const employee = req.user;
    employee.password = undefined;
    // console.log(employee.firstName,'emp');
    
    res.render('./employee/dashboard',{
        employee
    })
} catch (error) {
   req.flash('error', 'Failed to load profile !, Please try again later.');
   res.redirect('/auth/login'); 
}
});

module.exports = router;